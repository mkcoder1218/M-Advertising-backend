import Joi from 'joi';

export const createSupplierSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(50).optional(),
    address: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const createPurchaseOrderSchema = Joi.object({
  body: Joi.object({
    supplierId: Joi.string().uuid().required(),
    poNumber: Joi.string().max(100).optional(),
    status: Joi.string().max(50).optional(),
    orderDate: Joi.date().optional(),
    expectedDate: Joi.date().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const createPurchaseOrderItemSchema = Joi.object({
  body: Joi.object({
    purchaseOrderId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().precision(2).required(),
    unitPrice: Joi.number().precision(2).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listSuppliersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().allow('').optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const listPurchaseOrdersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().allow('').optional(),
    status: Joi.string().max(50).optional(),
    supplierId: Joi.string().uuid().optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});
