import { Request, Response, NextFunction } from 'express';
import * as ordersService from '../services/orders.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.listOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrderItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await ordersService.createOrderItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const listOrderItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await ordersService.listOrderItems(req.params.orderId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};