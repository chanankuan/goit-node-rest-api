import express from 'express';
import controllers from '../controllers/authControllers.js';
import {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
} from '../schemas/index.js';
import { authenticate, validateBody, upload } from '../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  controllers.register
);
authRouter.get('/verify/:verificationToken', controllers.verifyEmail);
authRouter.post(
  '/verify',
  validateBody(emailSchema),
  controllers.resendVerifyEmail
);
authRouter.post('/login', validateBody(loginSchema), controllers.login);
authRouter.use(authenticate);
authRouter.get('/current', controllers.getCurrent);
authRouter.post('/logout', controllers.logout);
authRouter.patch(
  '/',
  validateBody(subscriptionSchema),
  controllers.updateSubscription
);
authRouter.patch(
  '/avatars',
  upload.single('avatarURL'),
  controllers.updateAvatar
);

export default authRouter;
