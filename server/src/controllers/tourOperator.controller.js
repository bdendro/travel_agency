import {
  TourOperatorUserDTO,
  TourOperatorUserRawDTO,
} from '../dto/tourOperator/TourOperatorUser.dto.js';
import tourOperatorService from '../services/tourOperator.service.js';

export const registerTourOperator = async (req, res, next) => {
  const tourOperatorId = req.paramsValidated.tourOperatorId;
  try {
    const { user, tourOperator } = await tourOperatorService.registerTourOperator(
      req.bodyValidated,
      tourOperatorId
    );
    return res.status(201).json(new TourOperatorUserRawDTO(tourOperator, user, req.body.password));
  } catch (err) {
    next(err);
  }
};

export const unregisterTourOperator = async (req, res, next) => {
  const tourOperatorId = req.paramsValidated.tourOperatorId;
  try {
    const tourOperator = await tourOperatorService.unregisterTourOperator(tourOperatorId);
    return res.status(200).json(new TourOperatorUserDTO(tourOperator));
  } catch (err) {
    next(err);
  }
};
