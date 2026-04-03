import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface OrderMessageAttributes {
  id: string;
  orderId: string;
  sender: string;
  role: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderMessageCreationAttributes = Optional<OrderMessageAttributes, 'id'>;

export class OrderMessage extends Model<OrderMessageAttributes, OrderMessageCreationAttributes> implements OrderMessageAttributes {
  declare id: string;
  declare orderId: string;
  declare sender: string;
  declare role: string;
  declare text: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export const initOrderMessageModel = (sequelize: Sequelize) => {
  OrderMessage.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      orderId: { type: DataTypes.UUID, allowNull: false, field: 'order_id' },
      sender: { type: DataTypes.STRING(255), allowNull: false },
      role: { type: DataTypes.STRING(50), allowNull: false },
      text: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize, tableName: 'order_messages' }
  );

  return OrderMessage;
};

export const associateOrderMessageModel = (models: any) => {
  OrderMessage.belongsTo(models.Order, { foreignKey: 'order_id' });
};
