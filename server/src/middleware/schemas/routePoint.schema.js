import Joi from 'joi';
import { createLandmarkSchema } from './landmark.schema.js';

export const getRoutePoint = (req) => {
  return {
    sequenceOrder: req.sequenceOrder,
    duration: req.duration,
  };
};

export const createRoutePointWithLandmarkSchema = Joi.object({
  durationInSeconds: Joi.number().integer().positive(),
  sequenceOrder: Joi.number().integer().positive(),
  landmark: createLandmarkSchema.required(),
});
