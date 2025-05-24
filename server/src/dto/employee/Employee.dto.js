import BaseEmployeeDTO from './BaseEmployee.dto';

export default class EmployeeDTO extends BaseEmployeeDTO {
  constructor({ id, name, positionId, employedSince, email, userId }) {
    super({ id, name, positionId, employedSince, email, userId });
    this.userId = userId;
  }
}
