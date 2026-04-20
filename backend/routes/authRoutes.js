const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash]
  );

  res.json({ success: true });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (!users.length) {
    return res.status(400).json({ error: "User not found" });
  }

  const user = users[0];

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;