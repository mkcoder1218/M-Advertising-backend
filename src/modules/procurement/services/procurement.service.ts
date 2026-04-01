import { Supplier } from '../models/supplier.model';
import { PurchaseOrder } from '../models/purchaseOrder.model';
import { PurchaseOrderItem } from '../models/purchaseOrderItem.model';
import { Op } from 'sequelize';

export const createSupplier = async (data: any) => Supplier.create(data);
export const listSuppliers = async (filters: any) => {
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const search = filters.search ? String(filters.search) : '';
  const where: any = {};
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } },
    ];
  }
  const { count, rows } = await Supplier.findAndCountAll({
    where,
    order: [['created_at', 'DESC']],
    limit,
    offset,
  });
  return { total: count, items: rows, page, limit };
};

const generatePoNumber = () => `PO-${Date.now().toString().slice(-6)}`;

export const createPurchaseOrder = async (data: any) =>
  PurchaseOrder.create({
    ...data,
    poNumber: data.poNumber || generatePoNumber(),
    status: data.status || 'PENDING',
    orderDate: data.orderDate || new Date().toISOString().slice(0, 10),
  });

export const listPurchaseOrders = async (filters: any) => {
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const search = filters.search ? String(filters.search) : '';
  const where: any = {};
  if (filters.status) where.status = filters.status;
  if (filters.supplierId) where.supplierId = filters.supplierId;
  if (search) {
    where[Op.or] = [
      { poNumber: { [Op.iLike]: `%${search}%` } },
    ];
  }
  const { count, rows } = await PurchaseOrder.findAndCountAll({
    where,
    include: [Supplier],
    order: [['orderDate', 'DESC']],
    limit,
    offset,
  });
  return { total: count, items: rows, page, limit };
};

export const createPurchaseOrderItem = async (data: any) => PurchaseOrderItem.create(data);
export const listPurchaseOrderItems = async (purchaseOrderId: string) => PurchaseOrderItem.findAll({ where: { purchaseOrderId } });
