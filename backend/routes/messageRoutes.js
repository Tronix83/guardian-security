const express = require("express");
const router = express.Router();
const db = require("../db");

// GET MESSAGES
router.get("/:channelId", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM messages WHERE channel_id = ? ORDER BY created_at ASC",
    [req.params.channelId]
  );

  res.json(rows);
});

module.exports = router;