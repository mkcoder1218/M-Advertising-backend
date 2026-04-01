import { Sale } from '../models/sale.model';
import { SaleItem } from '../models/saleItem.model';

export const createSale = async (data: any) => Sale.create(data);
export const listSales = async () => Sale.findAll();
export const createSaleItem = async (data: any) => SaleItem.create(data);
export const listSaleItems = async (saleId: string) => SaleItem.findAll({ where: { saleId } });