import { sequelize } from './sequelize';
import { initUserModel, associateUserModel } from '../modules/users/models/user.model';
import { initRoleModel, associateRoleModel } from '../modules/roles/models/role.model';
import { initPermissionModel, associatePermissionModel } from '../modules/roles/models/permission.model';
import { initUserRoleModel } from '../modules/roles/models/userRole.model';
import { initRolePermissionModel } from '../modules/roles/models/rolePermission.model';
import { initEmployeeModel, associateEmployeeModel } from '../modules/hr/models/employee.model';
import { initTeamModel, associateTeamModel } from '../modules/teams/models/team.model';
import { initTeamMemberModel, associateTeamMemberModel } from '../modules/teams/models/teamMember.model';
import { initProductModel, associateProductModel } from '../modules/inventory/models/product.model';
import { initInventoryModel, associateInventoryModel } from '../modules/inventory/models/inventory.model';
import { initProductionJobModel, associateProductionJobModel } from '../modules/production/models/productionJob.model';
import { initProductionTaskModel, associateProductionTaskModel } from '../modules/production/models/productionTask.model';
import { initSupplierModel, associateSupplierModel } from '../modules/procurement/models/supplier.model';
import { initPurchaseOrderModel, associatePurchaseOrderModel } from '../modules/procurement/models/purchaseOrder.model';
import { initPurchaseOrderItemModel, associatePurchaseOrderItemModel } from '../modules/procurement/models/purchaseOrderItem.model';
import { initOrderModel, associateOrderModel } from '../modules/orders/models/order.model';
import { initOrderItemModel, associateOrderItemModel } from '../modules/orders/models/orderItem.model';
import { initSaleModel, associateSaleModel } from '../modules/sales/models/sale.model';
import { initSaleItemModel, associateSaleItemModel } from '../modules/sales/models/saleItem.model';
import { initTenderModel, associateTenderModel } from '../modules/tender/models/tender.model';
import { initRefreshTokenModel, associateRefreshTokenModel } from '../modules/auth/models/refreshToken.model';

export const initDatabase = () => {
  const models = {
    User: initUserModel(sequelize),
    Role: initRoleModel(sequelize),
    Permission: initPermissionModel(sequelize),
    UserRole: initUserRoleModel(sequelize),
    RolePermission: initRolePermissionModel(sequelize),
    Employee: initEmployeeModel(sequelize),
    Team: initTeamModel(sequelize),
    TeamMember: initTeamMemberModel(sequelize),
    Product: initProductModel(sequelize),
    Inventory: initInventoryModel(sequelize),
    ProductionJob: initProductionJobModel(sequelize),
    ProductionTask: initProductionTaskModel(sequelize),
    Supplier: initSupplierModel(sequelize),
    PurchaseOrder: initPurchaseOrderModel(sequelize),
    PurchaseOrderItem: initPurchaseOrderItemModel(sequelize),
    Order: initOrderModel(sequelize),
    OrderItem: initOrderItemModel(sequelize),
    Sale: initSaleModel(sequelize),
    SaleItem: initSaleItemModel(sequelize),
    Tender: initTenderModel(sequelize),
    RefreshToken: initRefreshTokenModel(sequelize),
  };

  associateUserModel(models);
  associateRoleModel(models);
  associatePermissionModel(models);
  associateEmployeeModel(models);
  associateTeamModel(models);
  associateTeamMemberModel(models);
  associateProductModel(models);
  associateInventoryModel(models);
  associateProductionJobModel(models);
  associateProductionTaskModel(models);
  associateSupplierModel(models);
  associatePurchaseOrderModel(models);
  associatePurchaseOrderItemModel(models);
  associateOrderModel(models);
  associateOrderItemModel(models);
  associateSaleModel(models);
  associateSaleItemModel(models);
  associateTenderModel(models);
  associateRefreshTokenModel(models);

  return { sequelize, models };
};
