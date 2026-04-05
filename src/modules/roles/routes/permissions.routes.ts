import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as permissionController from '../controllers/permissions.controller';
import { createPermissionSchema, updatePermissionSchema, getPermissionSchema, listPermissionsSchema } from '../validators/permissions.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, validate(listPermissionsSchema), permissionController.list);
router.get('/:id', authenticate, validate(getPermissionSchema), permissionController.getById);
router.post('/', authenticate, validate(createPermissionSchema), permissionController.create);
router.put('/:id', authenticate, validate(updatePermissionSchema), permissionController.update);
router.delete('/:id', authenticate, validate(getPermissionSchema), permissionController.remove);

export default router;
