import Joi from 'joi';

export const createTourCancellationSchema = Joi.object({
  reason: Joi.string().trim().min(1),
});
