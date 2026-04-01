import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface PurchaseOrderAttributes {
  id: string;
  poNumber: string;
  supplierId: string;
  status: string;
  orderDate: Date;
  expectedDate?: Date | null;
}

export type PurchaseOrderCreationAttributes = Optional<PurchaseOrderAttributes, 'id' | 'expectedDate'>;

export class PurchaseOrder extends Model<PurchaseOrderAttributes, PurchaseOrderCreationAttributes> implements PurchaseOrderAttributes {
  declare id: string;
  declare poNumber: string;
  declare supplierId: string;
  declare status: string;
  declare orderDate: Date;
  declare expectedDate?: Date | null;
}

export const initPurchaseOrderModel = (sequelize: Sequelize) => {
  PurchaseOrder.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      poNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'po_number' },
      supplierId: { type: DataTypes.UUID, allowNull: false, field: 'supplier_id' },
      status: { type: DataTypes.STRING(50), allowNull: false },
      orderDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'order_date' },
      expectedDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'expected_date' },
    },
    { sequelize, tableName: 'purchase_orders' }
  );

  return PurchaseOrder;
};

export const associatePurchaseOrderModel = (models: any) => {
  PurchaseOrder.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
  PurchaseOrder.hasMany(models.PurchaseOrderItem, { foreignKey: 'purchase_order_id' });
};