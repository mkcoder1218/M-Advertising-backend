import { Request, Response, NextFunction } from 'express';
import * as requestsService from '../services/requests.service';

export const createStockRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const item = await requestsService.createStockRequest(req.body, userId);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const listStockRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await requestsService.listStockRequests(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const updateStockRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await requestsService.updateStockRequest(req.params.id, req.body.status);
    if (!item) return res.status(404).json({ message: 'Request not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
