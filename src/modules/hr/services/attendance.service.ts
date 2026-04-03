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

const haversineMeters = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const getUserAttendance = async (userId: string, date?: string) => {
  const targetDate = getAttendanceDate(date);
  const employee = await Employee.findOne({ where: { userId } });
  if (!employee) return null;
  await ensureDailyAttendance(targetDate);
  return Attendance.findOne({ where: { employeeId: employee.id, date: targetDate } });
};

export const markSelfAttendance = async (userId: string, lat: number, lng: number) => {
  const targetDate = getAttendanceDate();
  const user = await User.findByPk(userId);
  if (!user || user.attendanceLat == null || user.attendanceLng == null) {
    throw new Error('Attendance location not set');
  }
  const radius = user.attendanceRadiusM || 50;
  const distance = haversineMeters(Number(user.attendanceLat), Number(user.attendanceLng), lat, lng);
  if (distance > radius) {
    const err: any = new Error('Outside allowed location');
    err.code = 'OUTSIDE_RADIUS';
    err.distance = distance;
    err.radius = radius;
    throw err;
  }

  let employee = await Employee.findOne({ where: { userId } });
  if (!employee) {
    employee = await Employee.create({
      userId,
      firstName: user.fullName?.split(' ')[0] || user.email?.split('@')[0] || 'User',
      lastName: user.fullName?.split(' ').slice(1).join(' ') || user.fullName || 'Employee',
      email: user.email,
      isActive: true,
    } as any);
  }
  const [record] = await Attendance.findOrCreate({
    where: { employeeId: employee.id, date: targetDate },
    defaults: { employeeId: employee.id, date: targetDate, status: 'PRESENT', notes: null },
  });
  if (record.status !== 'PRESENT') {
    await record.update({ status: 'PRESENT' });
  }
  return record;
};

export const createAttendance = async (data: any) => {
  return Attendance.create(data);
};

export const updateAttendance = async (id: string, data: any) => {
  const item = await Attendance.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
