import server from "./server.js";
import { expressOptions, mongoOptions } from "./env.js";
import mongoose from "./models/index.js";
import { logger } from "./server.js";

async function startServer() {
  try {
    await mongoose.connect(
      `mongodb://${mongoOptions.username}:${mongoOptions.password}@${mongoOptions.host}:${mongoOptions.outerPort}/simpleauth`
    );
    logger.info("Mongoose is connected");

    server.listen(expressOptions.port, expressOptions.host, () => {
      logger.info(`Server is running on http://${expressOptions.host}:${expressOptions.port}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

startServer();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  logger.info("Mongoose is disconnected");
  logger.info("Server is stopped");
  process.exit(0);
});
