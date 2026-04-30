require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const { whatsappHandler } = require("./whatsapp");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const DB_FILE = path.join(__dirname, "data.json");
const USERS_FILE = "users.json";

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

let users = loadUsers();

function loadReports() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, "[]");
      return [];
    }
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (err) {
    console.error("DB error:", err);
    return [];
  }
}

function addReport(report) {
  reports.push(report);
  saveReports(reports);
}

// Save data
function saveReports(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

let reports = loadReports();

let sessions = {};

app.post("/ivr", (req, res) => {
  res.type("text/xml");
  res.send(`
  <Response>
    <Gather numDigits="1" action="/set-language">
      <Play>https://stew-ninja-constrict.ngrok-free.dev/audio/en/welcome.mp3</Play>  
    </Gather>
  </Response>
  `);
});

app.post("/set-language", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;

  let lang = "kn";
  if (digit === "2") lang = "en";
  if (digit === "3") lang = "hn";

  sessions[user] = { lang };

  res.type("text/xml");
  res.send(`
<Response>
  <Gather numDigits="4" action="/set-location">
    <Say>
Press 1 for Vidyanagar. 
Press 2 for Gokul. 
Press 3 for Navanagar.
</Say>
  </Gather>
</Response>
  `);
});

app.post("/set-location", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;

  const zoneMap = {
    1: "Vidyanagar",
    2: "Gokul",
    3: "Navanagar",
  };

  sessions[user].zone = zoneMap[digit] || "Unknown";

  const lang = sessions[user].lang;

  res.type("text/xml");
  res.send(`
<Response>
  <Gather numDigits="1" action="/menu">
    <Play>https://stew-ninja-constrict.ngrok-free.dev/audio/${lang}/menu.mp3</Play>
  </Gather>
</Response>
  `);
});

app.post("/menu", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;
  const lang = sessions[user].lang;

  if (digit === "1") {
    return res.send(`
    <Response>
      <Gather numDigits="1" action="/water">
        <Play>https://stew-ninja-constrict.ngrok-free.dev/audio/${lang}/water.mp3</Play>
      </Gather>
    </Response>
    `);
  }

  if (digit === "2") {
    return res.send(`
    <Response>
      <Gather numDigits="1" action="/waste">
        <Play>https://stew-ninja-constrict.ngrok-free.dev/audio/${lang}/waste.mp3</Play>
      </Gather>
    </Response>
    `);
  }

  if (digit === "3") {
    return res.send(`
    <Response>
      <Gather numDigits="1" action="/reuse">
        <Play>https://stew-ninja-constrict.ngrok-free.dev/audio/${lang}/electricity.mp3</Play>
      </Gather>
    </Response>
    `);
  }
});

app.post("/water", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;

  sessions[user].water = digit === "1" ? 2 : digit === "2" ? 5 : 8;

  finishFlow(user, res);
});

app.post("/waste", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;

  sessions[user].waste =
    digit === "1" ? "low" : digit === "2" ? "medium" : "high";

  finishFlow(user, res);
});

app.post("/reuse", (req, res) => {
  const user = req.body.From;
  const digit = req.body.Digits;

  sessions[user].reuse = digit === "1";

  finishFlow(user, res);
});

function finishFlow(user, res) {
  const data = sessions[user];

  const result = calculateScore({
    water: data.water || 5,
    waste: data.waste || "medium",
    reuse: data.reuse || false,
  });

  addReport({
    ...result,
    zone: data.zone || user, // ✅ use location here
    timestamp: Date.now(),
  });

  saveReports(reports);
  delete sessions[user];

  res.type("text/xml");
  res.send(`
<Response>
  <Say>Your eco score is ${result.totalScore}</Say>
</Response>
  `);
}

function normalize(value, min, max) {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

//  WATER SCORE
function waterScore(data) {
  // buckets per person assumption
  let usage = data.water;

  // realistic scale
  if (usage <= 3) return 90;
  if (usage <= 5) return 70;
  if (usage <= 7) return 50;
  return 20;
}

//  WASTE SCORE
function wasteScore(data) {
  let score = 50;

  if (data.waste === "low") score += 30;
  if (data.waste === "medium") score -= 10;
  if (data.waste === "high") score -= 30;

  // segregation bonus
  if (data.segregation) score += 20;

  return Math.max(0, Math.min(100, score));
}

//  REUSE SCORE
function reuseScore(data) {
  let score = 0;

  if (data.reuse) score += 60;
  if (data.repair) score += 20;
  if (data.refill) score += 20;

  return Math.min(100, score);
}

//  FINAL ECO SCORE
function calculateScore(data) {
  const w = waterScore(data);
  const wa = wasteScore(data);
  const r = reuseScore(data);

  const total = Math.round(0.4 * w + 0.35 * wa + 0.25 * r);

  return {
    waterScore: w,
    wasteScore: wa,
    reuseScore: r,
    totalScore: total,
    timestamp: Date.now(),
  };
}

function electricityScore(data) {
  let score = 50;

  if (data.powerUsage === "low") score += 30;
  if (data.powerUsage === "medium") score += 0;
  if (data.powerUsage === "high") score -= 30;

  if (data.solar) score += 20;

  return Math.max(0, Math.min(100, score));
}

function validateInput(data) {
  if (!data) return false;
  if (data.water < 0 || data.water > 20) return false;
  return true;
}

app.get("/community", (req, res) => {
  if (reports.length === 0) {
    return res.json({ water: 0, waste: 0, reuse: 0, communityScore: 0 });
  }

  let water = 0,
    waste = 0,
    elec = 0;

  reports.forEach((r) => {
    water += r.waterScore || 0;
    waste += r.wasteScore || 0;
    elec += r.elecScore || 0;
  });

  const count = reports.length;

  const waterAvg = Math.round(water / count);
  const wasteAvg = Math.round(waste / count);
  const elecAvg = Math.round(elec / count);

  const communityScore = Math.round(
    0.4 * waterAvg + 0.35 * wasteAvg + 0.25 * elecAvg,
  );

  res.json({
    water: waterAvg,
    waste: wasteAvg,
    elec: elecAvg,
    communityScore,
  });
});

app.get("/rankings", (req, res) => {
  const zoneMap = {};

  reports.forEach((r) => {
    const z = r.zone || "Unknown";

    if (!zoneMap[z]) {
      zoneMap[z] = { total: 0, count: 0 };
    }

    zoneMap[z].total += r.totalScore;
    zoneMap[z].count += 1;
  });

  const result = Object.keys(zoneMap).map((z) => ({
    zone: z,
    score: Math.round(zoneMap[z].total / zoneMap[z].count),
  }));

  result.sort((a, b) => b.score - a.score);

  res.json(result);
});

function capitalize(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

app.get("/zones", (req, res) => {
  const zoneMap = {};

  reports.forEach((r) => {
    if (!r.zone) return;

    const z = String(r.zone).trim().toLowerCase();

    if (!zoneMap[z]) {
      zoneMap[z] = { total: 0, count: 0 };
    }

    zoneMap[z].total += r.totalScore || 0;
    zoneMap[z].count += 1;
  });

  const zones = Object.keys(zoneMap).map((z) => ({
    name: capitalize(z), // Proper display name
    score: Math.round(zoneMap[z].total / zoneMap[z].count),
  }));

  zones.sort((a, b) => b.score - a.score);

  res.json(zones);
});

app.get("/trend", (req, res) => {
  const last7 = reports.slice(-7);

  res.json({
    water: last7.map((r) => r.waterScore || 0),
    waste: last7.map((r) => r.wasteScore || 0),
    elec: last7.map((r) => r.elecScore || 0), // ⭐ FIXED
  });
});

app.post("/submit-form", (req, res) => {
  const { water, elec, waste } = req.body;

  if (!water || !waste || !elec) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const data = {
    water: water == 1 ? 2 : water == 2 ? 5 : 8,
    waste: waste == 1 ? "low" : waste == 2 ? "medium" : "high",
    powerUsage: elec == 1 ? "low" : elec == 2 ? "medium" : "high",
    reuse: false,
  };

  const result = calculateScore(data);

  const elecScore = electricityScore(data); // ⭐ NEW

  addReport({
    waterScore: result.waterScore,
    wasteScore: result.wasteScore,
    reuseScore: result.reuseScore, // optional
    elecScore: elecScore, // ⭐ FIXED
    totalScore: result.totalScore,
    zone: "volunteer-form",
    timestamp: Date.now(),
  });

  saveReports(reports);

  res.json({
    message: "Data stored successfully",
    score: result.totalScore,
  });
});

app.post("/whatsapp", whatsappHandler(users, saveUsers, saveReports, reports));

app.get("/dashboard", (req, res) => {
  res.render("dash.ejs");
});

app.get("/volform", (req, res) => {
  res.render("volunteer.ejs");
});

app.post("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
