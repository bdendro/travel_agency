import Joi from 'joi';
import { ValidationError } from '../utils/HttpErrors.js';

export const idSchema = Joi.number().integer().positive().label('Url id');

// Can be used only if there is no another 'no id' params
// Example: idValidator(['itemId'])
const idValidator =
  (idNames = []) =>
  async (req, res, next) => {
    const details = [];
    const data = {};

    idNames.forEach((idName) => {
      if (req.params[idName]) {
        const { error, value } = idSchema.validate(req.params[idName], { abortEarly: false });
        if (error) {
          details.push({ field: `${idName}`, message: `${error.message}` });
        } else data[idName] = value;
      }
    });

    if (details.length) {
      throw new ValidationError(details);
    }
    req.paramsValidated = { ...req.paramsValidated, ...data };

    next();
  };

export default idValidator;
