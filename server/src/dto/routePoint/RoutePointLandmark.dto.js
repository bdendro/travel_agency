import LandmarkDTO from '../landmark/Landmark.dto.js';
import BaseRoutePointDTO from './BaseRoutePoint.dto.js';

export class BaseRoutePointWithLandmarkDTO extends BaseRoutePointDTO {
  constructor({ id, sequenceOrder, durationInSeconds }, landmark) {
    super({ id, sequenceOrder, durationInSeconds });
    this.landmark = new LandmarkDTO(landmark);
  }
}

export class RoutePointWithLandmarkDTO extends BaseRoutePointWithLandmarkDTO {
  constructor({ id, sequenceOrder, durationInSeconds, tourId }, landmark) {
    super({ id, sequenceOrder, durationInSeconds }, landmark);
    this.tourId = tourId;
  }
}
