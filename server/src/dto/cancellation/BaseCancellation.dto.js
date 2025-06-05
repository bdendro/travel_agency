export default class BaseCancellationDTO {
  constructor({ id, cancellationDate, reason, refundAmount, refundStatus }) {
    this.id = id;
    this.cancellationDate = cancellationDate;
    this.reason = reason;
    this.refundAmount = refundAmount;
    this.refundStatus = refundStatus;
  }
}
