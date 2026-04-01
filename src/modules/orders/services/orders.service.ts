import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import { OrderMessage } from '../models/orderMessage.model';
import { WorkType } from '../../teams/models/workType.model';
import { Product } from '../../inventory/models/product.model';
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
  return order.update(data);
};

export const addMessage = async (orderId: string, data: any) => {
  return OrderMessage.create({ ...data, orderId });
};
