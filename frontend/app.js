const socket = io("http://localhost:3000"); // change to Render URL later

const messagesDiv = document.getElementById("messages");

socket.on("receive_message", (data) => {
  const msg = document.createElement("p");
  msg.textContent = `${data.user}: ${data.message}`;
  messagesDiv.appendChild(msg);
});

function sendMessage() {
  const user = document.getElementById("user").value;
  const message = document.getElementById("message").value;

  socket.emit("send_message", { user, message });
}