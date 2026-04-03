import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import { OrderMessage } from '../models/orderMessage.model';
import { WorkType } from '../../teams/models/workType.model';
import { Product } from '../../inventory/models/product.model';
import { Inventory } from '../../inventory/models/inventory.model';
import { getPagination } from '../../../utils/pagination.util';
import { Op } from 'sequelize';

const generateOrderNumber = () => {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${Date.now()}-${rand}`;
};

export const createOrder = async (data: any) => {
  const payload = { ...data };
  if (!payload.orderNumber) payload.orderNumber = generateOrderNumber();
  const { items, ...orderData } = payload;
  const order = await Order.create(orderData);
  if (items && items.length) {
    for (const item of items) {
      await OrderItem.create({ ...item, orderId: order.id });
    }
  }
  return order;
};
export const listOrders = async (filters: any) => {
  const where: any = {};
  if (filters.search) {
    where[Op.or] = [
      { orderNumber: { [Op.iLike]: `%${filters.search}%` } },
      { customerName: { [Op.iLike]: `%${filters.search}%` } },
    ];
  }
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const { offset } = getPagination(page, limit);
  return Order.findAndCountAll({
    where,
    include: [
      OrderMessage,
      { model: OrderItem, include: [WorkType, Product] },
    ],
    order: [['created_at', 'DESC']],
    limit,
    offset,
  });
};
export const createOrderItem = async (data: any) => OrderItem.create(data);
export const listOrderItems = async (orderId: string) => OrderItem.findAll({ where: { orderId } });

export const updateOrder = async (id: string, data: any) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  const prevStatus = order.approvalStatus;
  const nextStatus = data.approvalStatus || prevStatus;
  const updated = await order.update(data);

  if (prevStatus !== 'WORK_IN_PROGRESS' && prevStatus !== 'WORK_COMPLETED' && nextStatus === 'WORK_IN_PROGRESS') {
    const items = await OrderItem.findAll({ where: { orderId: order.id } });
    for (const it of items as any[]) {
      const qty = Number(it.quantity || 0);
      if (qty <= 0) continue;
      const inv = await Inventory.findOne({
        where: { productId: it.productId },
        order: [['created_at', 'ASC']],
      });
      if (inv) {
        const current = Number(inv.quantity || 0);
        await inv.update({ quantity: current - qty });
      } else {
        await Inventory.create({ productId: it.productId, quantity: 0 - qty, location: 'Production' });
      }
    }
  }

  return updated;
};

export const addMessage = async (orderId: string, data: any) => {
  return OrderMessage.create({ ...data, orderId });
};
