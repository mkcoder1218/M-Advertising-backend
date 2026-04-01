import { Team } from '../models/team.model';
import { TeamMember } from '../models/teamMember.model';

export const createTeam = async (data: any) => Team.create(data);
export const getTeamById = async (id: string) => Team.findByPk(id);
export const listTeams = async () => Team.findAll();
export const updateTeam = async (id: string, data: any) => {
  const team = await Team.findByPk(id);
  if (!team) return null;
  return team.update(data);
};
export const deleteTeam = async (id: string) => {
  const team = await Team.findByPk(id);
  if (!team) return null;
  await team.destroy();
  return team;
};

export const addTeamMember = async (data: any) => TeamMember.create(data);
export const listTeamMembers = async (teamId: string) => TeamMember.findAll({ where: { teamId } });