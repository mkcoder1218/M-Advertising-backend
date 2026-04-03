import { User } from '../models/user.model';
import { Role } from '../../roles/models/role.model';
import { Op } from 'sequelize';
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
  if (filters.search) {
    where[Op.or] = [
      { fullName: { [Op.iLike]: `%${filters.search}%` } },
      { email: { [Op.iLike]: `%${filters.search}%` } },
    ];
  }
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const { count, rows } = await User.findAndCountAll({
    where,
    include: [Role],
    order: [['created_at', 'DESC']],
    limit,
    offset,
  });
  return { total: count, items: rows, page, limit };
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

export const setProfileImage = async (id: string, uploadId: string) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update({ profileImageId: uploadId });
};

export const setAttendanceLocation = async (id: string, data: { attendanceLat: number; attendanceLng: number; attendanceRadiusM?: number }) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update({
    attendanceLat: data.attendanceLat,
    attendanceLng: data.attendanceLng,
    attendanceRadiusM: data.attendanceRadiusM ?? user.attendanceRadiusM ?? 50,
  });
};
