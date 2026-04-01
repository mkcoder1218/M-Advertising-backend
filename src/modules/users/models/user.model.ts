import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'phone' | 'isActive' | 'lastLoginAt'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare fullName: string;
  declare phone?: string | null;
  declare isActive: boolean;
  declare lastLoginAt?: Date | null;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      passwordHash: { type: DataTypes.TEXT, allowNull: false, field: 'password_hash' },
      fullName: { type: DataTypes.STRING(255), allowNull: false, field: 'full_name' },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
      lastLoginAt: { type: DataTypes.DATE, allowNull: true, field: 'last_login_at' },
    },
    { sequelize, tableName: 'users' }
  );

  return User;
};

export const associateUserModel = (models: any) => {
  User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
  User.hasOne(models.Employee, { foreignKey: 'user_id' });
};