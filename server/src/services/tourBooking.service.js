import Decimal from 'decimal.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import TOUR_STATUSES from '../constants/enums/tourStatuses.js';
import Tour from '../models/Tour.js';
import TourBooking from '../models/TourBooking.js';
import TourOperator from '../models/TourOperator.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';
import PRICE_MULTIPLIERS from '../constants/priceMultipliers.js';
import cancellationService from './cancellation.service.js';

class TourBookingService {
  constructor() {
    this.Tour = Tour;
    this.TourBooking = TourBooking;
    this.TourOperator = TourOperator;
    this.cancellationService = cancellationService;
  }

  _getCancellationPriceByTourStatus(price, status) {
    switch (status) {
      case TOUR_STATUSES.SCHEDULED:
        return new Decimal(price).times(PRICE_MULTIPLIERS.CANCELLATIONS.SCHEDULED);
      case TOUR_STATUSES.LOCKED:
        return new Decimal(price).times(PRICE_MULTIPLIERS.CANCELLATIONS.LOCKED);
      case TOUR_STATUSES.ACTIVE:
        return new Decimal(price).times(PRICE_MULTIPLIERS.CANCELLATIONS.ACTIVE);
    }
  }

  async createTourBooking(tourId, tourOperatorId, tourBooking) {
    const tour = await this.Tour.findByPk(tourId);
    if (!tour) throw new NotFoundError('Tour not found');
    if (TOUR_STATUSES.SCHEDULED !== tour.status)
      throw new ConflictError(`Only tours with status '${TOUR_STATUSES.SCHEDULED}' can be booked`);

    const price = new Decimal(tour.pricePerPerson).times(tourBooking.touristCount);

    try {
      return await this.TourBooking.create({ ...tourBooking, tourOperatorId, tourId, price });
    } catch (err) {
      if (err instanceof DB_ERRORS.FOREIGN_KEY_CONSTRAINT) {
        throw new ConflictError('Referenced tour does not exist');
      }
    }
  }

  async cancelTourBooking(user, tourBookingId, cancellation) {
    const tourBooking = await this.TourBooking.findOne({
      include: [
        { model: this.Tour, as: 'tour', required: true },
        {
          model: this.TourOperator,
          as: 'tourOperator',
          where: { userId: user?.userId },
          required: true,
        },
      ],
      where: { id: tourBookingId },
    });

    if (!tourBooking) throw new NotFoundError('Tour booking not found');
    const statuses = [TOUR_STATUSES.SCHEDULED, TOUR_STATUSES.LOCKED, TOUR_STATUSES.ACTIVE];
    if (!statuses.includes(tourBooking.tour.status))
      throw new ConflictError(
        `Only booking of tours with '${statuses.join("', '")}' statuses can be cancelled`
      );

    const refundAmount = this._getCancellationPriceByTourStatus(
      tourBooking.price,
      tourBooking.tour.status
    );

    const newCancellation = await this.cancellationService.create(
      tourBooking.tourOperatorId,
      tourBookingId,
      cancellation,
      refundAmount
    );

    const newTourBooking = await this.TourBooking.findByPk(tourBookingId);
    return { tourBooking: newTourBooking, cancellation: newCancellation };
  }
}

export default new TourBookingService();
