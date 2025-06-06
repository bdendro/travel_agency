export default class BaseTourBookingDTO {
  constructor({ id, bookingDate, touristCount, status, price }) {
    this.id = id;
    this.bookingDate = bookingDate;
    this.touristCount = touristCount;
    this.status = status;
    this.price = price;
  }
}
