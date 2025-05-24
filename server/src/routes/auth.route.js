import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import validateSchema from '../middleware/validateSchema.js';
import { loginSchema } from '../middleware/schemas/user.schema.js';
import { auth, unAuth } from '../middleware/auth.js';

const authRouter = Router();

authRouter.post('/login', unAuth, validateSchema(loginSchema), login);

authRouter.post('/logout', auth(), logout);

export default authRouter;
