import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import * as controller from '../controllers/notifications.controller';

const router = Router();

router.get('/', authenticate, controller.listMyNotifications);
router.put('/:id/read', authenticate, controller.markRead);

export default router;
