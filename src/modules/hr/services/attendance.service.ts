import { Attendance } from '../models/attendance.model';
import { Employee } from '../models/employee.model';
import { User } from '../../users/models/user.model';
import { Role } from '../../roles/models/role.model';

const DISALLOWED_ROLES = new Set(['SUPER_ADMIN', 'OWNER']);

const formatDateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getAttendanceDate = (date?: string) => {
  if (date) return date.toString().slice(0, 10);
  const now = new Date();
  if (now.getHours() < 6) {
    const prev = new Date(now);
    prev.setDate(prev.getDate() - 1);
    return formatDateLocal(prev);
  }
  return formatDateLocal(now);
};

const hasDisallowedRole = (roles: any[] = []) => roles.some((r: any) => DISALLOWED_ROLES.has(r.name));

const ensureDailyAttendance = async (date: string) => {
  const employees = await Employee.findAll({
    include: [
      {
        model: User,
        include: [Role],
      },
    ],
  });

  for (const emp of employees as any[]) {
    const roles = emp.User?.Roles || [];
    if (hasDisallowedRole(roles)) continue;
    await Attendance.findOrCreate({
      where: { employeeId: emp.id, date },
      defaults: { employeeId: emp.id, date, status: 'ABSENT', notes: null },
    });
  }
};

export const listAttendance = async (date?: string, page = 1, limit = 20) => {
  const targetDate = getAttendanceDate(date);
  await ensureDailyAttendance(targetDate);
  const offset = (page - 1) * limit;
  const rows = await Attendance.findAll({
    where: { date: targetDate },
    include: [
      {
        model: Employee,
        include: [
          {
            model: User,
            include: [Role],
          },
        ],
      },
    ],
    order: [['date', 'DESC']],
  });
  const filtered = rows.filter((row: any) => !hasDisallowedRole(row.Employee?.User?.Roles || []));
  const paged = filtered.slice(offset, offset + limit);
  return { total: filtered.length, items: paged, page, limit };
};

export const createAttendance = async (data: any) => {
  return Attendance.create(data);
};

export const updateAttendance = async (id: string, data: any) => {
  const item = await Attendance.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
