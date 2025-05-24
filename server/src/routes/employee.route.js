import { Router } from 'express';
import { registerEmployee, unregisterEmployee } from '../controllers/employee.controller.js';
import idValidator from '../middleware/validateParamsId.js';
import validateSchema from '../middleware/validateSchema.js';
import { createUserSchema } from '../middleware/schemas/user.schema.js';
import { auth } from '../middleware/auth.js';
import USER_ROLES from '../constants/enums/userRoles.js';

const employeeRouter = Router();

employeeRouter.post(
  '/:employeeId/access',
  auth([USER_ROLES.ADMIN]),
  idValidator(['employeeId']),
  validateSchema(createUserSchema),
  registerEmployee
);

employeeRouter.delete(
  '/:employeeId/access',
  auth([USER_ROLES.ADMIN]),
  idValidator(['employeeId']),
  unregisterEmployee
);

export default employeeRouter;
