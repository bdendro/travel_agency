import DictionaryDTO from '../dictionary/Dictionary.dto.js';

export default class BaseEmployeeDTO {
  constructor({ id, name, position, employedSince, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.position = new DictionaryDTO(position);
    this.employedSince = employedSince;
  }
}
