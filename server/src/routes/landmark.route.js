import { Router } from 'express';
import idValidator from '../middleware/validateParamsId.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { deleteLandmark } from '../controllers/landmark.controller.js';

const landmarkRouter = Router();

landmarkRouter.delete(
  '/:landmarkId',
  idValidator(['landmarkId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteLandmark
);

export default landmarkRouter;
