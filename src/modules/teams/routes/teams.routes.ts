import { Router, Request, Response } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import * as teamsController from '../controllers/teams.controller';
import { createTeamSchema, updateTeamSchema, createTeamMemberSchema, createWorkTypeSchema, updateWorkTypeSchema, getWorkTypeSchema } from '../validators/teams.validator';
import { authenticate } from '../../../middleware/auth.middleware';
import { WorkType } from '../models/workType.model';

const router = Router();

router.get('/work-types', authenticate, async (_req: Request, res: Response) => {
  const types = await WorkType.findAll({ order: [['name', 'ASC']] });
  res.json(types);
});
router.post('/work-types', authenticate, validate(createWorkTypeSchema), async (req: Request, res: Response) => {
  const type = await WorkType.create(req.body);
  res.status(201).json(type);
});
router.put('/work-types/:id', authenticate, validate(updateWorkTypeSchema), async (req: Request, res: Response) => {
  const type = await WorkType.findByPk(req.params.id);
  if (!type) return res.status(404).json({ message: 'Work type not found' });
  const updated = await type.update(req.body);
  res.json(updated);
});
router.delete('/work-types/:id', authenticate, validate(getWorkTypeSchema), async (req: Request, res: Response) => {
  const type = await WorkType.findByPk(req.params.id);
  if (!type) return res.status(404).json({ message: 'Work type not found' });
  await type.destroy();
  res.status(204).send();
});

router.get('/', authenticate, teamsController.list);
router.get('/:id', authenticate, teamsController.getById);
router.post('/', authenticate, validate(createTeamSchema), teamsController.create);
router.put('/:id', authenticate, validate(updateTeamSchema), teamsController.update);
router.delete('/:id', authenticate, teamsController.remove);

router.get('/:teamId/members', authenticate, teamsController.listMembers);
router.post('/members', authenticate, validate(createTeamMemberSchema), teamsController.addMember);

export default router;
