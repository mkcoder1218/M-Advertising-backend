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

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const record = await attendanceService.getUserAttendance(userId, req.query.date as any);
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const mark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const record = await attendanceService.markSelfAttendance(userId, req.body.lat, req.body.lng);
    res.json(record);
  } catch (err: any) {
    if (err?.code === 'OUTSIDE_RADIUS') {
      return res.status(403).json({ message: 'Outside allowed location', distance: err.distance, radius: err.radius });
    }
    next(err);
  }
};
