import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from '../utils/HttpErrors.js';
import USER_ROLES from '../constants/enums/userRoles.js';

// Example: auth(['admin', 'employee'])
export const auth =
  (roles = Object.values(USER_ROLES)) =>
  (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) throw new UnauthorizedError('Missed token');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (err) {
      throw new UnauthorizedError('Invalid token');
    }
    if (!roles.includes(req.user.role)) throw new ForbiddenError('Access denied');
    next();
  };

export const unAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next();
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next();
  }
  throw new ForbiddenError('Forbidden: already authenticated user');
};
