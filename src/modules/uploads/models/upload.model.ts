import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UploadAttributes {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
}

export type UploadCreationAttributes = Optional<UploadAttributes, 'id'>;

export class Upload extends Model<UploadAttributes, UploadCreationAttributes> implements UploadAttributes {
  declare id: string;
  declare originalName: string;
  declare fileName: string;
  declare mimeType: string;
  declare size: number;
  declare path: string;
  declare url: string;
}

export const initUploadModel = (sequelize: Sequelize) => {
  Upload.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      originalName: { type: DataTypes.STRING(255), allowNull: false, field: 'original_name' },
      fileName: { type: DataTypes.STRING(255), allowNull: false, field: 'file_name' },
      mimeType: { type: DataTypes.STRING(100), allowNull: false, field: 'mime_type' },
      size: { type: DataTypes.INTEGER, allowNull: false },
      path: { type: DataTypes.TEXT, allowNull: false },
      url: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize, tableName: 'uploads' }
  );

  return Upload;
};

export const associateUploadModel = (models: any) => {
  Upload.hasMany(models.User, { foreignKey: 'profile_image_id' });
  Upload.hasMany(models.Product, { foreignKey: 'image_id' });
};
