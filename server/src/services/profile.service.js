import USER_ROLES from '../constants/enums/userRoles.js';
import EmployeeWithUserDTO from '../dto/employee/EmployeeUser.output.dto.js';
import { TourOperatorUserDTO } from '../dto/tourOperator/TourOperatorUser.dto.js';
import employeeService from './employee.service.js';
import tourOperatorService from './tourOperator.service.js';

class ProfileService {
  constructor() {
    this.employeeService = employeeService;
    this.tourOperatorService = tourOperatorService;
  }

  async getProfileWithUserDto(user) {
    if ([USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN].includes(user.role)) {
      const employee = await this.employeeService.getByUser(user);
      return new EmployeeWithUserDTO(employee, user);
    }

    if (user.role === USER_ROLES.TOUR_OPERATOR) {
      const tourOperator = await this.tourOperatorService.getByUser(user);
      return new TourOperatorUserDTO(tourOperator, user);
    }
    throw new BadRequestError(`Role '${user.role}' doesn't exists`);
  }
}

export default new ProfileService();
