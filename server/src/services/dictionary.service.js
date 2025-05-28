import { DB_ERRORS } from '../constants/dbErrors.js';
import DICTIONARY_ITEM_NAMES from '../constants/dictionaryItemNames.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';

export default class DictionaryService {
  constructor(DictionaryModel, dictionaryItemName = DICTIONARY_ITEM_NAMES.DEFAULT) {
    this.DictionaryModel = DictionaryModel;
    this.dictionaryItemName = dictionaryItemName;
  }

  async getAll() {
    return await this.DictionaryModel.findAll();
  }

  async get(id) {
    const item = await this.DictionaryModel.findByPk(id);
    if (!item) throw new NotFoundError(`${this.dictionaryItemName} not found`);
    return item;
  }

  async create(item) {
    try {
      return await this.DictionaryModel.create(item);
    } catch (err) {
      if (err instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError(`${this.dictionaryItemName} with that name already exists`);
      throw err;
    }
  }

  async update(id, item) {
    try {
      const [affectedRowsCount, affectedRows] = await this.DictionaryModel.update(item, {
        where: { id },
        returning: true,
      });
      if (!affectedRowsCount) throw new NotFoundError(`${this.dictionaryItemName} not found`);
      return affectedRows[0];
    } catch (err) {
      if (err instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError(`${this.dictionaryItemName} with that name already exists`);
      throw err;
    }
  }

  async delete(id) {
    try {
      const deletedRowsCount = await this.DictionaryModel.destroy({ where: { id } });
      if (!deletedRowsCount) throw new NotFoundError(`${this.dictionaryItemName} not found`);
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT)
        throw new ConflictError(
          `${this.dictionaryItemName} cannot be deleted because it is referenced by other records.`
        );
      throw err;
    }
  }
}
