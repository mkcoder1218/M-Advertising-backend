export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Workshop Management API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string' },
          fullName: { type: 'string' },
          phone: { type: 'string', nullable: true },
          isActive: { type: 'boolean' },
        },
      },
      Role: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          sku: { type: 'string' },
          name: { type: 'string' },
          type: { type: 'string', enum: ['raw', 'finished'] },
          unit: { type: 'string' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          orderNumber: { type: 'string' },
          customerName: { type: 'string' },
          status: { type: 'string' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { '200': { description: 'OK' } },
      },
    },
    '/api/v1/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: { refreshToken: { type: 'string' } },
              },
            },
          },
        },
        responses: { '200': { description: 'OK' } },
      },
    },
    '/api/v1/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout (revoke refresh token)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: { refreshToken: { type: 'string' } },
              },
            },
          },
        },
        responses: { '204': { description: 'No Content' } },
      },
    },
    '/api/v1/users': {
      get: { tags: ['Users'], summary: 'List users', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Users'], summary: 'Create user', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/users/{id}': {
      get: { tags: ['Users'], summary: 'Get user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['Users'], summary: 'Update user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      delete: { tags: ['Users'], summary: 'Delete user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'No Content' } } },
    },
    '/api/v1/roles': {
      get: { tags: ['Roles'], summary: 'List roles', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Roles'], summary: 'Create role', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/roles/{id}': {
      get: { tags: ['Roles'], summary: 'Get role', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['Roles'], summary: 'Update role', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      delete: { tags: ['Roles'], summary: 'Delete role', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'No Content' } } },
    },
    '/api/v1/inventory/products': {
      get: { tags: ['Inventory'], summary: 'List products', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Inventory'], summary: 'Create product', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/inventory/products/{id}': {
      get: { tags: ['Inventory'], summary: 'Get product', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['Inventory'], summary: 'Update product', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      delete: { tags: ['Inventory'], summary: 'Delete product', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'No Content' } } },
    },
    '/api/v1/inventory/inventory/{productId}': {
      put: { tags: ['Inventory'], summary: 'Update inventory', parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/production/jobs': {
      get: { tags: ['Production'], summary: 'List jobs', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Production'], summary: 'Create job', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/production/jobs/{id}': {
      get: { tags: ['Production'], summary: 'Get job', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['Production'], summary: 'Update job', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      delete: { tags: ['Production'], summary: 'Delete job', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'No Content' } } },
    },
    '/api/v1/production/jobs/{jobId}/tasks': {
      get: { tags: ['Production'], summary: 'List tasks by job', parameters: [{ name: 'jobId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/production/tasks': {
      post: { tags: ['Production'], summary: 'Create task', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/teams': {
      get: { tags: ['Teams'], summary: 'List teams', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Teams'], summary: 'Create team', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/teams/{id}': {
      get: { tags: ['Teams'], summary: 'Get team', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['Teams'], summary: 'Update team', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
      delete: { tags: ['Teams'], summary: 'Delete team', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '204': { description: 'No Content' } } },
    },
    '/api/v1/teams/{teamId}/members': {
      get: { tags: ['Teams'], summary: 'List team members', parameters: [{ name: 'teamId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/teams/members': {
      post: { tags: ['Teams'], summary: 'Add team member', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/procurement/suppliers': {
      get: { tags: ['Procurement'], summary: 'List suppliers', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Procurement'], summary: 'Create supplier', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/procurement/purchase-orders': {
      get: { tags: ['Procurement'], summary: 'List purchase orders', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Procurement'], summary: 'Create purchase order', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/procurement/purchase-orders/{purchaseOrderId}/items': {
      get: { tags: ['Procurement'], summary: 'List purchase order items', parameters: [{ name: 'purchaseOrderId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/procurement/purchase-order-items': {
      post: { tags: ['Procurement'], summary: 'Create purchase order item', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/orders': {
      get: { tags: ['Orders'], summary: 'List orders', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Orders'], summary: 'Create order', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/orders/{orderId}/items': {
      get: { tags: ['Orders'], summary: 'List order items', parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/orders/items': {
      post: { tags: ['Orders'], summary: 'Create order item', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/sales': {
      get: { tags: ['Sales'], summary: 'List sales', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Sales'], summary: 'Create sale', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/sales/{saleId}/items': {
      get: { tags: ['Sales'], summary: 'List sale items', parameters: [{ name: 'saleId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
    },
    '/api/v1/sales/items': {
      post: { tags: ['Sales'], summary: 'Create sale item', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/tenders': {
      get: { tags: ['Tender'], summary: 'List tenders', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Tender'], summary: 'Create tender', responses: { '201': { description: 'Created' } } },
    },
    '/api/v1/hr': {
      get: { tags: ['HR'], summary: 'List employees', responses: { '200': { description: 'OK' } } },
      post: { tags: ['HR'], summary: 'Create employee', responses: { '201': { description: 'Created' } } },
    },
  },
};
