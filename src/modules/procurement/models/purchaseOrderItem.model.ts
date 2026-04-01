import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface PurchaseOrderItemAttributes {
  id: string;
  purchaseOrderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type PurchaseOrderItemCreationAttributes = Optional<PurchaseOrderItemAttributes, 'id'>;

export class PurchaseOrderItem extends Model<PurchaseOrderItemAttributes, PurchaseOrderItemCreationAttributes> implements PurchaseOrderItemAttributes {
  declare id: string;
  declare purchaseOrderId: string;
  declare productId: string;
  declare quantity: number;
  declare unitPrice: number;
}

export const initPurchaseOrderItemModel = (sequelize: Sequelize) => {
  PurchaseOrderItem.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      purchaseOrderId: { type: DataTypes.UUID, allowNull: false, field: 'purchase_order_id' },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: 'unit_price' },
    },
    { sequelize, tableName: 'purchase_order_items' }
  );

  return PurchaseOrderItem;
};

export const associatePurchaseOrderItemModel = (models: any) => {
  PurchaseOrderItem.belongsTo(models.PurchaseOrder, { foreignKey: 'purchase_order_id' });
  PurchaseOrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};