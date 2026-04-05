import Joi from 'joi';

export const createOrderSchema = Joi.object({
  body: Joi.object({
    orderNumber: Joi.string().max(100).optional(),
    customerName: Joi.string().max(255).required(),
    customerContact: Joi.string().max(255).optional(),
    status: Joi.string().max(50).required(),
    orderDate: Joi.date().required(),
    approvalStatus: Joi.string().max(50).optional(),
    assignedWorker: Joi.string().max(255).optional(),
    assignedWorkerId: Joi.string().uuid().optional(),
    assignedDesignerId: Joi.string().uuid().optional(),
    acceptedById: Joi.string().uuid().optional(),
    needsDesign: Joi.boolean().optional(),
    fileAvailable: Joi.boolean().optional(),
    total: Joi.number().precision(2).optional(),
    itemsCount: Joi.number().integer().optional(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().precision(2).required(),
        unitPrice: Joi.number().precision(2).required(),
        workTypeId: Joi.string().uuid().optional(),
      })
    ).optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listOrdersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().max(100).optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const createOrderItemSchema = Joi.object({
  body: Joi.object({
    orderId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().precision(2).required(),
    unitPrice: Joi.number().precision(2).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateOrderItemsSchema = Joi.object({
  body: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().uuid().required(),
          quantity: Joi.number().precision(2).required(),
          unitPrice: Joi.number().precision(2).required(),
          workTypeId: Joi.string().uuid().optional(),
        })
      )
      .required(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const updateOrderSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().max(50).optional(),
    approvalStatus: Joi.string().valid(
      'AWAITING_RECEPTION',
      'SENT_TO_DESIGNER',
      'SENT_TO_WORKER',
      'WORKER_ACCEPTED',
      'WORK_IN_PROGRESS',
      'WORK_COMPLETED',
      'WORKER_REJECTED'
    ).optional(),
    assignedWorker: Joi.string().max(255).optional(),
    assignedWorkerId: Joi.string().uuid().optional(),
    assignedDesignerId: Joi.string().uuid().optional(),
    acceptedById: Joi.string().uuid().optional(),
    needsDesign: Joi.boolean().optional(),
    fileAvailable: Joi.boolean().optional(),
    total: Joi.number().precision(2).optional(),
    itemsCount: Joi.number().integer().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const addMessageSchema = Joi.object({
  body: Joi.object({
    sender: Joi.string().max(255).required(),
    role: Joi.string().max(50).required(),
    text: Joi.string().required(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});
