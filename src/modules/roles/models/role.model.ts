import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface RoleAttributes {
  id: string;
  name: string;
  description?: string | null;
}

export type RoleCreationAttributes = Optional<RoleAttributes, 'id' | 'description'>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  declare id: string;
  declare name: string;
  declare description?: string | null;
}

export const initRoleModel = (sequelize: Sequelize) => {
  Role.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'roles' }
  );

  return Role;
};

export const associateRoleModel = (models: any) => {
  Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'role_id', otherKey: 'user_id' });
  Role.belongsToMany(models.Permission, { through: models.RolePermission, foreignKey: 'role_id', otherKey: 'permission_id' });
};