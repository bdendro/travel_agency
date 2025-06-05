import sequelize from '../db/connection.js';
import TourOperator from '../models/TourOperator.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/HttpErrors.js';
import userService from './user.service.js';
import { DB_ERRORS } from '../constants/dbErrors.js';

class TourOperatorService {
  constructor() {
    this.TourOperator = TourOperator;
    this.userService = userService;
  }

  async getByUserId(userId) {
    const tourOperator = await this.TourOperator.findOne({ where: { userId: userId } });
    if (!tourOperator) throw new NotFoundError('Tour operator not found');
    return tourOperator;
  }

  async getByUser(user) {
    const tourOperator = await user.getTourOperator();
    if (!tourOperator) throw new NotFoundError('Tour operator not found');
    return tourOperator;
  }

  async registerTourOperator(user, tourOperatorId) {
    if (USER_ROLES.TOUR_OPERATOR !== user.role) {
      throw new BadRequestError(`'${user.role}' isn't tour operator role`);
    }
    const t = await sequelize.transaction();

    try {
      const tourOperator = await this.TourOperator.findByPk(tourOperatorId, {
        transaction: t,
        lock: t?.LOCK.UPDATE,
      });

      if (!tourOperator) throw new NotFoundError('Tour operator not found');
      if (tourOperator.userId) throw new ConflictError('Tour operator already has access');

      const userRes = await this.userService.createUser(user, t);
      const newTourOperator = await this.setTourOperatorUserId(tourOperatorId, userRes.id, t);
      await t.commit();
      return { user: userRes, tourOperator: newTourOperator };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async unregisterTourOperator(tourOperatorId) {
    const tourOperator = await this.TourOperator.findByPk(tourOperatorId);

    if (!tourOperator) throw new NotFoundError('Tour operator not found');
    if (!tourOperator.userId) throw new ConflictError("Tour operator already don't have access");

    await this.userService.delete(tourOperator.userId); // ON DELETE: SET NULL to employee userId
    return await this.TourOperator.findByPk(tourOperatorId);
  }

  async setTourOperatorUserId(id, userId, transaction) {
    try {
      const [affectedRowsCount, updated] = await this.TourOperator.update(
        { userId },
        { where: { id }, transaction, returning: true }
      );
      if (!affectedRowsCount) throw new NotFoundError('Tour operator not found');
      return updated[0];
    } catch (error) {
      if (error instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new BadRequestError('User with that id already in use');
      throw error;
    }
  }
}

export default new TourOperatorService();
