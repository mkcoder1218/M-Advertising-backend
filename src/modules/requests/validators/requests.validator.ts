import Joi from 'joi';

export const createStockRequestSchema = Joi.object({
  body: Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().precision(2).positive().required(),
    notes: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listStockRequestsSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    status: Joi.string().optional(),
    targetRole: Joi.string().optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const updateStockRequestSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED').required(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});
