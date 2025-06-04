import Tour from '../models/Tour.js';
import Employee from '../models/Employee.js';
import EmployeePositionType from '../models/EmployeePositionType.js';
import User from '../models/User.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/HttpErrors.js';
import TOUR_STATUSES_FOR_ROLE from '../constants/tourView.js';
import TOUR_STATUSES from '../constants/enums/tourStatuses.js';
import { getFutureDate } from '../utils/dates.js';
import employeeService from './employee.service.js';

class TourService {
  constructor() {
    this.Tour = Tour;
    this.Employee = Employee;
    this.User = User;
    this.EmployeePositionType = EmployeePositionType;
    this.employeeService = employeeService;
  }

  async getToursForRole(role) {
    switch (role) {
      case USER_ROLES.TOUR_OPERATOR:
        return await this.getToursByStatuses(TOUR_STATUSES_FOR_ROLE.TOUR_OPERATOR);
      case USER_ROLES.EMPLOYEE:
        return await this.getToursByStatuses(TOUR_STATUSES_FOR_ROLE.EMPLOYEE);
      case USER_ROLES.ADMIN:
        return await this.getToursByStatuses(TOUR_STATUSES_FOR_ROLE.ADMIN);
      default:
        throw new BadRequestError(`Role '${role}' doesn't exists`);
    }
  }

  async getToursByEmployeeUserId(userId) {
    return await this.Tour.findAll({
      order: [['status', 'ASC']],
      include: [
        {
          model: this.Employee,
          as: 'employee',
          required: true,
          include: [{ model: this.User, required: true, as: 'user', where: { id: userId } }],
        },
      ],
    });
  }

  async getToursByStatuses(statuses) {
    return await this.Tour.findAll({
      where: { status: statuses },
      order: [['status', 'ASC']],
      include: [
        {
          model: this.Employee,
          as: 'employee',
          include: [{ model: this.EmployeePositionType, as: 'position' }],
        },
      ],
    });
  }

  async createTour(tour, employeeId) {
    const newTour = { ...tour, employeeId };
    try {
      return await this.Tour.create(newTour);
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError(`This employee doesn't exists`);
      throw err;
    }
  }

  async setTourScheduled(user, tourId, updates) {
    if (updates.startDate < getFutureDate(process.env.TOUR_LOCKED_DURATION))
      throw new BadRequestError(
        `Start date must be at least now + ${process.env.TOUR_LOCKED_DURATION}`
      );

    const employee = await this.employeeService.getByUserId(user?.userId);
    const tour = await this.Tour.findOne({ where: { id: tourId, employeeId: employee.id } });
    if (!tour) throw new NotFoundError('Tour not found');
    if (tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(
        `Tour with only '${TOUR_STATUSES.DRAFT}' status can be updated to '${TOUR_STATUSES.SCHEDULED}'`
      );

    const [affectedRows, updatedTours] = await this.Tour.update(
      { ...updates, status: TOUR_STATUSES.SCHEDULED },
      { where: { id: tourId, employeeId: employee.id }, returning: true }
    );
    if (!affectedRows) throw new NotFoundError('Tour not found');
    return updatedTours[0];
  }

  async deleteTourForRole(user, tourId) {
    const tour = await this.Tour.findByPk(tourId);
    if (!tour) throw new NotFoundError('Tour not found');
    if (tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(`Tour with only '${TOUR_STATUSES.DRAFT}' status can be deleted`);

    switch (user?.role) {
      case USER_ROLES.EMPLOYEE:
        return await this.deleteTourByEmployee(user?.userId, tourId);
      case USER_ROLES.ADMIN:
        return await this.deleteTourByAdmin(tourId);
      default:
        throw new BadRequestError(`Role '${role}' doesn't exists`);
    }
  }

  async deleteTourByEmployee(userId, tourId) {
    const employee = await this.employeeService.getByUserId(userId);

    try {
      const deletedRowsCount = await this.Tour.destroy({
        where: { id: tourId, employeeId: employee.id },
      });
      if (!deletedRowsCount) throw new NotFoundError('Tour not found');
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        // on cascade needed for routePoints
        throw new ConflictError(
          `Tour cannot be deleted because it is referenced by other records.`
        );
      throw err;
    }
  }

  async deleteTourByAdmin(tourId) {
    try {
      const deletedRowsCount = await this.Tour.destroy({ where: { id: tourId } });
      if (!deletedRowsCount) throw new NotFoundError('Tour not found');
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        // on cascade needed for routePoints
        throw new ConflictError(
          `Tour cannot be deleted because it is referenced by other records.`
        );
      throw err;
    }
  }
}

export default new TourService();
