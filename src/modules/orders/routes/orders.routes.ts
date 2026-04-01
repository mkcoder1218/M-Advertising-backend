import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as ordersController from '../controllers/orders.controller';
import { createOrderSchema, createOrderItemSchema, updateOrderSchema, addMessageSchema, listOrdersSchema } from '../validators/orders.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, validate(listOrdersSchema), ordersController.listOrders);
router.post('/', authenticate, validate(createOrderSchema), ordersController.createOrder);
router.put('/:id', authenticate, validate(updateOrderSchema), ordersController.updateOrder);
router.post('/:id/messages', authenticate, validate(addMessageSchema), ordersController.addMessage);

router.get('/:orderId/items', authenticate, ordersController.listOrderItems);
router.post('/items', authenticate, validate(createOrderItemSchema), ordersController.createOrderItem);

export default router;
