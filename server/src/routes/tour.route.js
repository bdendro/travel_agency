import { Router } from 'express';
import {
  createRoutePoint,
  createTour,
  createTourForEmployee,
  createTourService,
  deleteTour,
  getEmployeeTours,
  getTours,
  setTourScheduled,
} from '../controllers/tour.controller.js';
import { auth } from '../middleware/auth.js';
import validateSchema from '../middleware/validateSchema.js';
import idValidator from '../middleware/validateParamsId.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { createTourSchema, tourScheduledSchema } from '../middleware/schemas/tour.schema.js';
import { createRoutePointWithLandmarkSchema } from '../middleware/schemas/routePoint.schema.js';
import { createTourServiceContractorSchema } from '../middleware/schemas/tourService.schema.js';

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

tourRouter.post(
  '/:tourId/route-points',
  idValidator(['tourId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  validateSchema(createRoutePointWithLandmarkSchema),
  createRoutePoint
);

tourRouter.post(
  '/:tourId/tour-services',
  idValidator(['tourId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  validateSchema(createTourServiceContractorSchema),
  createTourService
);

tourRouter.patch(
  '/:tourId/set-scheduled',
  idValidator(['tourId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  validateSchema(tourScheduledSchema),
  setTourScheduled
);

tourRouter.delete(
  '/:tourId',
  idValidator(['tourId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteTour
);

export default tourRouter;
