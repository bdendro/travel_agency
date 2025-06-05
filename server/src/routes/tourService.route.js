import { Router } from 'express';
import idValidator from '../middleware/validateParamsId.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { deleteTourService } from '../controllers/tourService.controller.js';

const tourServiceRouter = Router();

tourServiceRouter.delete(
  '/:tourServiceId',
  idValidator(['tourServiceId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteTourService
);

export default tourServiceRouter;
