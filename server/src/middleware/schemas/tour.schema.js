import Joi from 'joi';

export const createTourSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  maxTourists: Joi.number().integer().positive(),
});
