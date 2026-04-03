import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface StockRequestAttributes {
  id: string;
  productId: string;
  quantity: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED';
  targetRole: 'STORE_MANAGER' | 'BUYER';
  requestedBy: string;
  notes?: string | null;
}

export type StockRequestCreationAttributes = Optional<StockRequestAttributes, 'id' | 'notes'>;

export class StockRequest extends Model<StockRequestAttributes, StockRequestCreationAttributes> implements StockRequestAttributes {
  declare id: string;
  declare productId: string;
  declare quantity: number;
  declare status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED';
  declare targetRole: 'STORE_MANAGER' | 'BUYER';
  declare requestedBy: string;
  declare notes?: string | null;
}

export const initStockRequestModel = (sequelize: Sequelize) => {
  StockRequest.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'PENDING' },
      targetRole: { type: DataTypes.STRING(30), allowNull: false, field: 'target_role' },
      requestedBy: { type: DataTypes.UUID, allowNull: false, field: 'requested_by' },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'stock_requests' }
  );
  return StockRequest;
};

export const associateStockRequestModel = (models: any) => {
  StockRequest.belongsTo(models.Product, { foreignKey: 'product_id' });
  StockRequest.belongsTo(models.User, { foreignKey: 'requested_by' });
};
