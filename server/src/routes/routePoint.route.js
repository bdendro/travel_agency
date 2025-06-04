import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import idValidator from '../middleware/validateParamsId.js';
import { deleteRoutePoint } from '../controllers/routePoint.controller.js';

const routePointRouter = Router();

routePointRouter.delete(
  '/:routePointId',
  idValidator(['routePointId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteRoutePoint
);

export default routePointRouter;
