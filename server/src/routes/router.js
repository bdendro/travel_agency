import { Router } from 'express';
import authRouter from './auth.route.js';
import employeeRouter from './employee.route.js';
import tourOperatorRouter from './tourOperator.route.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/employees', employeeRouter);

router.use('/tour-operators', tourOperatorRouter);

export default router;
