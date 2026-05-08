const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("data-changed", () => {
  console.log("DATA CHANGED");
  io.emit("sync-all");
});
});

httpServer.listen(4000, () => {
  console.log("socket server running on 4000");
});