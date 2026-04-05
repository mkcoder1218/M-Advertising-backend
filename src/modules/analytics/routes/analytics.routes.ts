import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/overview', authenticate, analyticsController.overview);
router.get('/role', authenticate, analyticsController.roleAnalytics);

export default router;
