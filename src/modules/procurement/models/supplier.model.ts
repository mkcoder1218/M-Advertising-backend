import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface SupplierAttributes {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

export type SupplierCreationAttributes = Optional<SupplierAttributes, 'id' | 'email' | 'phone' | 'address'>;

export class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  declare id: string;
  declare name: string;
  declare email?: string | null;
  declare phone?: string | null;
  declare address?: string | null;
}

export const initSupplierModel = (sequelize: Sequelize) => {
  Supplier.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: 'suppliers' }
  );

  return Supplier;
};

export const associateSupplierModel = (models: any) => {
  Supplier.hasMany(models.PurchaseOrder, { foreignKey: 'supplier_id' });
};