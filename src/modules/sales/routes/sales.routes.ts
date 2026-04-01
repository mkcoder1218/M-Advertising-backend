import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as salesController from '../controllers/sales.controller';
import { createSaleSchema, createSaleItemSchema } from '../validators/sales.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, salesController.listSales);
router.post('/', authenticate, validate(createSaleSchema), salesController.createSale);

router.get('/:saleId/items', authenticate, salesController.listSaleItems);
router.post('/items', authenticate, validate(createSaleItemSchema), salesController.createSaleItem);

export default router;