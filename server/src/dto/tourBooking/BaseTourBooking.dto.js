export default class BaseTourBookingDTO {
  constructor({ id, bookingDate, touristsCount, status, price }) {
    this.id = id;
    this.bookingDate = bookingDate;
    this.touristCount = touristsCount;
    this.status = status;
    this.price = price;
  }
}
