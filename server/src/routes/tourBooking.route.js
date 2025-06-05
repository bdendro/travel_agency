import { Router } from 'express';
import idValidator from '../middleware/validateParamsId.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { cancelTourBooking } from '../controllers/tourBooking.controller.js';
import validateSchema from '../middleware/validateSchema.js';
import { createTourCancellationSchema } from '../middleware/schemas/cancellation.schema.js';

const tourBookingRouter = Router();

tourBookingRouter.patch(
  '/:tourBookingId/cancel',
  idValidator(['tourBookingId']),
  auth([USER_ROLES.TOUR_OPERATOR]),
  validateSchema(createTourCancellationSchema),
  cancelTourBooking
);

export default tourBookingRouter;
