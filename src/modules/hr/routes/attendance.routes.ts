import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate.middleware';
import * as controller from '../controllers/attendance.controller';
import { createAttendanceSchema, listAttendanceSchema, updateAttendanceSchema } from '../validators/attendance.validator';

const router = Router();

router.get('/', authenticate, validate(listAttendanceSchema), controller.list);
router.post('/', authenticate, validate(createAttendanceSchema), controller.create);
router.put('/:id', authenticate, validate(updateAttendanceSchema), controller.update);

export default router;
