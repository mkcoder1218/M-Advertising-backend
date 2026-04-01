import Joi from 'joi';

export const createProductSchema = Joi.object({
  body: Joi.object({
    sku: Joi.string().max(100).required(),
    name: Joi.string().max(255).required(),
    type: Joi.string().valid('raw', 'finished').required(),
    unit: Joi.string().max(50).required(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateProductSchema = Joi.object({
  body: Joi.object({
    sku: Joi.string().max(100).optional(),
    name: Joi.string().max(255).optional(),
    type: Joi.string().valid('raw', 'finished').optional(),
    unit: Joi.string().max(50).optional(),
    description: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const getProductSchema = Joi.object({
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const listProductsSchema = Joi.object({
  query: Joi.object({ type: Joi.string().valid('raw', 'finished').optional() }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const updateInventorySchema = Joi.object({
  body: Joi.object({
    quantity: Joi.number().precision(2).required(),
    location: Joi.string().max(100).optional(),
    reorderLevel: Joi.number().precision(2).optional(),
  }).required(),
  params: Joi.object({ productId: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});