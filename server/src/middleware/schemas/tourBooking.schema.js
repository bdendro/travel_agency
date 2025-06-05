import Joi from 'joi';
import TOUR_BOOKING_STATUSES from '../../constants/enums/tourBookingStatuses.js';

export const createTourBookingSchema = Joi.object({
  touristCount: Joi.number().integer().positive().max(50).required(),
  status: Joi.string().trim().valid(TOUR_BOOKING_STATUSES.PENDING, TOUR_BOOKING_STATUSES.PAID),
});
