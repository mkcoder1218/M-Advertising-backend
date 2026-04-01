import { Request, Response, NextFunction } from 'express';
import * as roleService from '../services/roles.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await roleService.listRoles();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await roleService.deleteRole(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};