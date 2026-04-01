import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendance.service';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = req.query.date as string | undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const result = await attendanceService.listAttendance(date, page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await attendanceService.createAttendance(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await attendanceService.updateAttendance(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'Attendance not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
