import CancellationDTO from '../cancellation/Cancellation.dto.js';
import TourBookingDTO from './TourBooking.dto.js';

export default class TourBookingWithCancellationDTO extends TourBookingDTO {
  constructor(
    { id, bookingDate, touristCount, status, price, tourId, tourOperatorId },
    cancellation
  ) {
    super({ id, bookingDate, touristCount, status, price, tourId, tourOperatorId });
    this.cancellation = new CancellationDTO(cancellation);
  }
}
