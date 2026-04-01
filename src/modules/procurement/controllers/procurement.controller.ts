import { Request, Response, NextFunction } from 'express';
import * as procurementService from '../services/procurement.service';

export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await procurementService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
};

export const listSuppliers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const suppliers = await procurementService.listSuppliers();
    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};

export const createPurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const po = await procurementService.createPurchaseOrder(req.body);
    res.status(201).json(po);
  } catch (err) {
    next(err);
  }
};

export const listPurchaseOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await procurementService.listPurchaseOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const createPurchaseOrderItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await procurementService.createPurchaseOrderItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const listPurchaseOrderItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await procurementService.listPurchaseOrderItems(req.params.purchaseOrderId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};