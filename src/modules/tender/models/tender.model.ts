import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TenderAttributes {
  id: string;
  tenderNumber: string;
  title: string;
  status: string;
  issueDate: Date;
  dueDate?: Date | null;
  description?: string | null;
}

export type TenderCreationAttributes = Optional<TenderAttributes, 'id' | 'dueDate' | 'description'>;

export class Tender extends Model<TenderAttributes, TenderCreationAttributes> implements TenderAttributes {
  declare id: string;
  declare tenderNumber: string;
  declare title: string;
  declare status: string;
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
      status: { type: DataTypes.STRING(50), allowNull: false },
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