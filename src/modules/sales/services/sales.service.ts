import { Sale } from '../models/sale.model';
import { SaleItem } from '../models/saleItem.model';
import { Inventory } from '../../inventory/models/inventory.model';

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
export const createSaleItem = async (data: any) => {
  const item = await SaleItem.create(data);
  const qty = Number(data.quantity || 0);
  if (qty > 0 && data.productId) {
    const inv = await Inventory.findOne({
      where: { productId: data.productId },
      order: [['created_at', 'ASC']],
    });
    if (inv) {
      const current = Number(inv.quantity || 0);
      await inv.update({ quantity: current - qty });
    } else {
      await Inventory.create({ productId: data.productId, quantity: 0 - qty, location: 'Sales' });
    }
  }
  return item;
};
export const listSaleItems = async (saleId: string) => SaleItem.findAll({ where: { saleId } });
