import TourBookingWithCancellationDTO from '../dto/tourBooking/TourBookingCancellation.dto.js';
import tourBookingService from '../services/tourBooking.service.js';

export const cancelTourBooking = async (req, res, next) => {
  const tourBookingId = req.paramsValidated.tourBookingId;
  const cancellationReq = req.bodyValidated;
  try {
    const { tourBooking, cancellation } = await tourBookingService.cancelTourBooking(
      req.user,
      tourBookingId,
      cancellationReq
    );
    return res.status(201).json(new TourBookingWithCancellationDTO(tourBooking, cancellation));
  } catch (err) {
    next(err);
  }
};
