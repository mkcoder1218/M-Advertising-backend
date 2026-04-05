import { Request, Response, NextFunction } from 'express';
import * as analyticsService from '../services/analytics.service';

export const overview = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await analyticsService.getOverview();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const roleAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const data = await analyticsService.getRoleAnalytics(user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
