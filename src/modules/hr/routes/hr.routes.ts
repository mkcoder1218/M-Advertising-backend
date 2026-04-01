import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as hrController from '../controllers/hr.controller';
import { createEmployeeSchema, listEmployeesSchema } from '../validators/hr.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, validate(listEmployeesSchema), hrController.listEmployees);
router.post('/', authenticate, validate(createEmployeeSchema), hrController.createEmployee);

export default router;
