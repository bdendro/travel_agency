import sequelize from '../db/connection.js';

import Contractor from './Contractor.js';
import Employee from './Employee.js';
import Landmark from './Landmark.js';
import RoutePoint from './RoutePoint.js';
import Tour from './Tour.js';
import TourBooking from './TourBooking.js';
import TourCancellation from './TourCancellation.js';
import TourOperator from './TourOperator.js';
import TourService from './TourService.js';

import User from './User.js';

import ContractorType from './ContractorType.js';
import EmployeePositionType from './EmployeePositionType.js';
import LandmarkType from './LandmarkType.js';
import TourServiceType from './TourServiceType.js';

const models = {
  Tour,
  Employee,
  RoutePoint,
  Landmark,
  TourService,
  Contractor,
  TourBooking,
  TourCancellation,
  TourOperator,
  User,
  ContractorType,
  EmployeePositionType,
  LandmarkType,
  TourServiceType,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
