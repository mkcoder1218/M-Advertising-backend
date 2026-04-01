import { Request, Response, NextFunction } from 'express';
import { Notification } from '../models/notification.model';

export const listMyNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const items = await Notification.findAll({
      where: { userId },
      order: [['created_at', 'DESC']],
      limit: 50,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const n = await Notification.findByPk(req.params.id);
    if (!n || n.userId !== userId) return res.status(404).json({ message: 'Notification not found' });
    await n.update({ readAt: new Date() });
    res.json(n);
  } catch (err) {
    next(err);
  }
};
