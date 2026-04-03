import { StockRequest } from '../models/stockRequest.model';
import { Inventory } from '../../inventory/models/inventory.model';
import { Product } from '../../inventory/models/product.model';
import { Notification } from '../../notifications/models/notification.model';
import { User } from '../../users/models/user.model';
import { Role } from '../../roles/models/role.model';
import { Op } from 'sequelize';

export const createStockRequest = async (data: any, userId: string) => {
  const stock = await Inventory.sum('quantity', { where: { productId: data.productId } });
  const quantity = Number(data.quantity || 0);
  const targetRole = stock >= quantity ? 'STORE_MANAGER' : 'BUYER';

  const request = await StockRequest.create({
    productId: data.productId,
    quantity,
    targetRole,
    requestedBy: userId,
    status: 'PENDING',
    notes: data.notes || null,
  });

  const users = await User.findAll({
    include: [{ model: Role, where: { name: targetRole } }],
  });
  const product = await Product.findByPk(data.productId);
  for (const u of users) {
    await Notification.create({
      userId: u.id,
      title: 'Stock Request',
      message: `${product?.name || 'Product'} request for ${quantity} units`,
    });
  }

  return request;
};

export const listStockRequests = async (filters: any) => {
  const where: any = {};
  if (filters.status) where.status = filters.status;
  if (filters.targetRole) where.targetRole = filters.targetRole;
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const { count, rows } = await StockRequest.findAndCountAll({
    where,
    include: [Product],
    order: [['created_at', 'DESC']],
    limit,
    offset,
  });
  return { total: count, items: rows, page, limit };
};

export const updateStockRequest = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED') => {
  const req = await StockRequest.findByPk(id);
  if (!req) return null;
  const updated = await req.update({ status });

  if (status === 'APPROVED' && req.targetRole === 'STORE_MANAGER') {
    const qty = Number(req.quantity || 0);
    if (qty > 0) {
      let remaining = qty;
      const rows = await Inventory.findAll({
        where: { productId: req.productId },
        order: [['created_at', 'ASC']],
      });
      for (const row of rows as any[]) {
        if (remaining <= 0) break;
        const current = Number(row.quantity || 0);
        if (current <= 0) continue;
        const take = Math.min(current, remaining);
        await row.update({ quantity: current - take });
        remaining -= take;
      }
      if (remaining > 0) {
        await Inventory.create({ productId: req.productId, quantity: 0 - remaining, location: 'Store' });
      }
      await updated.update({ status: 'FULFILLED' });
    }
  }

  return updated;
};
