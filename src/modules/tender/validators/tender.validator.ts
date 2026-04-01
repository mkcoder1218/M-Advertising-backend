import Joi from 'joi';

export const createTenderSchema = Joi.object({
  body: Joi.object({
    tenderNumber: Joi.string().max(100).required(),
    title: Joi.string().max(255).required(),
    status: Joi.string().max(50).required(),
    issueDate: Joi.date().required(),
    dueDate: Joi.date().optional(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});