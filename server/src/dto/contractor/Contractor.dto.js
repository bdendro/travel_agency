import DictionaryDTO from '../dictionary/Dictionary.dto.js';
import BaseContractorDTO from './BaseContractor.dto.js';

export default class ContractorDTO extends BaseContractorDTO {
  constructor({ id, name, contactPhone, email, type }) {
    super({ id, name, contactPhone, email });
    this.type = new DictionaryDTO(type);
  }
}
