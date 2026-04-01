import { Product } from '../models/product.model';
import { Inventory } from '../models/inventory.model';

export const createProduct = async (data: any) => Product.create(data);
export const getProductById = async (id: string) => Product.findByPk(id);
export const listProducts = async (filters: any) => {
  const where: any = {};
  if (filters.type) where.type = filters.type;
  return Product.findAll({ where });
};
export const updateProduct = async (id: string, data: any) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return product.update(data);
};
export const deleteProduct = async (id: string) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
};

export const upsertInventory = async (productId: string, data: any) => {
  const where: any = { productId };
  if (data.location) where.location = data.location;
  const existing = await Inventory.findOne({ where });
  if (existing) return existing.update(data);
  return Inventory.create({ ...data, productId });
};