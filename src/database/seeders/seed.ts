import '../../config/env';
import { initDatabase } from '../index';
import { hashPassword } from '../../utils/password.util';

const seed = async () => {
  const { sequelize, models } = initDatabase();
  await sequelize.authenticate();

  const roles = [
    { name: 'SUPER_ADMIN', description: 'Unlimited system access.' },
    { name: 'OWNER', description: 'Full system access and high-level analytics.' },
    { name: 'MANAGER', description: 'Operational oversight and production tracking.' },
    { name: 'HR', description: 'Employee management and attendance.' },
    { name: 'STORE_MANAGER', description: 'Inventory control and stock management.' },
    { name: 'BUYER', description: 'Supplier relations and purchasing.' },
    { name: 'SALES', description: 'Customer orders and POS interface.' },
    { name: 'TENDER', description: 'Contract management and bidding.' },
    { name: 'ORDER_RECEPTION', description: 'Initial order intake and processing.' },
    { name: 'PRODUCTION_TEAM', description: 'Task-focused workflow for shop floor.' },
  ];

  const roleRows: Record<string, any> = {};
  for (const role of roles) {
    const [row] = await models.Role.findOrCreate({
      where: { name: role.name },
      defaults: { name: role.name, description: role.description },
    });
    roleRows[role.name] = row;
  }

  const permissions = [
    'users.read',
    'users.write',
    'roles.read',
    'roles.write',
    'inventory.read',
    'inventory.write',
    'production.read',
    'production.write',
    'orders.read',
    'orders.write',
    'sales.read',
    'sales.write',
    'procurement.read',
    'procurement.write',
    'teams.read',
    'teams.write',
    'tender.read',
    'tender.write',
    'hr.read',
    'hr.write',
  ];

  const permissionRows = [];
  for (const code of permissions) {
    const [perm] = await models.Permission.findOrCreate({
      where: { code },
      defaults: { code, description: code },
    });
    permissionRows.push(perm);
  }

  const permsByCode: Record<string, any> = {};
  for (const p of permissionRows) permsByCode[p.code] = p;

  const pick = (codes: string[]) => codes.map(c => permsByCode[c]).filter(Boolean);

  await roleRows.OWNER.setPermissions(permissionRows);
  await roleRows.SUPER_ADMIN.setPermissions(permissionRows);
  await roleRows.MANAGER.setPermissions(permissionRows);
  await roleRows.HR.setPermissions(pick(['hr.read', 'hr.write']));
  await roleRows.STORE_MANAGER.setPermissions(pick(['inventory.read', 'inventory.write']));
  await roleRows.BUYER.setPermissions(pick(['procurement.read', 'procurement.write', 'inventory.read']));
  await roleRows.SALES.setPermissions(pick(['sales.read', 'sales.write', 'orders.read']));
  await roleRows.TENDER.setPermissions(pick(['tender.read', 'tender.write']));
  await roleRows.ORDER_RECEPTION.setPermissions(pick(['orders.read', 'orders.write']));
  await roleRows.PRODUCTION_TEAM.setPermissions(pick(['production.read', 'production.write']));

  const workTypes = [
    { name: 'WELDING', description: 'Welding and metal joining' },
    { name: 'CNC', description: 'CNC machining and cutting' },
    { name: 'ASSEMBLY', description: 'Assembly line work' },
    { name: 'PAINT', description: 'Paint and finishing' },
  ];

  const workTypeRows: Record<string, any> = {};
  for (const wt of workTypes) {
    const [row] = await models.WorkType.findOrCreate({
      where: { name: wt.name },
      defaults: { name: wt.name, description: wt.description },
    });
    workTypeRows[wt.name] = row;
  }

  const seedUsers = [
    { role: 'SUPER_ADMIN', email: 'superadmin@workshop.local', password: 'SuperAdmin@12345', name: 'Super Admin' },
    { role: 'OWNER', email: 'owner@workshop.local', password: 'Owner@12345', name: 'System Owner' },
    { role: 'MANAGER', email: 'manager@workshop.local', password: 'Manager@12345', name: 'Operations Manager' },
    { role: 'HR', email: 'hr@workshop.local', password: 'HR@12345', name: 'HR Manager' },
    { role: 'STORE_MANAGER', email: 'store@workshop.local', password: 'Store@12345', name: 'Store Manager' },
    { role: 'BUYER', email: 'buyer@workshop.local', password: 'Buyer@12345', name: 'Procurement Buyer' },
    { role: 'SALES', email: 'sales@workshop.local', password: 'Sales@12345', name: 'Sales Executive' },
    { role: 'TENDER', email: 'tender@workshop.local', password: 'Tender@12345', name: 'Tender Officer' },
    { role: 'ORDER_RECEPTION', email: 'orders@workshop.local', password: 'Orders@12345', name: 'Order Reception' },
    { role: 'PRODUCTION_TEAM', email: 'production@workshop.local', password: 'Production@12345', name: 'Production Team', workType: 'WELDING' },
  ];

  for (const u of seedUsers) {
    const passwordHash = await hashPassword(u.password);
    const [user] = await models.User.findOrCreate({
      where: { email: u.email },
      defaults: {
        email: u.email,
        fullName: u.name,
        passwordHash,
        isActive: true,
        workTypeId: u.workType ? workTypeRows[u.workType]?.id : null,
      },
    });
    await (user as any).setRoles([roleRows[u.role]]);

    // Ensure employee record exists for HR view
    await models.Employee.findOrCreate({
      where: { userId: user.id },
      defaults: {
        userId: user.id,
        firstName: u.name.split(' ')[0],
        lastName: u.name.split(' ').slice(1).join(' ') || u.name,
        email: u.email,
        phone: null,
        position: u.role,
        hireDate: new Date(),
        isActive: true,
      },
    });
  }

  // Attendance seed for today
  const today = new Date().toISOString().slice(0, 10);
  const employees = await models.Employee.findAll();
  for (const emp of employees) {
    await models.Attendance.findOrCreate({
      where: { employeeId: emp.id, date: today },
      defaults: {
        employeeId: emp.id,
        date: today,
        status: 'PRESENT',
        notes: null,
      },
    });
  }

  // Products seed
  const products = [
    { sku: 'RAW-STEEL-001', name: 'Steel Sheet', type: 'raw' as const, unit: 'kg', description: 'Mild steel sheets', sellingPrice: 8.5 },
    { sku: 'RAW-AL-002', name: 'Aluminum Rod', type: 'raw' as const, unit: 'pcs', description: '6061 aluminum rods', sellingPrice: 12.0 },
    { sku: 'FIN-CHAIR-001', name: 'Metal Chair', type: 'finished' as const, unit: 'pcs', description: 'Finished metal chair', sellingPrice: 60.0 },
    { sku: 'FIN-TABLE-002', name: 'Workshop Table', type: 'finished' as const, unit: 'pcs', description: 'Heavy duty table', sellingPrice: 150.0 },
  ];

  const productRows: Record<string, any> = {};
  for (const p of products) {
    const [row] = await models.Product.findOrCreate({
      where: { sku: p.sku },
      defaults: p,
    });
    productRows[p.sku] = row;
  }

  // Inventory seed
  const inventorySeed = [
    { sku: 'RAW-STEEL-001', quantity: 120, location: 'Main Store' },
    { sku: 'RAW-AL-002', quantity: 80, location: 'Main Store' },
    { sku: 'FIN-CHAIR-001', quantity: 25, location: 'Finished Goods' },
    { sku: 'FIN-TABLE-002', quantity: 10, location: 'Finished Goods' },
  ];
  for (const inv of inventorySeed) {
    await models.Inventory.findOrCreate({
      where: { productId: productRows[inv.sku].id, location: inv.location },
      defaults: {
        productId: productRows[inv.sku].id,
        location: inv.location,
        quantity: inv.quantity,
      },
    });
  }

  // Orders + order items seed
  const orders = [
    {
      orderNumber: 'ORD-SEED-001',
      customerName: 'Acme Industries',
      customerContact: 'acme@example.com',
      status: 'PENDING',
      approvalStatus: 'AWAITING_RECEPTION',
      orderDate: new Date(),
      total: 1200,
      itemsCount: 2,
      items: [
        { sku: 'FIN-CHAIR-001', quantity: 10, unitPrice: 60, workType: 'ASSEMBLY' },
        { sku: 'FIN-TABLE-002', quantity: 4, unitPrice: 150, workType: 'WELDING' },
      ],
    },
    {
      orderNumber: 'ORD-SEED-002',
      customerName: 'BuildCo Ltd',
      customerContact: 'buildco@example.com',
      status: 'PROCESSING',
      approvalStatus: 'SENT_TO_WORKER',
      assignedWorker: 'Production Team',
      orderDate: new Date(),
      total: 500,
      itemsCount: 1,
      items: [
        { sku: 'FIN-CHAIR-001', quantity: 5, unitPrice: 100, workType: 'PAINT' },
      ],
    },
  ];

  const [ownerUser] = await models.User.findOrCreate({
    where: { email: 'owner@workshop.local' },
  });

  for (const o of orders) {
    const [order] = await models.Order.findOrCreate({
      where: { orderNumber: o.orderNumber },
      defaults: {
        customerName: o.customerName,
        customerContact: o.customerContact,
        status: o.status,
        approvalStatus: o.approvalStatus,
        assignedWorker: o.assignedWorker || null,
        orderDate: o.orderDate,
        total: o.total,
        itemsCount: o.itemsCount,
        createdBy: ownerUser?.id || null,
      },
    });

    for (const item of o.items) {
      await models.OrderItem.findOrCreate({
        where: { orderId: order.id, productId: productRows[item.sku].id },
        defaults: {
          orderId: order.id,
          productId: productRows[item.sku].id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          workTypeId: workTypeRows[item.workType]?.id || null,
        },
      });
    }
  }

  // Production seed
  const [team] = await models.Team.findOrCreate({
    where: { name: 'Main Production Team' },
  });

  const [job] = await models.ProductionJob.findOrCreate({
    where: { jobNumber: 'JOB-SEED-001' },
    defaults: {
      teamId: team.id,
      status: 'IN_PROGRESS',
      startDate: new Date(),
      notes: 'Seeded production job',
    },
  });

  await models.ProductionTask.findOrCreate({
    where: { productionJobId: job.id, productId: productRows['FIN-CHAIR-001'].id },
    defaults: {
      productionJobId: job.id,
      productId: productRows['FIN-CHAIR-001'].id,
      quantity: 10,
      status: 'IN_PROGRESS',
    },
  });

  await sequelize.close();
};

seed()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
  });
