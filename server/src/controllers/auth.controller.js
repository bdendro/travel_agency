import jwt from 'jsonwebtoken';
import ms from 'ms';
import userService from '../services/user.service.js';
import profileService from '../services/profile.service.js';

const getToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export const login = async (req, res, next) => {
  try {
    const user = await userService.verifyUser(req.bodyValidated);
    const profileWithUser = await profileService.getProfileWithUserDto(user);

    const token = getToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: ms(`${process.env.COOKIE_LIFETIME}`),
    });
    return res.status(200).json(profileWithUser);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  return res.sendStatus(204);
};
