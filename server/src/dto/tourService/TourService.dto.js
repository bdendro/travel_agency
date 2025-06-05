import DictionaryDTO from '../dictionary/Dictionary.dto.js';
import BaseTourServiceDTO from './BaseTourService.dto.js';

export default class TourServiceDTO extends BaseTourServiceDTO {
  constructor({ id, description, status, price, isMandatory, type }) {
    super({ id, description, status, price, isMandatory });
    this.type = new DictionaryDTO(type);
  }
}
