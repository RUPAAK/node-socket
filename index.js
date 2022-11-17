const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", (msg) => {
    io.emit("message_received", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
