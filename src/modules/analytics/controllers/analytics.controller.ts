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
