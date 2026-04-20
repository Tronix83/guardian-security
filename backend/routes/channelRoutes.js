const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE CHANNEL
router.post("/", async (req, res) => {
  const { serverId, name } = req.body;

  const [result] = await db.query(
    "INSERT INTO channels (server_id, name) VALUES (?, ?)",
    [serverId, name]
  );

  res.json({ channelId: result.insertId });
});

// GET CHANNELS
router.get("/:serverId", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM channels WHERE server_id = ?",
    [req.params.serverId]
  );

  res.json(rows);
});

module.exports = router;