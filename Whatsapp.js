// ── BILINGUAL STRINGS ────────────────────────────────────────
const STRINGS = {
  en: {
    greeting: (name) =>
      `🌱 *Good day, ${name || "friend"}!* Welcome to *DailyDrop* by EcoVoice.\nYour small daily habits make a big community difference! 💚\n\nPlease select your language:\n1️⃣ English\n2️⃣ ಕನ್ನಡ (Kannada)`,

    menu: `🌍 *DailyDrop Menu*\nWhat would you like to report today?\n\n1️⃣ 💧 Water\n2️⃣ ⚡ Electricity\n3️⃣ 🗑️ Material / Waste\n4️⃣ 📊 View My Score\n\nReply with a number (1-4)`,

    water_menu: `💧 *Water Report*\nHow many Buckets of water you used today?\n\n1️⃣ Less than 3 buckets \n2️⃣ 3-6 Buckets \n3️⃣ More than 6 buckets \n\nReply with a number (1-4)`,

    elec_menu: `⚡ *Electricity Report*\nHow many Hours of usage you had today?\n\n1️⃣Low usage (Less than 6 hours)\n2️⃣ Medium usage (6-10 hours of) \n3️⃣ High usage (More than 10 hours)\n\nReply with a number (1-4)`,

    waste_menu: `🗑️ *Waste Report*\nHow much waste did you generate today?\n\n1️⃣ Low waste generated ✅\n2️⃣ Waste is Moderate\n3️⃣ Waste is High / Overflowing ❌♻️\n\nReply with a number (1-4)`,

    invalid: `❓ I didn't understand that. Please reply with a *number* from the options shown above.`,

    location: `📍 *Enter your Area / Zone name*\n\nExample:\nVidyanagar\nGokul\nNavanagar`,

    done: (scores) =>
      `✅ *DailyDrop Report Saved!*\n\n💧 Water Score: *${scores.water}/100*\n⚡ Electricity Score: *${scores.elec}/100*\n🗑️ Waste Score: *${scores.waste}/100*\n\n🌍 *Your Eco Score: ${scores.total}/100*\n\n${scores.tip}\n\nThank you for making your community greener! 🌱\nReply *hi* anytime to report again.`,

    view: (scores) =>
      `📊 *Your Latest Eco Score*\n\n💧 Water: *${scores.water}/100*\n⚡ Electricity: *${scores.elec}/100*\n🗑️ Waste: *${scores.waste}/100*\n🌍 Total: *${scores.total}/100*\n\nReply *1* to go back to main menu.`,

    no_score: `📊 You haven't submitted a report yet!\nReply *1* to go back to main menu and report today's data.`,
  },

  kn: {
    greeting: (name) =>
      `🌱 *ನಮಸ್ಕಾರ, ${name || "ಸ್ನೇಹಿತ"}!* EcoVoice ನ *DailyDrop* ಗೆ ಸ್ವಾಗತ.\nನಿಮ್ಮ ಸಣ್ಣ ಅಭ್ಯಾಸಗಳು ಸಮುದಾಯವನ್ನು ಉತ್ತಮಗೊಳಿಸುತ್ತವೆ! 💚\n\nಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ:\n1️⃣ English\n2️⃣ ಕನ್ನಡ`,

    menu: `🌍 *DailyDrop ಮೆನು*\nಇಂದು ಯಾವ ವಿಷಯ ವರದಿ ಮಾಡಲು ಬಯಸುವಿರಿ?\n\n1️⃣ 💧 ನೀರು\n2️⃣ ⚡ ವಿದ್ಯುತ್\n3️⃣ 🗑️ ತ್ಯಾಜ್ಯ\n4️⃣ 📊 ನನ್ನ ಸ್ಕೋರ್ ನೋಡಿ\n\n(1-4) ಸಂಖ್ಯೆ ಕಳಿಸಿ`,

    water_menu: `💧 *ನೀರಿನ ವರದಿ*\nಇಂದು ನೀವು ಎಷ್ಟು ಬಕೆಟ್ ನೀರನ್ನು ಬಳಸಿದ್ದೀರಿ?\n\n1️⃣ 
3 ಬಕೆಟ್‌ಗಳಿಗಿಂತ ಕಡಿಮೆ ✅\n2️⃣ 3-6 ಬಕೆಟ್‌ಗಳು❌\n3️⃣ 6 ಕ್ಕೂ ಹೆಚ್ಚು ಬಕೆಟ್‌ಗಳು\n\nಸಂಖ್ಯೆ ಕಳಿಸಿ`,

    elec_menu: `⚡ *ವಿದ್ಯುತ್ ವರದಿ*\nಇಂದು ನೀವು ಎಷ್ಟು ಗಂಟೆಗಳ ಕಾಲ ಬಳಸಿದ್ದೀರಿ?\n\n1️⃣ ಕಡಿಮೆ ಬಳಕೆ (6 ಗಂಟೆಗಳಿಗಿಂತ ಕಡಿಮೆ) ✅\n2️⃣ ಮಧ್ಯಮ ಬಳಕೆ (6-10 ಗಂಟೆಗಳು)\n3️⃣ ಹೆಚ್ಚಿನ ಬಳಕೆ (10 ಗಂಟೆಗಳಿಗಿಂತ ಹೆಚ್ಚು)\n\nಸಂಖ್ಯೆ ಕಳಿಸಿ`,

    waste_menu: `🗑️ *ತ್ಯಾಜ್ಯ ವರದಿ*\nಇಂದು ನೀವು ಎಷ್ಟು ತ್ಯಾಜ್ಯವನ್ನು ಉತ್ಪಾದಿಸಿದ್ದೀರಿ?\n\n1️⃣ ಕಡಿಮೆ ಮತ್ತು ಬೇರ್ಪಡಿಸಲಾಗಿದೆ ✅\n2️⃣ ಮಧ್ಯಮ ಪ್ರಮಾಣ\n3️⃣ ಹೆಚ್ಚು / ತುಂಬಿ ಹರಿಯುತ್ತಿದೆ ❌\n4️⃣ ಮರುಬಳಕೆ ಮಾಡಿದ್ದೇನೆ ♻️\n\nಸಂಖ್ಯೆ ಕಳಿಸಿ`,

    invalid: `❓ ಅರ್ಥ ಆಗಲಿಲ್ಲ. ಮೇಲಿನ ಆಯ್ಕೆಗಳಿಂದ *ಸಂಖ್ಯೆ* ಕಳಿಸಿ.`,

    location: `📍 ನಿಮ್ಮ ಪ್ರದೇಶದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ\n\nಉದಾಹರಣೆ:\nವಿದ್ಯಾನಗರ\nಗೋಕೂಲ\nನವಾನಗರ`,

    done: (scores) =>
      `✅ *DailyDrop ವರದಿ ಉಳಿಸಲಾಗಿದೆ!*\n\n💧 ನೀರು ಸ್ಕೋರ್: *${scores.water}/100*\n⚡ ವಿದ್ಯುತ್ ಸ್ಕೋರ್: *${scores.elec}/100*\n🗑️ ತ್ಯಾಜ್ಯ ಸ್ಕೋರ್: *${scores.waste}/100*\n\n🌍 *ನಿಮ್ಮ ಇಕೋ ಸ್ಕೋರ್: ${scores.total}/100*\n\n${scores.tip}\n\nನಿಮ್ಮ ಸಮುದಾಯವನ್ನು ಹಸಿರಾಗಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ! 🌱\nಮತ್ತೆ ವರದಿ ಮಾಡಲು *hi* ಕಳಿಸಿ.`,

    view: (scores) =>
      `📊 *ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಇಕೋ ಸ್ಕೋರ್*\n\n💧 ನೀರು: *${scores.water}/100*\n⚡ ವಿದ್ಯುತ್: *${scores.elec}/100*\n🗑️ ತ್ಯಾಜ್ಯ: *${scores.waste}/100*\n🌍 ಒಟ್ಟು: *${scores.total}/100*\n\nಮುಖ್ಯ ಮೆನುಗೆ ಹೋಗಲು *1* ಕಳಿಸಿ.`,

    no_score: `📊 ನೀವು ಇನ್ನೂ ವರದಿ ಕಳಿಸಿಲ್ಲ!\nಮುಖ್ಯ ಮೆನುಗೆ *1* ಕಳಿಸಿ.`,
  },
};

// ── TIPS based on worst score ─────────────────────────────────
function getTip(scores, lang) {
  const min = Math.min(scores.water, scores.elec, scores.waste);
  if (lang === "kn") {
    if (min === scores.water)
      return "💡 ಸಲಹೆ: ನಿಮ್ಮ ನೀರಿನ ಬಳಕೆ ಕಡಿಮೆ ಮಾಡಿ — ನಲ್ಲಿ ಸರಿಯಾಗಿ ಮುಚ್ಚಿ, ಸ್ನಾನ ಸಮಯ ಕಡಿಮೆ ಮಾಡಿ.";
    if (min === scores.elec)
      return "💡 ಸಲಹೆ: ವಿದ್ಯುತ್ ಉಳಿಸಿ — ಬಳಕೆ ಇಲ್ಲದ ದೀಪ/ಫ್ಯಾನ್ ಆಫ್ ಮಾಡಿ.";
    return "💡 ಸಲಹೆ: ತ್ಯಾಜ್ಯ ಬೇರ್ಪಡಿಸಿ ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ಕಡಿಮೆ ಮಾಡಿ.";
  }
  if (min === scores.water)
    return "💡 Tip: Save more water — close taps fully, take shorter showers.";
  if (min === scores.elec)
    return "💡 Tip: Save electricity — turn off lights and fans when leaving a room.";
  return "💡 Tip: Segregate your waste and reduce single-use plastic.";
}

// ── SCORING LOGIC ─────────────────────────────────────────────

function calcWaterScore(choice) {
  return { 1: 90, 2: 20, 3: 30, 4: 40 }[choice] || 50;
}
function calcElecScore(choice) {
  return { 1: 90, 2: 20, 3: 10, 4: 100 }[choice] || 50;
}

function calcWasteScore(choice) {
  return { 1: 90, 2: 60, 3: 20, 4: 85 }[choice] || 50;
}

function calcTotalScore(w, e, wa) {
  return Math.round(0.35 * w + 0.35 * e + 0.3 * wa);
}

function send(twiml, text) {
  twiml.message(text);
}

const GREETING_WORDS = [
  "hi",
  "hello",
  "hey",
  "start",
  "menu",
  "ಹಾಯ್",
  "ನಮಸ್ಕಾರ",
  "namaskara",
];

function whatsappHandler(users, saveUsers, saveReports, reports) {
  return (req, res) => {
    const {
      twiml: { MessagingResponse },
    } = require("twilio");
    const twiml = new MessagingResponse();

    const raw = (req.body.Body || "").trim();
    const msg = raw.toLowerCase();
    const from = req.body.From;
    const profileName = req.body.ProfileName || "";

    let user = users.find((u) => u.phone === from);
    if (!user) {
      user = { phone: from, step: "greeting" };
      users.push(user);
    }

    if (GREETING_WORDS.includes(msg)) {
      user.step = "greeting";
      user.water = null;
      user.elec = null;
      user.waste = null;
    }

    const lang = user.lang || "en";
    const S = STRINGS[lang];

    // STEP 1 — Greeting & language select
    if (user.step === "greeting") {
      send(twiml, STRINGS.en.greeting(profileName));
      user.step = "lang";
    }

    // STEP 2 — Language picked
    else if (user.step === "lang") {
      if (msg === "1") {
        user.lang = "en";
      } else if (msg === "2") {
        user.lang = "kn";
      } else {
        send(twiml, STRINGS.en.invalid);
        saveUsers(users);
        res.type("text/xml");
        return res.send(twiml.toString());
      }
      user.step = "location";
      send(twiml, STRINGS[user.lang].location);
    }

    // STEP 2.5 — Location capture
    else if (user.step === "location") {
      if (!msg || msg.length < 2) {
        send(twiml, S.invalid);
      } else {
        user.zone = raw;

        user.step = "menu";
        send(twiml, STRINGS[user.lang].menu);
      }
    }

    // STEP 3 — Main menu
    else if (user.step === "menu") {
      if (msg === "1") {
        user.step = "water";
        send(twiml, S.water_menu);
      } else if (msg === "2") {
        user.step = "elec";
        send(twiml, S.elec_menu);
      } else if (msg === "3") {
        user.step = "waste";
        send(twiml, S.waste_menu);
      } else if (msg === "4") {
        // View score
        if (user.lastTotal != null) {
          send(
            twiml,
            S.view({
              water: user.lastWater || 0,
              elec: user.lastElec || 0,
              waste: user.lastWaste || 0,
              total: user.lastTotal,
            }),
          );
        } else {
          send(twiml, S.no_score);
        }
        // Stay on menu after viewing
        user.step = "menu";
      } else {
        send(twiml, S.invalid);
      }
    }

    // STEP 4a — Water sub-menu answer
    else if (user.step === "water") {
      if (!["1", "2", "3", "4"].includes(msg)) {
        send(twiml, S.invalid + "\n\n" + S.water_menu);
      } else {
        user.water = msg;
        // Ask electricity next
        user.step = "elec";
        send(twiml, S.elec_menu);
      }
    }

    // STEP 4b — Electricity sub-menu answer
    else if (user.step === "elec") {
      if (!["1", "2", "3", "4"].includes(msg)) {
        send(twiml, S.invalid + "\n\n" + S.elec_menu);
      } else {
        user.elec = msg;
        // Ask waste next
        user.step = "waste";
        send(twiml, S.waste_menu);
      }
    }

    // STEP 4c — Waste sub-menu answer → finish
    else if (user.step === "waste") {
      if (!["1", "2", "3", "4"].includes(msg)) {
        send(twiml, S.invalid + "\n\n" + S.waste_menu);
      } else {
        user.waste = msg;

        // ── Calculate scores ──────────────────────────────
        const wScore = calcWaterScore(user.water || "1");
        const eScore = calcElecScore(user.elec || "1");
        const waScore = calcWasteScore(user.waste);
        const total = calcTotalScore(wScore, eScore, waScore);
        const tip = getTip(
          { water: wScore, elec: eScore, waste: waScore },
          user.lang,
        );

        // ── Persist last scores for "View" ────────────────
        user.lastWater = wScore;
        user.lastElec = eScore;
        user.lastWaste = waScore;
        user.lastTotal = total;

        // ── Save report ───────────────────────────────────
        const report = {
          zone: user.zone || "Unknown",
          phone: from,
          waterScore: wScore,
          elecScore: eScore,
          wasteScore: waScore,
          totalScore: total,
          waterChoice: user.water,
          elecChoice: user.elec,
          wasteChoice: user.waste,
          lang: user.lang,
          timestamp: Date.now(),
        };
        reports.push(report);
        saveReports(reports);

        send(
          twiml,
          S.done({ water: wScore, elec: eScore, waste: waScore, total, tip }),
        );

        // Reset for next session
        user.step = "menu";
        user.water = null;
        user.elec = null;
        user.waste = null;
      }
    }

    // Fallback — lost state
    else {
      user.step = "greeting";
      send(twiml, STRINGS.en.greeting(profileName));
    }

    saveUsers(users);

    res.type("text/xml");
    res.send(twiml.toString());
  };
}

module.exports = { whatsappHandler };
