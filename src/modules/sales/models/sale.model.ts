import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface SaleAttributes {
  id: string;
  saleNumber: string;
  orderId?: string | null;
  saleDate: Date;
  status: string;
}

export type SaleCreationAttributes = Optional<SaleAttributes, 'id' | 'orderId'>;

export class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
  declare id: string;
  declare saleNumber: string;
  declare orderId?: string | null;
  declare saleDate: Date;
  declare status: string;
}

export const initSaleModel = (sequelize: Sequelize) => {
  Sale.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      saleNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'sale_number' },
      orderId: { type: DataTypes.UUID, allowNull: true, field: 'order_id' },
      saleDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'sale_date' },
      status: { type: DataTypes.STRING(50), allowNull: false },
    },
    { sequelize, tableName: 'sales' }
  );

  return Sale;
};

export const associateSaleModel = (models: any) => {
  Sale.belongsTo(models.Order, { foreignKey: 'order_id' });
  Sale.hasMany(models.SaleItem, { foreignKey: 'sale_id' });
};