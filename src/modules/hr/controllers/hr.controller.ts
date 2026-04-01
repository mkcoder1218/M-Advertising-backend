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
    const employees = await hrService.listEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};