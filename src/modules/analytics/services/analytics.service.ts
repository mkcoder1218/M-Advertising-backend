import { sequelize } from '../../../database/sequelize';
import { Order } from '../../orders/models/order.model';
import { ProductionJob } from '../../production/models/productionJob.model';
import { Employee } from '../../hr/models/employee.model';
import { Attendance } from '../../hr/models/attendance.model';
import { Op } from 'sequelize';
import { User } from '../../users/models/user.model';

export const getOverview = async () => {
  const [salesRevenueResult] = await sequelize.query(
    "SELECT COALESCE(SUM(quantity * unit_price), 0) AS total FROM sale_items"
  );
  const totalRevenue = Number((salesRevenueResult as any)[0]?.total || 0);

  const activeJobs = await ProductionJob.count({
    where: { status: { [Op.ne]: 'COMPLETED' } },
  });

  const pendingOrders = await Order.count({
    where: { status: { [Op.in]: ['PENDING', 'PROCESSING'] } },
  });

  const [inventoryValueResult] = await sequelize.query(
    `
      SELECT COALESCE(SUM(i.quantity * COALESCE(p.avg_price, 0)), 0) AS total
      FROM inventory i
      LEFT JOIN (
        SELECT product_id, AVG(unit_price) AS avg_price
        FROM sale_items
        GROUP BY product_id
      ) p ON p.product_id = i.product_id
    `
  );
  const inventoryValue = Number((inventoryValueResult as any)[0]?.total || 0);

  const totalJobs = await ProductionJob.count();
  const completedJobs = await ProductionJob.count({ where: { status: 'COMPLETED' } });
  const efficiency = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  const employees = await Employee.count();
  const laborCost = employees * 0;

  const materialWaste = 0;
  const netProfit = totalRevenue;

  return {
    dashboard: {
      totalRevenue,
      activeJobs,
      inventoryValue,
      pendingOrders,
    },
    analytics: {
      efficiency,
      laborCost,
      materialWaste,
      netProfit,
    },
  };
};

const hoursBetween = (start?: Date | null, end?: Date | null) => {
  if (!start || !end) return null;
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return null;
  return diff / (1000 * 60 * 60);
};

const growthPercent = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const getRoleAnalytics = async (user: any) => {
  const role = (user?.roles || [])[0] || 'UNKNOWN';
  const now = new Date();
  const start7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const start14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const result: any = { role };

  if (['OWNER', 'MANAGER', 'HR'].includes(role)) {
    const orders = await Order.findAll();
    const productionOrders = orders.filter((o: any) => o.workCompletedAt);
    const avgProd = productionOrders
      .map((o: any) => hoursBetween(o.workerAcceptedAt, o.workCompletedAt))
      .filter((v: any) => v !== null) as number[];
    const avgProdHours = avgProd.length ? Math.round((avgProd.reduce((a, b) => a + b, 0) / avgProd.length) * 10) / 10 : 0;

    const workersMap: Record<string, { tasksCompleted: number; totalHours: number; role: string }> = {};
    for (const o of orders as any[]) {
      if (o.assignedWorkerId && o.workCompletedAt) {
        const h = hoursBetween(o.workerAcceptedAt, o.workCompletedAt) || 0;
        if (!workersMap[o.assignedWorkerId]) workersMap[o.assignedWorkerId] = { tasksCompleted: 0, totalHours: 0, role: 'PRODUCTION_TEAM' };
        workersMap[o.assignedWorkerId].tasksCompleted += 1;
        workersMap[o.assignedWorkerId].totalHours += h;
      }
      if (o.assignedDesignerId && o.sentToWorkerAt && o.sentToDesignerAt) {
        const h = hoursBetween(o.sentToDesignerAt, o.sentToWorkerAt) || 0;
        if (!workersMap[o.assignedDesignerId]) workersMap[o.assignedDesignerId] = { tasksCompleted: 0, totalHours: 0, role: 'DESIGNER' };
        workersMap[o.assignedDesignerId].tasksCompleted += 1;
        workersMap[o.assignedDesignerId].totalHours += h;
      }
      if (o.acceptedById && (o.sentToDesignerAt || o.sentToWorkerAt)) {
        const h = hoursBetween(o.createdAt, o.sentToDesignerAt || o.sentToWorkerAt) || 0;
        if (!workersMap[o.acceptedById]) workersMap[o.acceptedById] = { tasksCompleted: 0, totalHours: 0, role: 'ORDER_RECEPTION' };
        workersMap[o.acceptedById].tasksCompleted += 1;
        workersMap[o.acceptedById].totalHours += h;
      }
    }

    const userIds = Object.keys(workersMap);
    const users = await User.findAll({ where: { id: { [Op.in]: userIds } } });
    const nameById: Record<string, string> = {};
    for (const u of users as any[]) nameById[u.id] = u.fullName;

    result.overall = {
      totalOrders: orders.length,
      completedOrders: productionOrders.length,
      avgProductionHours: avgProdHours,
    };
    result.workers = userIds.map((id) => ({
      id,
      name: nameById[id] || id,
      role: workersMap[id].role,
      tasksCompleted: workersMap[id].tasksCompleted,
      avgHours: workersMap[id].tasksCompleted
        ? Math.round((workersMap[id].totalHours / workersMap[id].tasksCompleted) * 10) / 10
        : 0,
    }));
    return result;
  }

  const attendanceDays = async () => {
    const employee = await Employee.findOne({ where: { userId: user.id } });
    if (!employee) return 0;
    return Attendance.count({
      where: {
        employeeId: employee.id,
        status: 'PRESENT',
        date: { [Op.gte]: start7.toISOString().slice(0, 10) },
      },
    });
  };

  if (role === 'ORDER_RECEPTION') {
    const orders = await Order.findAll({ where: { acceptedById: user.id } });
    const tasksWorked = orders.length;
    const durations = orders
      .map((o: any) => hoursBetween(o.createdAt, o.sentToDesignerAt || o.sentToWorkerAt))
      .filter((v: any) => v !== null) as number[];
    const avgHours = durations.length ? Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10 : 0;
    const current = orders.filter((o: any) => (o.sentToDesignerAt || o.sentToWorkerAt) && (o.sentToDesignerAt || o.sentToWorkerAt) >= start7).length;
    const previous = orders.filter((o: any) => {
      const t = o.sentToDesignerAt || o.sentToWorkerAt;
      return t && t >= start14 && t < start7;
    }).length;
    result.summary = { tasksWorked, avgHours, growthPercent: growthPercent(current, previous), attendanceDays: await attendanceDays() };
    return result;
  }

  if (role === 'DESIGNER') {
    const orders = await Order.findAll({ where: { assignedDesignerId: user.id } });
    const tasksWorked = orders.length;
    const durations = orders
      .map((o: any) => hoursBetween(o.sentToDesignerAt, o.sentToWorkerAt))
      .filter((v: any) => v !== null) as number[];
    const avgHours = durations.length ? Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10 : 0;
    const current = orders.filter((o: any) => o.sentToWorkerAt && o.sentToWorkerAt >= start7).length;
    const previous = orders.filter((o: any) => o.sentToWorkerAt && o.sentToWorkerAt >= start14 && o.sentToWorkerAt < start7).length;
    result.summary = { tasksWorked, avgHours, growthPercent: growthPercent(current, previous), attendanceDays: await attendanceDays() };
    return result;
  }

  if (role === 'PRODUCTION_TEAM') {
    const orders = await Order.findAll({ where: { assignedWorkerId: user.id } });
    const completed = orders.filter((o: any) => o.workCompletedAt);
    const durations = completed
      .map((o: any) => hoursBetween(o.workerAcceptedAt, o.workCompletedAt))
      .filter((v: any) => v !== null) as number[];
    const avgHours = durations.length ? Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10 : 0;
    const current = completed.filter((o: any) => o.workCompletedAt && o.workCompletedAt >= start7).length;
    const previous = completed.filter((o: any) => o.workCompletedAt && o.workCompletedAt >= start14 && o.workCompletedAt < start7).length;
    result.summary = { tasksWorked: completed.length, avgHours, growthPercent: growthPercent(current, previous), attendanceDays: await attendanceDays() };
    return result;
  }

  result.summary = { tasksWorked: 0, avgHours: 0, growthPercent: 0, attendanceDays: await attendanceDays() };
  return result;
};
