import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as tenderController from '../controllers/tender.controller';
import { createTenderSchema, listTendersSchema, updateTenderSchema } from '../validators/tender.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, validate(listTendersSchema), tenderController.listTenders);
router.post('/', authenticate, validate(createTenderSchema), tenderController.createTender);
router.put('/:id', authenticate, validate(updateTenderSchema), tenderController.updateTender);

export default router;
