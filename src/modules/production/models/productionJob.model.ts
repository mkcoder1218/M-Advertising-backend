import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductionJobAttributes {
  id: string;
  jobNumber: string;
  teamId: string;
  status: string;
  startDate?: Date | null;
  endDate?: Date | null;
  notes?: string | null;
}

export type ProductionJobCreationAttributes = Optional<ProductionJobAttributes, 'id' | 'startDate' | 'endDate' | 'notes'>;

export class ProductionJob extends Model<ProductionJobAttributes, ProductionJobCreationAttributes> implements ProductionJobAttributes {
  declare id: string;
  declare jobNumber: string;
  declare teamId: string;
  declare status: string;
  declare startDate?: Date | null;
  declare endDate?: Date | null;
  declare notes?: string | null;
}

export const initProductionJobModel = (sequelize: Sequelize) => {
  ProductionJob.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      jobNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'job_number' },
      teamId: { type: DataTypes.UUID, allowNull: false, field: 'team_id' },
      status: { type: DataTypes.STRING(50), allowNull: false },
      startDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'start_date' },
      endDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'end_date' },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'production_jobs' }
  );

  return ProductionJob;
};

export const associateProductionJobModel = (models: any) => {
  ProductionJob.belongsTo(models.Team, { foreignKey: 'team_id' });
  ProductionJob.hasMany(models.ProductionTask, { foreignKey: 'production_job_id' });
};