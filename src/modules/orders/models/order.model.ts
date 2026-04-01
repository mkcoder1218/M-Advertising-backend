import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface OrderAttributes {
  id: string;
  orderNumber: string;
  customerName: string;
  customerContact?: string | null;
  status: string;
  orderDate: Date;
  approvalStatus: string;
  assignedWorker?: string | null;
  total?: number | null;
  itemsCount?: number | null;
  createdBy?: string | null;
}

export type OrderCreationAttributes = Optional<OrderAttributes, 'id' | 'customerContact' | 'assignedWorker' | 'total' | 'itemsCount' | 'createdBy'>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: string;
  declare orderNumber: string;
  declare customerName: string;
  declare customerContact?: string | null;
  declare status: string;
  declare orderDate: Date;
  declare approvalStatus: string;
  declare assignedWorker?: string | null;
  declare total?: number | null;
  declare itemsCount?: number | null;
  declare createdBy?: string | null;
}

export const initOrderModel = (sequelize: Sequelize) => {
  Order.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      orderNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'order_number' },
      customerName: { type: DataTypes.STRING(255), allowNull: false, field: 'customer_name' },
      customerContact: { type: DataTypes.STRING(255), allowNull: true, field: 'customer_contact' },
      status: { type: DataTypes.STRING(50), allowNull: false },
      orderDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'order_date' },
      approvalStatus: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'AWAITING_RECEPTION', field: 'approval_status' },
      assignedWorker: { type: DataTypes.STRING(255), allowNull: true, field: 'assigned_worker' },
      total: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
      itemsCount: { type: DataTypes.INTEGER, allowNull: true, field: 'items_count' },
      createdBy: { type: DataTypes.UUID, allowNull: true, field: 'created_by' },
    },
    { sequelize, tableName: 'orders' }
  );

  return Order;
};

export const associateOrderModel = (models: any) => {
  Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  Order.hasMany(models.Sale, { foreignKey: 'order_id' });
  Order.hasMany(models.OrderMessage, { foreignKey: 'order_id' });
  Order.belongsTo(models.User, { foreignKey: 'created_by' });
};
