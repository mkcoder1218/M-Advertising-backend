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
  assignedWorkerId?: string | null;
  assignedDesignerId?: string | null;
  acceptedById?: string | null;
  needsDesign?: boolean | null;
  fileAvailable?: boolean | null;
  orderFileUrl?: string | null;
  designFileUrl?: string | null;
  sentToDesignerAt?: Date | null;
  sentToWorkerAt?: Date | null;
  workerAcceptedAt?: Date | null;
  workStartedAt?: Date | null;
  workCompletedAt?: Date | null;
  total?: number | null;
  itemsCount?: number | null;
  createdBy?: string | null;
}

export type OrderCreationAttributes = Optional<
  OrderAttributes,
  | 'id'
  | 'customerContact'
  | 'assignedWorker'
  | 'assignedWorkerId'
  | 'assignedDesignerId'
  | 'acceptedById'
  | 'needsDesign'
  | 'fileAvailable'
  | 'orderFileUrl'
  | 'designFileUrl'
  | 'sentToDesignerAt'
  | 'sentToWorkerAt'
  | 'workerAcceptedAt'
  | 'workStartedAt'
  | 'workCompletedAt'
  | 'total'
  | 'itemsCount'
  | 'createdBy'
>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: string;
  declare orderNumber: string;
  declare customerName: string;
  declare customerContact?: string | null;
  declare status: string;
  declare orderDate: Date;
  declare approvalStatus: string;
  declare assignedWorker?: string | null;
  declare assignedWorkerId?: string | null;
  declare assignedDesignerId?: string | null;
  declare acceptedById?: string | null;
  declare needsDesign?: boolean | null;
  declare fileAvailable?: boolean | null;
  declare orderFileUrl?: string | null;
  declare designFileUrl?: string | null;
  declare sentToDesignerAt?: Date | null;
  declare sentToWorkerAt?: Date | null;
  declare workerAcceptedAt?: Date | null;
  declare workStartedAt?: Date | null;
  declare workCompletedAt?: Date | null;
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
      assignedWorkerId: { type: DataTypes.UUID, allowNull: true, field: 'assigned_worker_id' },
      assignedDesignerId: { type: DataTypes.UUID, allowNull: true, field: 'assigned_designer_id' },
      acceptedById: { type: DataTypes.UUID, allowNull: true, field: 'accepted_by_id' },
      needsDesign: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false, field: 'needs_design' },
      fileAvailable: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false, field: 'file_available' },
      orderFileUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'order_file_url' },
      designFileUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'design_file_url' },
      sentToDesignerAt: { type: DataTypes.DATE, allowNull: true, field: 'sent_to_designer_at' },
      sentToWorkerAt: { type: DataTypes.DATE, allowNull: true, field: 'sent_to_worker_at' },
      workerAcceptedAt: { type: DataTypes.DATE, allowNull: true, field: 'worker_accepted_at' },
      workStartedAt: { type: DataTypes.DATE, allowNull: true, field: 'work_started_at' },
      workCompletedAt: { type: DataTypes.DATE, allowNull: true, field: 'work_completed_at' },
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
