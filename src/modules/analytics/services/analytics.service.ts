import { sequelize } from '../../../database/sequelize';
import { Order } from '../../orders/models/order.model';
import { ProductionJob } from '../../production/models/productionJob.model';
import { Employee } from '../../hr/models/employee.model';
import { Op } from 'sequelize';

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
