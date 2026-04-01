import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as productionController from '../controllers/production.controller';
import { createJobSchema, updateJobSchema, createTaskSchema } from '../validators/production.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/jobs', authenticate, productionController.listJobs);
router.get('/jobs/:id', authenticate, productionController.getJobById);
router.post('/jobs', authenticate, validate(createJobSchema), productionController.createJob);
router.put('/jobs/:id', authenticate, validate(updateJobSchema), productionController.updateJob);
router.delete('/jobs/:id', authenticate, productionController.removeJob);

router.get('/jobs/:jobId/tasks', authenticate, productionController.listTasksByJob);
router.post('/tasks', authenticate, validate(createTaskSchema), productionController.createTask);

export default router;