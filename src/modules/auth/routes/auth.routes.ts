import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as authController from '../controllers/auth.controller';
import { loginSchema, refreshSchema, logoutSchema } from '../validators/auth.validator';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', validate(logoutSchema), authController.logout);

export default router;
