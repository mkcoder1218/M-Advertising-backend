import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface OrderItemAttributes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type OrderItemCreationAttributes = Optional<OrderItemAttributes, 'id'>;

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  declare id: string;
  declare orderId: string;
  declare productId: string;
  declare quantity: number;
  declare unitPrice: number;
}

export const initOrderItemModel = (sequelize: Sequelize) => {
  OrderItem.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      orderId: { type: DataTypes.UUID, allowNull: false, field: 'order_id' },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: 'unit_price' },
    },
    { sequelize, tableName: 'order_items' }
  );

  return OrderItem;
};

export const associateOrderItemModel = (models: any) => {
  OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
  OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};