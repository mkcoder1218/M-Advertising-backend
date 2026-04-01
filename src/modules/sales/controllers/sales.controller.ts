import { Request, Response, NextFunction } from 'express';
import * as salesService from '../services/sales.service';

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await salesService.createSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    next(err);
  }
};

export const listSales = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await salesService.listSales();
    res.json(sales);
  } catch (err) {
    next(err);
  }
};

export const createSaleItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await salesService.createSaleItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const listSaleItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await salesService.listSaleItems(req.params.saleId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};