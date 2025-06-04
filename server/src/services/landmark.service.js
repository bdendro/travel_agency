import { DB_ERRORS } from '../constants/dbErrors.js';
import Landmark from '../models/Landmark.js';
import LandmarkType from '../models/LandmarkType.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';

class LandmarkService {
  constructor() {
    this.Landmark = Landmark;
    this.LandmarkType = LandmarkType;
  }

  async getWithType(id, transaction) {
    const landmark = await this.Landmark.findByPk(id, {
      include: [{ model: this.LandmarkType, as: 'type', required: true }],
      transaction,
    });
    if (!landmark) throw new NotFoundError('Landmark not found');
    return landmark;
  }

  async createLandmark(landmark, transaction) {
    try {
      const newLandmark = await this.Landmark.create(landmark, { transaction });
      return await this.getWithType(newLandmark.id, transaction);
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError('Referenced landmark type does not exist');
      throw err;
    }
  }

  async delete(landmarkId) {
    try {
      const affectedRowsCount = await this.Landmark.destroy({ where: { id: landmarkId } });
      if (!affectedRowsCount) throw new NotFoundError('Landmark not found');
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError(
          'Landmark cannot be deleted because it is referenced by other records'
        );
      throw err;
    }
  }
}

export default new LandmarkService();
