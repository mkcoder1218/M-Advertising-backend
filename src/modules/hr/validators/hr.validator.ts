import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().optional(),
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(50).optional(),
    position: Joi.string().max(100).optional(),
    hireDate: Joi.date().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listEmployeesSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().max(100).optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});
