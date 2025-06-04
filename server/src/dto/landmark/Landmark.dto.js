import DictionaryDTO from '../dictionary/Dictionary.dto.js';
import BaseLandmarkDTO from './BaseLandmark.dto.js';

export default class LandmarkDTO extends BaseLandmarkDTO {
  constructor({ id, name, description, geographicLocation, type }) {
    super({ id, name, description, geographicLocation });
    this.type = new DictionaryDTO(type);
  }
}
