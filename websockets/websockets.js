const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));
const server = http.createServer(app);

const io = new Server(server);
let room;

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  //   setInterval(() => {
  //     socket.emit("message", "message from server" + "-" + "at" + new Date());
  //   }, 2000);

  socket.on("message", (data) => {
    socket.broadcast.emit("broadcast", data);
  });

  socket.on("create_grp", (roomId) => {
    console.log("group is created");
    room = roomId;
    socket.join(room);
  });

  socket.on("join_room", () => {
    console.log(socket.id + "joined the room", room);
    socket.join(room);
  });

  socket.on("grp message", (data) => {
    socket.to(room).emit("serv_grp_message", data);
  });

  socket.on("leave_room", () => {
    console.log(socket.id, "  left the room");
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
