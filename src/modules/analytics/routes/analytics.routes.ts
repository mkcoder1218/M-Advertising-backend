import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/overview', authenticate, analyticsController.overview);

export default router;
