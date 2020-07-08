import mongoose from "mongoose";
import logger from "../util/logger";

export default async (): Promise<void> => {
  const { MONGO_USER, MONGO_PASSWORD } = process.env;
  try {
    await mongoose.connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds159377.mlab.com:59377/dc-counter`,
      { useNewUrlParser: true }
    );
  } catch (err) {
    logger.error(err);
  }
};
