import { Request, Response, NextFunction } from 'express';
import * as permissionService from '../services/permissions.service';

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const perms = await permissionService.listPermissions();
    res.json(perms);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perm = await permissionService.getPermissionById(req.params.id);
    if (!perm) return res.status(404).json({ message: 'Permission not found' });
    res.json(perm);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perm = await permissionService.createPermission(req.body);
    res.status(201).json(perm);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perm = await permissionService.updatePermission(req.params.id, req.body);
    if (!perm) return res.status(404).json({ message: 'Permission not found' });
    res.json(perm);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perm = await permissionService.deletePermission(req.params.id);
    if (!perm) return res.status(404).json({ message: 'Permission not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
