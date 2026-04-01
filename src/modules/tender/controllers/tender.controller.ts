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

export const listTenders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenders = await tenderService.listTenders(req.query);
    res.json(tenders);
  } catch (err) {
    next(err);
  }
};

export const updateTender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tender = await tenderService.updateTender(req.params.id, req.body);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    next(err);
  }
};
