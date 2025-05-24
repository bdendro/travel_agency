import BaseTourOperatorDTO from './BaseTouroperator.dto.js';
import UserDTO, { UserRawDTO } from '../user/User.dto.js';

export class TourOperatorUserDTO extends BaseTourOperatorDTO {
  constructor(tourOperator, user = null) {
    super(tourOperator);
    this.user = user ? new UserDTO(user) : null;
  }
}

export class TourOperatorUserRawDTO extends BaseTourOperatorDTO {
  constructor(tourOperator, user, password) {
    super(tourOperator);
    this.user = new UserRawDTO(user, password);
  }
}
