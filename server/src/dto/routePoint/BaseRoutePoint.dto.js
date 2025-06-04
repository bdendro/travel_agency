export default class BaseRoutePointDTO {
  constructor({ id, sequenceOrder, durationInSeconds }) {
    this.id = id;
    this.sequenceOrder = sequenceOrder;
    this.durationInSeconds = durationInSeconds;
  }
}
