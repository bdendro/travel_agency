import Joi from 'joi';

export const createLandmarkSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  description: Joi.string().trim().min(1),
  geographicLocation: Joi.string().trim().required(),
  typeId: Joi.number().integer().positive().required(),
});
