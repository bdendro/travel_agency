import CONSTRAINTS from '../constants/constraintNames.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import TOUR_STATUSES from '../constants/enums/tourStatuses.js';
import sequelize from '../db/connection.js';
import RoutePoint from '../models/RoutePoint.js';
import Tour from '../models/Tour.js';
import { ConflictError, ForbiddenError, NotFoundError } from '../utils/HttpErrors.js';
import employeeService from './employee.service.js';
import landmarkService from './landmark.service.js';

class RoutePointService {
  constructor() {
    this.RoutePoint = RoutePoint;
    this.Tour = Tour;
    this.employeeService = employeeService;
    this.landmarkService = landmarkService;
  }

  async createRoutePointWithLandmark(user, tourId, landmark, routePoint) {
    const employee = await this.employeeService.getByUserId(user?.userId);
    const tour = await this.Tour.findByPk(tourId);

    if (!tour) throw new NotFoundError('Tour not found');
    if (tour.employeeId !== employee.id)
      throw new ForbiddenError('You do not have permission to modify this tour');
    if (tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(`Tour with only '${TOUR_STATUSES.DRAFT}' can be modified`);

    return await sequelize.transaction(async (t) => {
      const newLandmark = await this.landmarkService.createLandmark(landmark, t);
      const newRoutePoint = await this.createRoutePoint(routePoint, tourId, newLandmark.id, t);
      return { landmark: newLandmark, routePoint: newRoutePoint };
    });
  }

  async createRoutePoint(routePoint, tourId, landmarkId, transaction) {
    try {
      const lastOrder = await this.RoutePoint.max('sequenceOrder', {
        where: { tourId },
      });
      const sequenceOrder = routePoint.sequenceOrder || (lastOrder || 0) + 1;

      return await this.RoutePoint.create(
        { ...routePoint, tourId, landmarkId, sequenceOrder },
        { transaction }
      );
    } catch (err) {
      if (err instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError("A tour can't contain two route points with the same order");
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT) {
        if (err.constraint === CONSTRAINTS.ROUTE_POINTS_TOURS_FK)
          throw new ConflictError('Referenced tour does not exist');
        if (err.constraint === CONSTRAINTS.ROUTE_POINTS_LANMARKS_FK) {
          throw new ConflictError('Referenced landmark type does not exist');
        }
      }
      throw err;
    }
  }

  async deleteRoutePoint(user, routePointId) {
    const employee = await this.employeeService.getByUserId(user?.userId);

    const routePoint = await this.RoutePoint.findOne({
      where: { id: routePointId },
      include: [{ model: this.Tour, as: 'tour', where: { employeeId: employee.id } }],
    });
    if (!routePoint) throw new NotFoundError('Route point not found');
    if (!routePoint.tour) throw new NotFoundError('Tour not found');
    if (routePoint.tour.status !== TOUR_STATUSES.DRAFT)
      throw new ConflictError(
        `Route points with only tour status '${TOUR_STATUSES.DRAFT}' can be deleted`
      );

    const affectedRowsCount = await this.RoutePoint.destroy({ where: { id: routePoint.id } });
    if (!affectedRowsCount) throw new NotFoundError('Route point not found');
  }
}

export default new RoutePointService();
