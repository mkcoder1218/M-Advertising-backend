import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TenderAttributes {
  id: string;
  tenderNumber: string;
  title: string;
  clientName: string;
  value: number;
  status: string;
  approvalStatus: string;
  assignedWorker?: string | null;
  assignedBy?: string | null;
  issueDate: Date;
  dueDate?: Date | null;
  description?: string | null;
}

export type TenderCreationAttributes = Optional<
  TenderAttributes,
  'id' | 'dueDate' | 'description' | 'assignedWorker' | 'assignedBy'
>;

export class Tender extends Model<TenderAttributes, TenderCreationAttributes> implements TenderAttributes {
  declare id: string;
  declare tenderNumber: string;
  declare title: string;
  declare clientName: string;
  declare value: number;
  declare status: string;
  declare approvalStatus: string;
  declare assignedWorker?: string | null;
  declare assignedBy?: string | null;
  declare issueDate: Date;
  declare dueDate?: Date | null;
  declare description?: string | null;
}

export const initTenderModel = (sequelize: Sequelize) => {
  Tender.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      tenderNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'tender_number' },
      title: { type: DataTypes.STRING(255), allowNull: false },
      clientName: { type: DataTypes.STRING(255), allowNull: false, field: 'client_name' },
      value: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      status: { type: DataTypes.STRING(50), allowNull: false },
      approvalStatus: { type: DataTypes.STRING(50), allowNull: false, field: 'approval_status' },
      assignedWorker: { type: DataTypes.STRING(255), allowNull: true, field: 'assigned_worker' },
      assignedBy: { type: DataTypes.STRING(255), allowNull: true, field: 'assigned_by' },
      issueDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'issue_date' },
      dueDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'due_date' },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'tenders' }
  );

  return Tender;
};

export const associateTenderModel = (_models: any) => {
  return;
};
