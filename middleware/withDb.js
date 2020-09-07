import mongoose from "mongoose";

import { createLogger } from "../api/logger";

const logger = createLogger(__filename);

let isConnected = null;

const withDb = (handler) => async (req, res) => {
  if (!isConnected) {
    try {
      const db = await mongoose.connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });

      isConnected = db.connections[0].readyState;
    } catch (error) {
      logger.log(`Error connecting to db: ${err}`);
    }
  }

  return handler(req, res);
};

export default withDb;
