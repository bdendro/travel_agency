import Joi from 'joi';
import { createLandmarkSchema } from './landmark.schema.js';

export const getRoutePoint = (req) => {
  return {
    sequenceOrder: req.sequenceOrder,
    durationInSeconds: req.durationInSeconds,
  };
};

export const createRoutePointWithLandmarkSchema = Joi.object({
  durationInSeconds: Joi.number().integer().positive(),
  sequenceOrder: Joi.number().integer().positive(),
  landmark: createLandmarkSchema.required(),
});
