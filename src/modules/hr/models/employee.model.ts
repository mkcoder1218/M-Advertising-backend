import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface EmployeeAttributes {
  id: string;
  userId?: string | null;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  position?: string | null;
  hireDate?: Date | null;
  isActive: boolean;
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'id' | 'userId' | 'email' | 'phone' | 'position' | 'hireDate' | 'isActive'>;

export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  declare id: string;
  declare userId?: string | null;
  declare firstName: string;
  declare lastName: string;
  declare email?: string | null;
  declare phone?: string | null;
  declare position?: string | null;
  declare hireDate?: Date | null;
  declare isActive: boolean;
}

export const initEmployeeModel = (sequelize: Sequelize) => {
  Employee.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: true, field: 'user_id' },
      firstName: { type: DataTypes.STRING(100), allowNull: false, field: 'first_name' },
      lastName: { type: DataTypes.STRING(100), allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      position: { type: DataTypes.STRING(100), allowNull: true },
      hireDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'hire_date' },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    { sequelize, tableName: 'employees' }
  );

  return Employee;
};

export const associateEmployeeModel = (models: any) => {
  Employee.belongsTo(models.User, { foreignKey: 'user_id' });
  Employee.hasMany(models.TeamMember, { foreignKey: 'employee_id' });
  Employee.hasMany(models.Attendance, { foreignKey: 'employee_id' });
};
