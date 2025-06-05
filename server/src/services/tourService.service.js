import { Op } from 'sequelize';
import Decimal from 'decimal.js';
import TOUR_STATUSES from '../constants/enums/tourStatuses.js';
import Tour from '../models/Tour.js';
import TourService from '../models/TourService.js';
import { ConflictError, ForbiddenError, NotFoundError } from '../utils/HttpErrors.js';
import TOUR_SERVICE_STATUSES from '../constants/enums/tourServiceStatuses.js';
import PRICE_MULTIPLIERS from '../constants/priceMultipliers.js';
import employeeService from './employee.service.js';
import sequelize from '../db/connection.js';
import contractorService from './contractor.service.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import CONSTRAINTS from '../constants/constraintNames.js';
import TourServiceType from '../models/TourServiceType.js';

class TourServiceService {
  constructor() {
    this.Tour = Tour;
    this.TourService = TourService;
    this.TourServiceType = TourServiceType;
    this.employeeService = employeeService;
    this.contractorService = contractorService;
  }

  async getWithType(id, transaction) {
    const tourService = await this.TourService.findByPk(id, {
      include: [{ model: this.TourServiceType, as: 'type' }],
      transaction,
    });
    if (!tourService) throw new NotFoundError('Tour service not found');
    return tourService;
  }

  async createTourServiceWithContractor(user, tourId, contractor, tourService) {
    const employee = await this.employeeService.getByUserId(user?.userId);
    const tour = await this.Tour.findByPk(tourId);

    if (!tour) throw new NotFoundError('Tour not found');
    if (tour.employeeId !== employee.id)
      throw new ForbiddenError('You do not have permission to modify this tour');
    if (tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(`Tour with only '${TOUR_STATUSES.DRAFT}' can be modified`);

    return await sequelize.transaction(async (t) => {
      const newContractor = await this.contractorService.createContractor(contractor, t);
      const newTourService = await this.createTourService(tourService, tourId, newContractor.id, t);
      return { contractor: newContractor, tourService: newTourService };
    });
  }

  async createTourService(tourService, tourId, contractorId, transaction) {
    try {
      const newTourService = await this.TourService.create(
        { ...tourService, tourId, contractorId },
        { transaction }
      );
      return await this.getWithType(newTourService.id, transaction);
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT) {
        if (err.original.constraint === CONSTRAINTS.TOUR_SERVICES_TOURS_FK)
          throw new ConflictError('Referenced tour does not exist');
        if (err.original.constraint === CONSTRAINTS.TOUR_SERVICES_CONTRACTORS_FK)
          throw new ConflictError('Referenced contractor does not exist');
        if (err.original.constraint === CONSTRAINTS.TOUR_SERVICES_TYPES_FK)
          throw new ConflictError('Referenced tour service type does not exist');
      }
      throw err;
    }
  }

  async getTourPrice(tourId) {
    const tour = await this.Tour.findOne({
      where: { id: tourId },
      attributes: {
        include: [
          [
            this.Tour.sequelize.fn('SUM', this.Tour.sequelize.col('tourServices.price')),
            'pricePerPerson',
          ],
        ],
      },
      include: {
        model: this.TourService,
        as: 'tourServices',
        attributes: [],
        required: false,
        where: {
          status: {
            [Op.in]: [TOUR_SERVICE_STATUSES.PREPARING, TOUR_SERVICE_STATUSES.READY],
          },
        },
      },
      group: ['Tour.id'],
    });

    if (!tour) throw new NotFoundError('Tour not found');
    const statuses = [TOUR_STATUSES.DRAFT, TOUR_STATUSES.SCHEDULED, TOUR_STATUSES.LOCKED];
    if (!statuses.includes(tour.status))
      throw new ConflictError(`Tour price can be calculated only for: '${statuses.join("', '")}'`);

    const pricePerPerson = new Decimal(tour.pricePerPerson || 0);
    return pricePerPerson.times(PRICE_MULTIPLIERS.BASE_TOUR).toNumber();
  }

  async deleteTourService(user, tourServiceId) {
    const employee = await this.employeeService.getByUserId(user?.userId);

    const tourService = await this.TourService.findOne({
      where: { id: tourServiceId },
      include: [{ model: this.Tour, as: 'tour', where: { employeeId: employee.id } }],
    });
    if (!tourService) throw new NotFoundError('Tour service not found');
    if (!tourService.tour) throw new NotFoundError('Tour not found');
    if (tourService.tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(
        `Tour services with only tour status '${TOUR_STATUSES.DRAFT}' can be deleted`
      );

    const affectedRowsCount = await this.TourService.destroy({ where: { id: tourService.id } });
    if (!affectedRowsCount) throw new NotFoundError('Tour service not found');
  }
}

export default new TourServiceService();
