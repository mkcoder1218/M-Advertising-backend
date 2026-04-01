import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';

export const createOrder = async (data: any) => Order.create(data);
export const listOrders = async () => Order.findAll();
export const createOrderItem = async (data: any) => OrderItem.create(data);
export const listOrderItems = async (orderId: string) => OrderItem.findAll({ where: { orderId } });