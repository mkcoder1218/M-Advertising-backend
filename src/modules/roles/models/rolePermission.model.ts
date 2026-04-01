import { DataTypes, Model, Sequelize } from 'sequelize';

export class RolePermission extends Model {
  declare roleId: string;
  declare permissionId: string;
}

export const initRolePermissionModel = (sequelize: Sequelize) => {
  RolePermission.init(
    {
      roleId: { type: DataTypes.UUID, primaryKey: true, field: 'role_id' },
      permissionId: { type: DataTypes.UUID, primaryKey: true, field: 'permission_id' },
    },
    { sequelize, tableName: 'role_permissions', timestamps: true }
  );

  return RolePermission;
};