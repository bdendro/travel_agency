import UserDTO, { UserRawDTO } from '../user/User.dto.js';
import BaseEmployeeDTO from './BaseEmployee.dto.js';

export default class EmployeeWithUserDTO extends BaseEmployeeDTO {
  constructor(employee, user = null) {
    super(employee);
    this.user = user ? new UserDTO(user) : null;
  }
}

export class EmployeeWithUserRawDTO extends BaseEmployeeDTO {
  constructor(employee, user, password) {
    super(employee);
    this.user = new UserRawDTO(user, password);
  }
}
