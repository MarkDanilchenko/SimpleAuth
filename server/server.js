import express from "express";
import router from "./routes/router.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
server.use("/api/v1", router);

server.get("/test", (req, res) => {
  res.status(200);
  res.send("test");
  res.end();
});

export default server;
