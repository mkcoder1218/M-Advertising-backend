import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface SaleItemAttributes {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type SaleItemCreationAttributes = Optional<SaleItemAttributes, 'id'>;

export class SaleItem extends Model<SaleItemAttributes, SaleItemCreationAttributes> implements SaleItemAttributes {
  declare id: string;
  declare saleId: string;
  declare productId: string;
  declare quantity: number;
  declare unitPrice: number;
}

export const initSaleItemModel = (sequelize: Sequelize) => {
  SaleItem.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      saleId: { type: DataTypes.UUID, allowNull: false, field: 'sale_id' },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: 'unit_price' },
    },
    { sequelize, tableName: 'sale_items' }
  );

  return SaleItem;
};

export const associateSaleItemModel = (models: any) => {
  SaleItem.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  SaleItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};