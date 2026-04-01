import { Request, Response, NextFunction } from 'express';
import * as hrService from '../services/hr.service';

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await hrService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

export const listEmployees = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const page = _req.query.page ? Number(_req.query.page) : 1;
    const limit = _req.query.limit ? Number(_req.query.limit) : 20;
    const result = await hrService.listEmployees(_req.query);
    res.json({ items: result.items, total: result.total, page, limit });
  } catch (err) {
    next(err);
  }
};
