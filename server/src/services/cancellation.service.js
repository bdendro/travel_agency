import { DB_ERRORS } from '../constants/dbErrors.js';
import REFUND_STATUS from '../constants/enums/refundStatuses.js';
import TOUR_BOOKING_STATUSES from '../constants/enums/tourBookingStatuses.js';
import TourBooking from '../models/TourBooking.js';
import TourCancellation from '../models/TourCancellation.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';

class CancellationService {
  constructor() {
    this.TourCancellation = TourCancellation;
    this.TourBooking = TourBooking;
  }

  async create(tourOperatorId, bookingId, cancellation, refundAmount) {
    const tourBooking = await this.TourBooking.findOne({
      where: { tourOperatorId, id: bookingId },
    });
    if (!tourBooking) throw new NotFoundError('Tour booking not found');

    try {
      if (tourBooking.status === TOUR_BOOKING_STATUSES.PENDING) {
        return await this.TourCancellation.create({
          ...cancellation,
          refundStatus: REFUND_STATUS.PAID,
          bookingId,
        });
      }

      return await this.TourCancellation.create({
        ...cancellation,
        refundAmount,
        bookingId,
      });
    } catch (err) {
      if (err instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError('Tour booking already cancelled');
      throw err;
    }
  }
}

export default new CancellationService();
