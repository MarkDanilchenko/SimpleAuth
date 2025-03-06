import express from "express";
import router from "./routes/router.js";
import winston from "winston";
import cookieParser from "cookie-parser";
import { expressOptions } from "./env.js";

const server = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

server.use(cookieParser(expressOptions.cookieSecret));
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

export { logger };
export default server;
