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