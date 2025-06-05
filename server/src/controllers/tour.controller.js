import { RoutePointWithLandmarkDTO } from '../dto/routePoint/RoutePointLandmark.dto.js';
import BaseTourDTO from '../dto/tours/BaseTour.dto.js';
import TourDTO from '../dto/tours/Tour.dto.js';
import TourWithEmployeeDTO from '../dto/tours/TourEmployee.dto.js';
import { TourServiceWithContractorDTO } from '../dto/tourService/TourServiceContractor.dto.js';
import { getRoutePoint } from '../middleware/schemas/routePoint.schema.js';
import { getTourService } from '../middleware/schemas/tourService.schema.js';
import employeeService from '../services/employee.service.js';
import routePointService from '../services/routePoint.service.js';
import tourService from '../services/tour.service.js';
import tourServiceService from '../services/tourService.service.js';

export const getTours = async (req, res, next) => {
  try {
    const tours = await tourService.getToursForRole(req.user?.role);
    const toursRes = tours.map((tour) => new TourWithEmployeeDTO(tour, tour.employee));
    return res.status(200).json(toursRes);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeTours = async (req, res, next) => {
  try {
    const tours = await tourService.getToursByEmployeeUserId(req.user?.userId);
    const toursRes = tours.map((tour) => new BaseTourDTO(tour));
    return res.status(200).json(toursRes);
  } catch (err) {
    next(err);
  }
};

export const createTour = async (req, res, next) => {
  const tourReq = req.bodyValidated;
  try {
    const employee = await employeeService.getByUserId(req.user?.userId);
    const tour = await tourService.createTour(tourReq, employee.id);
    return res.status(201).json(new TourDTO(tour));
  } catch (err) {
    next(err);
  }
};

export const createTourForEmployee = async (req, res, next) => {
  const tourReq = req.bodyValidated;
  const employeeId = req.paramsValidated.employeeId;
  try {
    const tour = await tourService.createTour(tourReq, employeeId);
    return res.status(201).json(new TourDTO(tour));
  } catch (err) {
    next(err);
  }
};

export const createRoutePoint = async (req, res, next) => {
  const tourId = req.paramsValidated.tourId;
  const { landmark: landmarkReq } = req.bodyValidated;
  const routePointReq = getRoutePoint(req.bodyValidated);
  try {
    const { landmark, routePoint } = await routePointService.createRoutePointWithLandmark(
      req.user,
      tourId,
      landmarkReq,
      routePointReq
    );
    return res.status(201).json(new RoutePointWithLandmarkDTO(routePoint, landmark));
  } catch (err) {
    next(err);
  }
};

export const createTourService = async (req, res, next) => {
  const tourId = req.paramsValidated.tourId;
  const { contractor: contractorReq } = req.bodyValidated;
  const tourServiceReq = getTourService(req.bodyValidated);
  try {
    const { contractor, tourService } = await tourServiceService.createTourServiceWithContractor(
      req.user,
      tourId,
      contractorReq,
      tourServiceReq
    );
    return res.status(201).json(new TourServiceWithContractorDTO(tourService, contractor));
  } catch (err) {
    next(err);
  }
};

export const setTourScheduled = async (req, res, next) => {
  const tourId = req.paramsValidated.tourId;
  const tourReq = req.bodyValidated;
  try {
    const tour = await tourService.setTourScheduled(req.user, tourId, tourReq);
    return res.status(201).json(new TourDTO(tour));
  } catch (err) {
    next(err);
  }
};

export const deleteTour = async (req, res, next) => {
  const tourId = req.paramsValidated.tourId;
  try {
    await tourService.deleteTourForRole(req.user, tourId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
