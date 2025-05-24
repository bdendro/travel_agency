export default class UserProfileDTO {
  constructor({ id, username, role }, profileId) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.profileId = profileId;
  }
}
