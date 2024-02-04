import express from 'express';
import controllers from '../controllers/authControllers.js';
import { validateBody } from '../helpers/index.js';
import { registerSchema, loginSchema } from '../schemas/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  controllers.register
);
authRouter.post('/login', validateBody(loginSchema), controllers.login);
authRouter.post('/logout');

export default authRouter;
