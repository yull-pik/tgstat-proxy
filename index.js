const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.get("*", async (req, res) => {
  try {
    const target = "https://api.tgstat.ru" + req.path + "?" + new URLSearchParams(req.query).toString();
    const response = await fetch(target, {
      headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" }
    });
    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
