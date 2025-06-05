import Joi from 'joi';

export const createContractorSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  typeId: Joi.number().integer().positive().required(),
  contactPhone: Joi.string()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .messages({
      'string.pattern.base': 'Phone number must be a valid international format',
    }),
  email: Joi.string().trim().email().max(100).required(),
});
