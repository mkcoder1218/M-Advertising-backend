import { Request, Response, NextFunction } from 'express';
import * as ordersService from '../services/orders.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdBy = (req as any).user?.id;
    const order = await ordersService.createOrder({ ...req.body, createdBy });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const page = _req.query.page ? Number(_req.query.page) : 1;
    const limit = _req.query.limit ? Number(_req.query.limit) : 20;
    const result = await ordersService.listOrders(_req.query);
    res.json({ items: result.rows, total: result.count, page, limit });
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

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.updateOrder(req.params.id, req.body);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Create notification when work completed (API path)
    if (req.body.approvalStatus === 'WORK_COMPLETED' && (order as any).createdBy) {
      const { Notification } = (req.app as any).locals.models || {};
      if (Notification) {
        await Notification.create({
          userId: (order as any).createdBy,
          title: 'Order Completed',
          message: `Order ${order.orderNumber || order.id} has been completed by production.`,
          data: { orderId: order.id },
        });
      }
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await ordersService.addMessage(req.params.id, req.body);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};
