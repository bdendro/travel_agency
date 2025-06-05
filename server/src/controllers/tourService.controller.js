import tourServiceService from '../services/tourService.service.js';

export const deleteTourService = async (req, res, next) => {
  const tourServiceId = req.paramsValidated.tourServiceId;
  try {
    await tourServiceService.deleteTourService(req.user, tourServiceId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
