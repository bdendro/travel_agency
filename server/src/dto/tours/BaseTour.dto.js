export default class BaseTourDTO {
  constructor({ id, name, startDate, endDate, maxTourists, status, pricePerPerson }) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxTourists = maxTourists;
    this.status = status;
    this.pricePerPerson = pricePerPerson;
  }
}
