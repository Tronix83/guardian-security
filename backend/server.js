const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { Server } = require("socket.io");
const db = require("./db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ ROUTES MUST EXIST AND BE CORRECT
app.use("/auth", require("./routes/authRoutes"));
app.use("/servers", require("./routes/serverRoutes"));
app.use("/channels", require("./routes/channelRoutes"));
app.use("/messages", require("./routes/messageRoutes"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

require("./socket")(io, db);

app.get("/", (req, res) => {
  res.send("Guardian Security API running 🛡️");
});

app.get("/test-auth", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});