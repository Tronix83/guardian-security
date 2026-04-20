const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { Server } = require("socket.io");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔌 Socket handler
require("./socket")(io, db);

// 🌐 Basic route
app.get("/", (req, res) => {
  res.send("Chat backend running 🚀");
});

// 🔐 Example auth route placeholder
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});