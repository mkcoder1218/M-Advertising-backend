import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface AttendanceAttributes {
  id: string;
  employeeId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'ON_LEAVE';
  notes?: string | null;
}

export type AttendanceCreationAttributes = Optional<AttendanceAttributes, 'id' | 'notes'>;

export class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes> implements AttendanceAttributes {
  declare id: string;
  declare employeeId: string;
  declare date: string;
  declare status: 'PRESENT' | 'ABSENT' | 'ON_LEAVE';
  declare notes?: string | null;
}

export const initAttendanceModel = (sequelize: Sequelize) => {
  Attendance.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      employeeId: { type: DataTypes.UUID, allowNull: false, field: 'employee_id' },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      status: { type: DataTypes.STRING(20), allowNull: false },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'attendance' }
  );

  return Attendance;
};

export const associateAttendanceModel = (models: any) => {
  Attendance.belongsTo(models.Employee, { foreignKey: 'employee_id' });
};
