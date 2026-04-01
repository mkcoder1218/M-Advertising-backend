import { Supplier } from '../models/supplier.model';
import { PurchaseOrder } from '../models/purchaseOrder.model';
import { PurchaseOrderItem } from '../models/purchaseOrderItem.model';

export const createSupplier = async (data: any) => Supplier.create(data);
export const listSuppliers = async () => Supplier.findAll();

export const createPurchaseOrder = async (data: any) => PurchaseOrder.create(data);
export const listPurchaseOrders = async () => PurchaseOrder.findAll();

export const createPurchaseOrderItem = async (data: any) => PurchaseOrderItem.create(data);
export const listPurchaseOrderItems = async (purchaseOrderId: string) => PurchaseOrderItem.findAll({ where: { purchaseOrderId } });