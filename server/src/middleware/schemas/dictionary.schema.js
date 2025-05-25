import Joi from 'joi';

export const dicionarySchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
});
