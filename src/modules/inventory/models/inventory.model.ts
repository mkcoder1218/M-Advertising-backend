import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface InventoryAttributes {
  id: string;
  productId: string;
  location?: string | null;
  quantity: number;
  reorderLevel?: number | null;
}

export type InventoryCreationAttributes = Optional<InventoryAttributes, 'id' | 'location' | 'reorderLevel'>;

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  declare id: string;
  declare productId: string;
  declare location?: string | null;
  declare quantity: number;
  declare reorderLevel?: number | null;
}

export const initInventoryModel = (sequelize: Sequelize) => {
  Inventory.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      location: { type: DataTypes.STRING(100), allowNull: true },
      quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      reorderLevel: { type: DataTypes.DECIMAL(12, 2), allowNull: true, field: 'reorder_level' },
    },
    {
      sequelize,
      tableName: 'inventory',
      indexes: [{ unique: true, fields: ['product_id', 'location'] }],
    }
  );

  return Inventory;
};

export const associateInventoryModel = (models: any) => {
  Inventory.belongsTo(models.Product, { foreignKey: 'product_id' });
};