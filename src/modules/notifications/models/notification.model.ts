import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface NotificationAttributes {
  id: string;
  userId: string;
  title: string;
  message: string;
  data?: object | null;
  readAt?: Date | null;
}

export type NotificationCreationAttributes = Optional<NotificationAttributes, 'id' | 'data' | 'readAt'>;

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  declare id: string;
  declare userId: string;
  declare title: string;
  declare message: string;
  declare data?: object | null;
  declare readAt?: Date | null;
}

export const initNotificationModel = (sequelize: Sequelize) => {
  Notification.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
      title: { type: DataTypes.STRING(255), allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      data: { type: DataTypes.JSONB, allowNull: true },
      readAt: { type: DataTypes.DATE, allowNull: true, field: 'read_at' },
    },
    { sequelize, tableName: 'notifications' }
  );

  return Notification;
};

export const associateNotificationModel = (models: any) => {
  Notification.belongsTo(models.User, { foreignKey: 'user_id' });
};
