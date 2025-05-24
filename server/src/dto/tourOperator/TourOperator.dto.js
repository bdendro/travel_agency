import BaseTourOperatorDTO from './BaseTouroperator.dto.js';

export default class TourOperatorDTO extends BaseTourOperatorDTO {
  constructor({ id, name, type, contactPhone, email, userId }) {
    super({ id, name, type, contactPhone, email });
    this.userId = userId;
  }
}
