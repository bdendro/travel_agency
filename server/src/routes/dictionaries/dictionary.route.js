import { Router } from 'express';
import contractorTypeRouter from './contractorType.route.js';
import employeePositionRouter from './employeePosition.route.js';
import landmarkTypeRouter from './landmarkType.route.js';
import tourServiceTypeRouter from './tourServiceType.route.js';

const dictionaryRoute = Router();

dictionaryRoute.use('/contractor-types', contractorTypeRouter);
dictionaryRoute.use('/employee-positions', employeePositionRouter);
dictionaryRoute.use('/landmark-types', landmarkTypeRouter);
dictionaryRoute.use('/tour-service-types', tourServiceTypeRouter);

export default dictionaryRoute;
