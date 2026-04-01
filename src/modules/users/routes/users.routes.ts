import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as userController from '../controllers/users.controller';
import { createUserSchema, updateUserSchema, getUserSchema, listUsersSchema } from '../validators/users.validator';
import { authenticate } from '../../../middleware/auth.middleware';
import { uploadSingle } from '../../../middleware/upload.middleware';

const router = Router();

router.get('/', authenticate, validate(listUsersSchema), userController.list);
router.get('/:id', authenticate, validate(getUserSchema), userController.getById);
router.post('/', validate(createUserSchema), userController.create);
router.put('/:id', authenticate, validate(updateUserSchema), userController.update);
router.delete('/:id', authenticate, validate(getUserSchema), userController.remove);
router.post('/:id/profile-image', authenticate, uploadSingle, userController.uploadProfileImage);

export default router;
