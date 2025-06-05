import BaseCancellationDTO from './BaseCancellation.dto.js';

export default class CancellationDTO extends BaseCancellationDTO {
  constructor({ id, cancellationDate, reason, refundAmount, refundStatus, tourBookingId }) {
    super({ id, cancellationDate, reason, refundAmount, refundStatus });
    this.tourBookingId = tourBookingId;
  }
}
