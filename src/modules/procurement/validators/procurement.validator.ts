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
    poNumber: Joi.string().max(100).required(),
    supplierId: Joi.string().uuid().required(),
    status: Joi.string().max(50).required(),
    orderDate: Joi.date().required(),
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