import { Request, Response, NextFunction } from 'express';
import * as tenderService from '../services/tender.service';

export const createTender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tender = await tenderService.createTender(req.body);
    res.status(201).json(tender);
  } catch (err) {
    next(err);
  }
};

export const listTenders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tenders = await tenderService.listTenders();
    res.json(tenders);
  } catch (err) {
    next(err);
  }
};