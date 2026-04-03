import { Router, Request, Response } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as teamsController from '../controllers/teams.controller';
import { createTeamSchema, updateTeamSchema, createTeamMemberSchema } from '../validators/teams.validator';
import { authenticate } from '../../../middleware/auth.middleware';
import { WorkType } from '../models/workType.model';

const router = Router();

router.get('/work-types', authenticate, async (_req: Request, res: Response) => {
  const types = await WorkType.findAll({ order: [['name', 'ASC']] });
  res.json(types);
});

router.get('/', authenticate, teamsController.list);
router.get('/:id', authenticate, teamsController.getById);
router.post('/', authenticate, validate(createTeamSchema), teamsController.create);
router.put('/:id', authenticate, validate(updateTeamSchema), teamsController.update);
router.delete('/:id', authenticate, teamsController.remove);

router.get('/:teamId/members', authenticate, teamsController.listMembers);
router.post('/members', authenticate, validate(createTeamMemberSchema), teamsController.addMember);

export default router;
