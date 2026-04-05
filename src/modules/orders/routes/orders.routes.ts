import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as ordersController from '../controllers/orders.controller';
import { createOrderSchema, createOrderItemSchema, updateOrderSchema, addMessageSchema, listOrdersSchema, updateOrderItemsSchema } from '../validators/orders.validator';
import { authenticate } from '../../../middleware/auth.middleware';
import { uploadSingle } from '../../../middleware/upload.middleware';

const router = Router();

router.get('/', authenticate, validate(listOrdersSchema), ordersController.listOrders);
router.post('/', authenticate, validate(createOrderSchema), ordersController.createOrder);
router.put('/:id', authenticate, validate(updateOrderSchema), ordersController.updateOrder);
router.post('/:id/messages', authenticate, validate(addMessageSchema), ordersController.addMessage);
router.post('/:id/file', authenticate, uploadSingle, ordersController.uploadOrderFile);
router.post('/:id/design-file', authenticate, uploadSingle, ordersController.uploadDesignFile);
router.put('/:id/items', authenticate, validate(updateOrderItemsSchema), ordersController.updateOrderItems);

router.get('/:orderId/items', authenticate, ordersController.listOrderItems);
router.post('/items', authenticate, validate(createOrderItemSchema), ordersController.createOrderItem);

export default router;
