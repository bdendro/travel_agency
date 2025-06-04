import { HttpError, ValidationError } from '../utils/HttpErrors.js';
import Logger from '../utils/Logger/Logger.js';

const logger = new Logger();

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    if (err instanceof ValidationError)
      return res.status(err.statusCode).json({ message: err.message, details: err.details });
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid body' });
  }

  logger.error({ err });
  return res.status(500).json({ message: 'Internal server error' });
};
