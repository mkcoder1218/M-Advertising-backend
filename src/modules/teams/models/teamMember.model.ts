import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TeamMemberAttributes {
  id: string;
  teamId: string;
  employeeId: string;
  roleTitle?: string | null;
}

export type TeamMemberCreationAttributes = Optional<TeamMemberAttributes, 'id' | 'roleTitle'>;

export class TeamMember extends Model<TeamMemberAttributes, TeamMemberCreationAttributes> implements TeamMemberAttributes {
  declare id: string;
  declare teamId: string;
  declare employeeId: string;
  declare roleTitle?: string | null;
}

export const initTeamMemberModel = (sequelize: Sequelize) => {
  TeamMember.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      teamId: { type: DataTypes.UUID, allowNull: false, field: 'team_id' },
      employeeId: { type: DataTypes.UUID, allowNull: false, field: 'employee_id' },
      roleTitle: { type: DataTypes.STRING(100), allowNull: true, field: 'role_title' },
    },
    { sequelize, tableName: 'team_members' }
  );

  return TeamMember;
};

export const associateTeamMemberModel = (models: any) => {
  TeamMember.belongsTo(models.Team, { foreignKey: 'team_id' });
  TeamMember.belongsTo(models.Employee, { foreignKey: 'employee_id' });
};