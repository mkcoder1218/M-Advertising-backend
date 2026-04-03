import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
  profileImageId?: string | null;
  workTypeId?: string | null;
  attendanceLat?: number | null;
  attendanceLng?: number | null;
  attendanceRadiusM?: number | null;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'phone' | 'isActive' | 'lastLoginAt' | 'profileImageId' | 'workTypeId' | 'attendanceLat' | 'attendanceLng' | 'attendanceRadiusM'
>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare fullName: string;
  declare phone?: string | null;
  declare isActive: boolean;
  declare lastLoginAt?: Date | null;
  declare profileImageId?: string | null;
  declare workTypeId?: string | null;
  declare attendanceLat?: number | null;
  declare attendanceLng?: number | null;
  declare attendanceRadiusM?: number | null;
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
      profileImageId: { type: DataTypes.UUID, allowNull: true, field: 'profile_image_id' },
      workTypeId: { type: DataTypes.UUID, allowNull: true, field: 'work_type_id' },
      attendanceLat: { type: DataTypes.DECIMAL(10, 6), allowNull: true, field: 'attendance_lat' },
      attendanceLng: { type: DataTypes.DECIMAL(10, 6), allowNull: true, field: 'attendance_lng' },
      attendanceRadiusM: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 50, field: 'attendance_radius_m' },
    },
    { sequelize, tableName: 'users' }
  );

  return User;
};

export const associateUserModel = (models: any) => {
  User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
  User.hasOne(models.Employee, { foreignKey: 'user_id' });
  User.belongsTo(models.Upload, { foreignKey: 'profile_image_id' });
  User.belongsTo(models.WorkType, { foreignKey: 'work_type_id' });
};
