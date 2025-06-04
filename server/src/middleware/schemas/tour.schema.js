import Joi from 'joi';

export const createTourSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  maxTourists: Joi.number().integer().positive(),
});

export const tourScheduledSchema = Joi.object({
  startDate: Joi.date().iso().required().messages({
    'date.format': '{#label} must be in ISO 8601 (YYYY-MM-DDTHH:mm:ss) format',
  }),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required().messages({
    'date.min': '{#label} must be after the start date',
    'date.format': '{#label} must be in ISO 8601 (YYYY-MM-DDTHH:mm:ss) format',
  }),
});
