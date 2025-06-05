import { DB_ERRORS } from '../constants/dbErrors.js';
import Contractor from '../models/Contractor.js';
import ContractorType from '../models/ContractorType.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';

class ContractorService {
  constructor() {
    this.Contractor = Contractor;
    this.ContractorType = ContractorType;
  }

  async getWithType(id, transaction) {
    const contractor = await this.Contractor.findByPk(id, {
      include: [{ model: this.ContractorType, as: 'type' }],
      transaction,
    });
    if (!contractor) throw new NotFoundError('Contractor not found');
    return contractor;
  }

  async createContractor(contractor, transaction) {
    try {
      const newContractor = await this.Contractor.create(contractor, { transaction });
      return await this.getWithType(newContractor.id, transaction);
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError('Referenced contractor type does not exist');
      throw err;
    }
  }

  async delete(contractorId) {
    try {
      const affectedRowsCount = await this.Contractor.destroy({ where: { id: contractorId } });
      if (!affectedRowsCount) throw new NotFoundError('Contractor not found');
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError(
          'Contractor cannot be deleted because it is referenced by other records'
        );
      throw err;
    }
  }
}

export default new ContractorService();
