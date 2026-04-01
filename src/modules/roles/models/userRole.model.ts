import { DataTypes, Model, Sequelize } from 'sequelize';

export class UserRole extends Model {
  declare userId: string;
  declare roleId: string;
}

export const initUserRoleModel = (sequelize: Sequelize) => {
  UserRole.init(
    {
      userId: { type: DataTypes.UUID, primaryKey: true, field: 'user_id' },
      roleId: { type: DataTypes.UUID, primaryKey: true, field: 'role_id' },
    },
    { sequelize, tableName: 'user_roles', timestamps: true }
  );

  return UserRole;
};