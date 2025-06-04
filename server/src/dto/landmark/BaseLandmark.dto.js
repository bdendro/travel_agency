export default class BaseLandmarkDTO {
  constructor({ id, name, description, geographicLocation }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.geographicLocation = geographicLocation;
  }
}
