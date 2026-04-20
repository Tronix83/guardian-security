const express = require("express");
const router = express.Router();

// Placeholder login
router.post("/login", (req, res) => {
  const { username } = req.body;
  res.json({ success: true, user: username });
});

module.exports = router;