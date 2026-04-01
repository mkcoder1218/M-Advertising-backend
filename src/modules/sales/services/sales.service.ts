import { Sale } from '../models/sale.model';
import { SaleItem } from '../models/saleItem.model';

const generateSaleNumber = () => {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SAL-${Date.now()}-${rand}`;
};

export const createSale = async (data: any) => {
  const payload = { ...data };
  if (!payload.saleNumber) payload.saleNumber = generateSaleNumber();
  return Sale.create(payload);
};
export const listSales = async () => Sale.findAll();
export const createSaleItem = async (data: any) => SaleItem.create(data);
export const listSaleItems = async (saleId: string) => SaleItem.findAll({ where: { saleId } });
