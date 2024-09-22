import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (_req, res) => {
  res.send("Server built");
});

app.get("/user", (_req, res) => {
  res.send("User 1 mounted");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at Port: ${process.env.PORT}`);
});
