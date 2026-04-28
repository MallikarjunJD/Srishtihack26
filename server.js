require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();

const port = process.env.PORT;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})