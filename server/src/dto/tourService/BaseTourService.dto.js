export default class BaseTourServiceDTO {
  constructor({ id, description, status, price, isMandatory }) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.price = price;
    this.isMandatory = isMandatory;
  }
}
