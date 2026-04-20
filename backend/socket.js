module.exports = (io, db) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 💬 Receive message
    socket.on("send_message", async (data) => {
      const { user, message } = data;

      // Save to DB
      await db.query(
        "INSERT INTO messages (user, message) VALUES (?, ?)",
        [user, message]
      );

      // Broadcast to everyone
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};