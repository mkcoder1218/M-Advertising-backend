import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductionTaskAttributes {
  id: string;
  productionJobId: string;
  productId: string;
  quantity: number;
  status: string;
}

export type ProductionTaskCreationAttributes = Optional<ProductionTaskAttributes, 'id'>;

export class ProductionTask extends Model<ProductionTaskAttributes, ProductionTaskCreationAttributes> implements ProductionTaskAttributes {
  declare id: string;
  declare productionJobId: string;
  declare productId: string;
  declare quantity: number;
  declare status: string;
}

export const initProductionTaskModel = (sequelize: Sequelize) => {
  ProductionTask.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      productionJobId: { type: DataTypes.UUID, allowNull: false, field: 'production_job_id' },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      status: { type: DataTypes.STRING(50), allowNull: false },
    },
    { sequelize, tableName: 'production_tasks' }
  );

  return ProductionTask;
};

export const associateProductionTaskModel = (models: any) => {
  ProductionTask.belongsTo(models.ProductionJob, { foreignKey: 'production_job_id' });
  ProductionTask.belongsTo(models.Product, { foreignKey: 'product_id' });
};