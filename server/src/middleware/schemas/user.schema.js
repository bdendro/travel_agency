import Joi from 'joi';
import USER_ROLES from '../../constants/enums/userRoles.js';

export const createUserSchema = Joi.object({
  username: Joi.string().pattern(/^\S+$/).min(3).max(30).required().messages({
    'string.pattern.base': '{#label} must not contain spaces',
  }),
  password: Joi.string().pattern(/^\S+$/).min(3).max(50).required().messages({
    'string.pattern.base': '{#label} must not contain spaces',
  }),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().pattern(/^\S+$/).min(3).max(30).required().messages({
    'string.pattern.base': '{#label} must not contain spaces',
  }),
  password: Joi.string().pattern(/^\S+$/).min(3).max(50).required().messages({
    'string.pattern.base': '{#label} must not contain spaces',
  }),
});
