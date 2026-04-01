import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface WorkTypeAttributes {
  id: string;
  name: string;
  description?: string | null;
}

export type WorkTypeCreationAttributes = Optional<WorkTypeAttributes, 'id' | 'description'>;

export class WorkType extends Model<WorkTypeAttributes, WorkTypeCreationAttributes> implements WorkTypeAttributes {
  declare id: string;
  declare name: string;
  declare description?: string | null;
}

export const initWorkTypeModel = (sequelize: Sequelize) => {
  WorkType.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'work_types' }
  );

  return WorkType;
};

export const associateWorkTypeModel = (models: any) => {
  WorkType.hasMany(models.User, { foreignKey: 'work_type_id' });
  WorkType.hasMany(models.OrderItem, { foreignKey: 'work_type_id' });
};
