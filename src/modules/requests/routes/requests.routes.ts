import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate.middleware';
import * as controller from '../controllers/requests.controller';
import { createStockRequestSchema, listStockRequestsSchema, updateStockRequestSchema } from '../validators/requests.validator';

const router = Router();

router.get('/', authenticate, validate(listStockRequestsSchema), controller.listStockRequests);
router.post('/', authenticate, validate(createStockRequestSchema), controller.createStockRequest);
router.put('/:id', authenticate, validate(updateStockRequestSchema), controller.updateStockRequest);

export default router;
