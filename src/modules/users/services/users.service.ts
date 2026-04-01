import { User } from '../models/user.model';
import { hashPassword } from '../../../utils/password.util';

export const createUser = async (data: any) => {
  const passwordHash = await hashPassword(data.password);
  const payload = { ...data, passwordHash };
  delete payload.password;
  return User.create(payload);
};

export const getUserById = async (id: string) => {
  return User.findByPk(id);
};

export const listUsers = async (filters: any) => {
  const where: any = {};
  if (filters.isActive !== undefined) where.isActive = filters.isActive;
  return User.findAll({ where });
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (data.password) {
    data.passwordHash = await hashPassword(data.password);
    delete data.password;
  }

  return user.update(data);
};

export const deleteUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};