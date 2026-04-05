import { Permission } from '../models/permission.model';

export const createPermission = async (data: any) => Permission.create(data);
export const getPermissionById = async (id: string) => Permission.findByPk(id);
export const listPermissions = async () => Permission.findAll();
export const updatePermission = async (id: string, data: any) => {
  const perm = await Permission.findByPk(id);
  if (!perm) return null;
  return perm.update(data);
};
export const deletePermission = async (id: string) => {
  const perm = await Permission.findByPk(id);
  if (!perm) return null;
  await perm.destroy();
  return perm;
};
