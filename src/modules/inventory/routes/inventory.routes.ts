import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as inventoryController from '../controllers/inventory.controller';
import { createProductSchema, updateProductSchema, getProductSchema, listProductsSchema, updateInventorySchema } from '../validators/inventory.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/products', authenticate, validate(listProductsSchema), inventoryController.listProducts);
router.get('/products/:id', authenticate, validate(getProductSchema), inventoryController.getProductById);
router.post('/products', authenticate, validate(createProductSchema), inventoryController.createProduct);
router.put('/products/:id', authenticate, validate(updateProductSchema), inventoryController.updateProduct);
router.delete('/products/:id', authenticate, validate(getProductSchema), inventoryController.removeProduct);
router.put('/inventory/:productId', authenticate, validate(updateInventorySchema), inventoryController.updateInventory);

export default router;