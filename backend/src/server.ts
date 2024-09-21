import express from "express";
const app = express();

app.get("/", (_req, res) => {
  res.send("Server built");
});

app.get("/user", (_req, res) => {
  res.send("User 1 mounted");
});

app.listen(6969, () => {
  console.log("Server is running at Port:6969");
});
