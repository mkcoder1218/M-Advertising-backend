import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface PermissionAttributes {
  id: string;
  code: string;
  description?: string | null;
}

export type PermissionCreationAttributes = Optional<PermissionAttributes, 'id' | 'description'>;

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  declare id: string;
  declare code: string;
  declare description?: string | null;
}

export const initPermissionModel = (sequelize: Sequelize) => {
  Permission.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      code: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'permissions' }
  );

  return Permission;
};

export const associatePermissionModel = (models: any) => {
  Permission.belongsToMany(models.Role, { through: models.RolePermission, foreignKey: 'permission_id', otherKey: 'role_id' });
};