import fs from "fs";
import dotenv from "dotenv";

import logger from "./logger";

if (process.env.NODE_ENV === "test" && fs.existsSync(".env.test")) {
  logger.debug("Using .env.test file to supply config environment variables");
  dotenv.config({ path: ".env.test" });
} else if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" });
}
