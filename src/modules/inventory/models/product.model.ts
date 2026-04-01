import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductAttributes {
  id: string;
  sku: string;
  name: string;
  type: 'raw' | 'finished';
  unit: string;
  description?: string | null;
  isActive: boolean;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'description' | 'isActive'>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: string;
  declare sku: string;
  declare name: string;
  declare type: 'raw' | 'finished';
  declare unit: string;
  declare description?: string | null;
  declare isActive: boolean;
}

export const initProductModel = (sequelize: Sequelize) => {
  Product.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      sku: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false },
      unit: { type: DataTypes.STRING(50), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    { sequelize, tableName: 'products' }
  );

  return Product;
};

export const associateProductModel = (models: any) => {
  Product.hasMany(models.Inventory, { foreignKey: 'product_id' });
  Product.hasMany(models.ProductionTask, { foreignKey: 'product_id' });
  Product.hasMany(models.PurchaseOrderItem, { foreignKey: 'product_id' });
  Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
  Product.hasMany(models.SaleItem, { foreignKey: 'product_id' });
};