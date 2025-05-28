import BaseTourDTO from './BaseTour.dto.js';

export default class TourDTO extends BaseTourDTO {
  constructor({ id, name, startDate, endDate, maxTourists, status, pricePerPerson, employeeId }) {
    super({ id, name, startDate, endDate, maxTourists, status, pricePerPerson });
    this.employeeId = employeeId;
  }
}
