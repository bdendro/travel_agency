import BaseTourBookingDTO from './BaseTourBooking.dto.js';

export default class TourBookingDTO extends BaseTourBookingDTO {
  constructor({ id, bookingDate, touristCount, status, price, tourId, tourOperatorId }) {
    super({ id, bookingDate, touristCount, status, price });
    this.tourId = tourId;
    this.tourOperatorId = tourOperatorId;
  }
}
