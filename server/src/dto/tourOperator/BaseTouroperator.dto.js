export default class BaseTourOperatorDTO {
  constructor({ id, name, type, contactPhone, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
    this.contactPhone = contactPhone;
  }
}
