import { Router } from 'express';
import idValidator from '../middleware/validateParamsId.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { deleteContractor } from '../controllers/contractor.controller.js';

const contractorRouter = Router();

contractorRouter.delete(
  '/:contractorId',
  idValidator(['contractorId']),
  auth([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN]),
  deleteContractor
);

export default contractorRouter;
