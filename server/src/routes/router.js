import { Router } from 'express';
import authRouter from './auth.route.js';
import employeeRouter from './employee.route.js';
import tourOperatorRouter from './tourOperator.route.js';
import dictionaryRoute from './dictionaries/dictionary.route.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { auth } from '../middleware/auth.js';
import tourRouter from './tour.route.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/dictionaries', auth([USER_ROLES.ADMIN]), dictionaryRoute);

router.use('/employees', employeeRouter);

router.use('/tour-operators', tourOperatorRouter);

router.use('/tours', tourRouter);

export default router;
