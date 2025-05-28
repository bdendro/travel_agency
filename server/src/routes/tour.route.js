import { Router } from 'express';
import {
  createTour,
  createTourForEmployee,
  deleteTour,
  getEmployeeTours,
  getTours,
} from '../controllers/tour.controller.js';
import { auth } from '../middleware/auth.js';
import validateSchema from '../middleware/validateSchema.js';
import idValidator from '../middleware/validateParamsId.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { createTourSchema } from '../middleware/schemas/tour.schema.js';

const tourRouter = Router();

tourRouter.get('/', auth(), getTours);

tourRouter.get('/my-tours', auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]), getEmployeeTours); // Route for employee to view "draft" tours

tourRouter.post(
  '/',
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  validateSchema(createTourSchema),
  createTour
);

tourRouter.post(
  '/employees/:employeeId',
  auth([USER_ROLES.ADMIN]),
  idValidator(['employeeId']),
  validateSchema(createTourSchema),
  createTourForEmployee
);

tourRouter.delete(
  '/:tourId',
  idValidator(['tourId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteTour
);

export default tourRouter;
