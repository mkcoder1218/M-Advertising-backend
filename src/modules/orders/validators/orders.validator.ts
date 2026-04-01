import Joi from 'joi';

export const createOrderSchema = Joi.object({
  body: Joi.object({
    orderNumber: Joi.string().max(100).required(),
    customerName: Joi.string().max(255).required(),
    customerContact: Joi.string().max(255).optional(),
    status: Joi.string().max(50).required(),
    orderDate: Joi.date().required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
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