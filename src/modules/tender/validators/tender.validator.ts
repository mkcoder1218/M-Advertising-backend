import Joi from 'joi';

export const createTenderSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(255).required(),
    clientName: Joi.string().max(255).required(),
    value: Joi.number().positive().required(),
    status: Joi.string().max(50).optional(),
    approvalStatus: Joi.string().max(50).optional(),
    assignedWorker: Joi.string().max(255).optional(),
    assignedBy: Joi.string().max(255).optional(),
    issueDate: Joi.date().optional(),
    dueDate: Joi.date().optional(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listTendersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().allow('').optional(),
    approvalStatus: Joi.string().max(50).optional(),
    status: Joi.string().max(50).optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const updateTenderSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(255).optional(),
    clientName: Joi.string().max(255).optional(),
    value: Joi.number().positive().optional(),
    status: Joi.string().max(50).optional(),
    approvalStatus: Joi.string().max(50).optional(),
    assignedWorker: Joi.string().max(255).optional(),
    assignedBy: Joi.string().max(255).optional(),
    dueDate: Joi.date().optional(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});
