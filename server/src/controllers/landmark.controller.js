import landmarkService from '../services/landmark.service.js';

export const deleteLandmark = async (req, res, next) => {
  const landmarkId = req.paramsValidated.landmarkId;
  try {
    await landmarkService.delete(landmarkId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
