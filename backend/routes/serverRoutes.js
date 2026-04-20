const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE SERVER
router.post("/", async (req, res) => {
  const { name } = req.body;

  const [result] = await db.query(
    "INSERT INTO servers (name) VALUES (?)",
    [name]
  );

  res.json({ serverId: result.insertId });
});

// GET SERVERS
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM servers");
  res.json(rows);
});

module.exports = router;