import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId as string;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
