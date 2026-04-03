import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate.middleware';
import * as controller from '../controllers/attendance.controller';
import { createAttendanceSchema, listAttendanceSchema, updateAttendanceSchema, markAttendanceSchema } from '../validators/attendance.validator';

const router = Router();

router.get('/', authenticate, validate(listAttendanceSchema), controller.list);
router.get('/me', authenticate, controller.me);
router.post('/mark', authenticate, validate(markAttendanceSchema), controller.mark);
router.post('/', authenticate, validate(createAttendanceSchema), controller.create);
router.put('/:id', authenticate, validate(updateAttendanceSchema), controller.update);

export default router;
