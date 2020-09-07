import { createLogger } from "../api/logger";
import { ERROR_CODES } from "../common/constants";

const logger = createLogger(__filename);

const withErrors = (
  handler,
  supportedMethods = ["GET", "POST", "PUT", "DELETE"]
) => async (req, res) => {
  if (!supportedMethods.includes(req.method)) {
    throw "That method isn't supported!";
  }
  try {
    await handler(req, res);
  } catch (error) {
    logger.log(error);
    if (error.code === ERROR_CODES.NOT_AUTHED) {
      res.status(401).json(error.message);
    } else {
      res.status(error.status || 500).json(error.message);
    }
  }
};

export default withErrors;
