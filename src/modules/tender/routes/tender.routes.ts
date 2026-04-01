import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as tenderController from '../controllers/tender.controller';
import { createTenderSchema } from '../validators/tender.validator';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, tenderController.listTenders);
router.post('/', authenticate, validate(createTenderSchema), tenderController.createTender);

export default router;