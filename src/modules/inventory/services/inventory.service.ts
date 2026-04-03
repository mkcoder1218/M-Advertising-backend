import { Product } from '../models/product.model';
import { Inventory } from '../models/inventory.model';
import { Upload } from '../../uploads/models/upload.model';
import { getPagination } from '../../../utils/pagination.util';
import { Op, fn, col } from 'sequelize';

const generateSku = () => {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SKU-${Date.now()}-${rand}`;
};

export const createProduct = async (data: any) => {
  const payload = { ...data };
  if (!payload.sku) payload.sku = generateSku();
  return Product.create(payload);
};
export const getProductById = async (id: string) => Product.findByPk(id);
export const listProducts = async (filters: any) => {
  const where: any = {};
  if (filters.type) where.type = filters.type;
  if (filters.search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${filters.search}%` } },
      { sku: { [Op.iLike]: `%${filters.search}%` } },
    ];
  }
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const { offset } = getPagination(page, limit);
  const result = await Product.findAndCountAll({
    where,
    include: [Upload],
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });
  const ids = result.rows.map((r: any) => r.id);
  if (ids.length > 0) {
    const stockRows = await Inventory.findAll({
      attributes: ['productId', [fn('SUM', col('quantity')), 'qty']],
      where: { productId: ids },
      group: ['product_id'],
    });
    const stockMap = new Map<string, number>();
    for (const row of stockRows as any[]) {
      const pid = row.get('productId') || row.get('product_id') || row.productId;
      if (!pid) continue;
      stockMap.set(String(pid), Number(row.get('qty') || 0));
    }
    for (const row of result.rows as any[]) {
      row.setDataValue('stock', Number(stockMap.get(row.id) || 0));
      if (row.sellingPrice != null) {
        row.setDataValue('sellingPrice', Number(row.sellingPrice));
      }
    }
  } else {
    for (const row of result.rows as any[]) {
      row.setDataValue('stock', 0);
      if (row.sellingPrice != null) {
        row.setDataValue('sellingPrice', Number(row.sellingPrice));
      }
    }
  }
  return result;
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

export const setProductImage = async (id: string, uploadId: string) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return product.update({ imageId: uploadId });
};
