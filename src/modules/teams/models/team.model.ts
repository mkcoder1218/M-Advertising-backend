import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TeamAttributes {
  id: string;
  name: string;
}

export type TeamCreationAttributes = Optional<TeamAttributes, 'id'>;

export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
  declare id: string;
  declare name: string;
}

export const initTeamModel = (sequelize: Sequelize) => {
  Team.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    },
    { sequelize, tableName: 'teams' }
  );

  return Team;
};

export const associateTeamModel = (models: any) => {
  Team.hasMany(models.TeamMember, { foreignKey: 'team_id' });
  Team.hasMany(models.ProductionJob, { foreignKey: 'team_id' });
};