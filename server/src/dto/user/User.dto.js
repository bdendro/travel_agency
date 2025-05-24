export default class UserDTO {
  constructor({ id, username, role, createdAt }) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export class UserRawDTO {
  constructor({ id, username, role, createdAt }, password) {
    this.id = id;
    this.username = username;
    this.rawPassword = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}
