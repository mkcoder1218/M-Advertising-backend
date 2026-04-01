import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface RefreshTokenAttributes {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  revokedAt?: Date | null;
}

export type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, 'id' | 'revokedAt'>;

export class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  declare id: string;
  declare userId: string;
  declare token: string;
  declare expiresAt: Date;
  declare revokedAt?: Date | null;
}

export const initRefreshTokenModel = (sequelize: Sequelize) => {
  RefreshToken.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
      token: { type: DataTypes.TEXT, allowNull: false, unique: true },
      expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
      revokedAt: { type: DataTypes.DATE, allowNull: true, field: 'revoked_at' },
    },
    { sequelize, tableName: 'refresh_tokens' }
  );

  return RefreshToken;
};

export const associateRefreshTokenModel = (models: any) => {
  RefreshToken.belongsTo(models.User, { foreignKey: 'user_id' });
};