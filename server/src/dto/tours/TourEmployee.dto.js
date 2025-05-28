import BaseEmployeeDTO from '../employee/BaseEmployee.dto.js';
import BaseTourDTO from './BaseTour.dto.js';

export default class TourWithEmployeeDTO extends BaseTourDTO {
  constructor({ id, name, startDate, endDate, maxTourists, status, pricePerPerson }, employee) {
    super({ id, name, startDate, endDate, maxTourists, status, pricePerPerson });
    this.employee = new BaseEmployeeDTO(employee);
  }
}
