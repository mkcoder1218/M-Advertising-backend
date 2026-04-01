import { Role } from '../models/role.model';

export const createRole = async (data: any) => Role.create(data);
export const getRoleById = async (id: string) => Role.findByPk(id);
export const listRoles = async () => Role.findAll();
export const updateRole = async (id: string, data: any) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  return role.update(data);
};
export const deleteRole = async (id: string) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  await role.destroy();
  return role;
};