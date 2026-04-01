import { initDatabase } from '../index';
import { hashPassword } from '../../utils/password.util';

const seed = async () => {
  const { sequelize, models } = initDatabase();
  await sequelize.authenticate();

  const [adminRole] = await models.Role.findOrCreate({
    where: { name: 'admin' },
    defaults: { description: 'System administrator' },
  });

  const [managerRole] = await models.Role.findOrCreate({
    where: { name: 'manager' },
    defaults: { description: 'Operations manager' },
  });

  const [staffRole] = await models.Role.findOrCreate({
    where: { name: 'staff' },
    defaults: { description: 'Staff user' },
  });

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
      defaults: { description: code },
    });
    permissionRows.push(perm);
  }

  await adminRole.setPermissions(permissionRows);
  await managerRole.setPermissions(permissionRows.filter((p: any) => !p.code.startsWith('roles.')));
  await staffRole.setPermissions(permissionRows.filter((p: any) => p.code.endsWith('.read')));

  const adminPasswordHash = await hashPassword('Admin@12345');
  const [adminUser] = await models.User.findOrCreate({
    where: { email: 'admin@workshop.local' },
    defaults: {
      fullName: 'System Admin',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
  });

  await adminUser.setRoles([adminRole]);

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
