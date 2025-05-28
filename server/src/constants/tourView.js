import TOUR_STATUSES from './enums/tourStatuses.js';

const statuses = Object.values(TOUR_STATUSES);

const TOUR_STATUSES_FOR_ROLE = {
  ADMIN: statuses,
  EMPLOYEE: statuses.filter((s) => s !== TOUR_STATUSES.DRAFT),
  TOUR_OPERATOR: statuses.filter((s) => s !== TOUR_STATUSES.DRAFT),
};

export default TOUR_STATUSES_FOR_ROLE;
