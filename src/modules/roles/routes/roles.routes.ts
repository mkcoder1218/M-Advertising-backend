import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as roleController from '../controllers/roles.controller';
import { createRoleSchema, updateRoleSchema, getRoleSchema, listRolesSchema } from '../validators/roles.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, validate(listRolesSchema), roleController.list);
router.get('/:id', authenticate, validate(getRoleSchema), roleController.getById);
router.post('/', authenticate, validate(createRoleSchema), roleController.create);
router.put('/:id', authenticate, validate(updateRoleSchema), roleController.update);
router.delete('/:id', authenticate, validate(getRoleSchema), roleController.remove);

export default router;