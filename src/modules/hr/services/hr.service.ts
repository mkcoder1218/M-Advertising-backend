import { Employee } from '../models/employee.model';
import { User } from '../../users/models/user.model';
import { Role } from '../../roles/models/role.model';
import { Op } from 'sequelize';

export const createEmployee = async (data: any) => Employee.create(data);

export const listEmployees = async (filters: any) => {
  // Backfill employees if missing
  const existing = await Employee.count();
  if (existing === 0) {
    const users = await User.findAll({ include: [Role] });
    for (const u of users) {
      const roles = (u as any).Roles || [];
      if (roles.some((r: any) => r.name === 'SUPER_ADMIN' || r.name === 'OWNER')) continue;
      await Employee.findOrCreate({
        where: { userId: u.id },
        defaults: {
          userId: u.id,
          firstName: (u.fullName || u.email).split(' ')[0],
          lastName: (u.fullName || u.email).split(' ').slice(1).join(' ') || (u.fullName || u.email),
          email: u.email,
          position: roles[0]?.name || null,
          hireDate: new Date().toISOString().slice(0, 10),
          isActive: true,
        },
      });
    }
  }

  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const search = filters.search ? String(filters.search).toLowerCase() : '';

  const all = await Employee.findAll({
    include: [
      {
        model: User,
        include: [Role],
      },
    ],
    order: [['created_at', 'DESC']],
  });

  const filtered = all.filter((e: any) => {
    const roles = e.User?.Roles || [];
    if (roles.some((r: any) => r.name === 'SUPER_ADMIN' || r.name === 'OWNER')) return false;
    if (!search) return true;
    const name = `${e.firstName} ${e.lastName}`.toLowerCase();
    return name.includes(search) || (e.email || '').toLowerCase().includes(search);
  });

  return {
    total: filtered.length,
    items: filtered.slice(offset, offset + limit),
  };
};
