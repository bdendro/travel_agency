import { ValidationError } from '../utils/HttpErrors.js';

// prop = body | params | query
const validateSchema =
  (schema, prop = 'body') =>
  (req, res, next) => {
    if (!['body', 'params', 'query'].includes(prop)) {
      throw new Error(`'${prop}' is not valid req property`);
    }
    const { error, value } = schema.validate(req[prop] || {}, {
      allowUnknown: false,
      abortEarly: false,
    });
    if (error) {
      const details = error.details.map((d) => {
        return { field: `${d.path.join('.')}`, message: `${d.message}` };
      });
      throw new ValidationError(details);
    }

    req[`${prop}Validated`] = value;

    next();
  };

export default validateSchema;
