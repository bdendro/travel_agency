import routePointService from '../services/routePoint.service.js';

export const deleteRoutePoint = async (req, res, next) => {
  const routePointId = req.paramsValidated.routePointId;
  try {
    await routePointService.deleteRoutePoint(req.user, routePointId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
