import Joi from 'joi';

export const createSaleSchema = Joi.object({
  body: Joi.object({
    saleNumber: Joi.string().max(100).required(),
    orderId: Joi.string().uuid().optional(),
    saleDate: Joi.date().required(),
    status: Joi.string().max(50).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const createSaleItemSchema = Joi.object({
  body: Joi.object({
    saleId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().precision(2).required(),
    unitPrice: Joi.number().precision(2).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});