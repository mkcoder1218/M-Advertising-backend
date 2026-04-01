import { Request, Response, NextFunction } from 'express';
import * as teamsService from '../services/teams.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await teamsService.createTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await teamsService.getTeamById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await teamsService.listTeams();
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await teamsService.updateTeam(req.params.id, req.body);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await teamsService.deleteTeam(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await teamsService.addTeamMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

export const listMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await teamsService.listTeamMembers(req.params.teamId);
    res.json(members);
  } catch (err) {
    next(err);
  }
};