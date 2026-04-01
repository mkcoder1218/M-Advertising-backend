import Joi from 'joi';

export const createJobSchema = Joi.object({
  body: Joi.object({
    jobNumber: Joi.string().max(100).required(),
    teamId: Joi.string().uuid().required(),
    status: Joi.string().max(50).required(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    notes: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateJobSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().max(50).optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    notes: Joi.string().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const createTaskSchema = Joi.object({
  body: Joi.object({
    productionJobId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().precision(2).required(),
    status: Joi.string().max(50).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});