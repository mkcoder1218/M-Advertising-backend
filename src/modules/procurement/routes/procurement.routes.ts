import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as procurementController from '../controllers/procurement.controller';
import { createSupplierSchema, createPurchaseOrderSchema, createPurchaseOrderItemSchema } from '../validators/procurement.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/suppliers', authenticate, procurementController.listSuppliers);
router.post('/suppliers', authenticate, validate(createSupplierSchema), procurementController.createSupplier);

router.get('/purchase-orders', authenticate, procurementController.listPurchaseOrders);
router.post('/purchase-orders', authenticate, validate(createPurchaseOrderSchema), procurementController.createPurchaseOrder);

router.get('/purchase-orders/:purchaseOrderId/items', authenticate, procurementController.listPurchaseOrderItems);
router.post('/purchase-order-items', authenticate, validate(createPurchaseOrderItemSchema), procurementController.createPurchaseOrderItem);

export default router;