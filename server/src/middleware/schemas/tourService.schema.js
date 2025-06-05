import Joi from 'joi';
import { createContractorSchema } from './contractor.schema.js';
import TOUR_SERVICE_STATUSES from '../../constants/enums/tourServiceStatuses.js';

export const getTourService = (req) => {
  return {
    typeId: req.typeId,
    description: req.description,
    status: req.status,
    price: req.price,
    isMandatory: req.isMandatory,
  };
};

export const createTourServiceContractorSchema = Joi.object({
  description: Joi.string().trim().min(1),
  status: Joi.string().valid(TOUR_SERVICE_STATUSES.PREPARING, TOUR_SERVICE_STATUSES.READY),
  price: Joi.number().positive().required(),
  isMandatory: Joi.boolean(),
  typeId: Joi.number().integer().positive().required(),
  contractor: createContractorSchema.required(),
});
