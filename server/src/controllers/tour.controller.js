import BaseTourDTO from '../dto/tours/BaseTour.dto.js';
import TourDTO from '../dto/tours/Tour.dto.js';
import TourWithEmployeeDTO from '../dto/tours/TourEmployee.dto.js';
import tourService from '../services/tour.service.js';

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
    const employee = await tourService.getEmployeeByUserId(req.user?.userId);
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

export const deleteTour = async (req, res, next) => {
  const tourId = req.paramsValidated.tourId;
  try {
    await tourService.deleteTourForRole(req.user, tourId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
