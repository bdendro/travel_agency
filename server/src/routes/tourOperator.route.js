import { Router } from 'express';
import {
  registerTourOperator,
  unregisterTourOperator,
} from '../controllers/tourOperator.controller.js';
import idValidator from '../middleware/validateParamsId.js';
import validateSchema from '../middleware/validateSchema.js';
import { createUserSchema } from '../middleware/schemas/user.schema.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';

const tourOperatorRouter = Router();

tourOperatorRouter.post(
  '/:tourOperatorId/access',
  auth([USER_ROLES.ADMIN]),
  idValidator(['tourOperatorId']),
  validateSchema(createUserSchema),
  registerTourOperator
);

tourOperatorRouter.delete(
  '/:tourOperatorId/access',
  auth([USER_ROLES.ADMIN]),
  idValidator(['tourOperatorId']),
  unregisterTourOperator
);

export default tourOperatorRouter;
