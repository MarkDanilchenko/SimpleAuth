import express from "express";
import routerAuth from "./router/auth.js";
import winston from "winston";
import cookieParser from "cookie-parser";
import { expressOptions } from "./env.js";

const server = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.json()),
  transports: [new winston.transports.Console()],
});

server.use(cookieParser(expressOptions.cookieSecret));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

server.use("/api/v1/auth", routerAuth);

server.get("/test", (req, res) => {
  res.status(200);
  res.send(JSON.stringify({ message: "test" }));
  res.end();
});

server.all("*", (req, res) => {
  res.status(404);
  res.send(JSON.stringify({ message: "Not found!" }));
  res.end();
});

export { logger };
export default server;
