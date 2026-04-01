import Joi from 'joi';

export const createRoleSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateRoleSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(100).optional(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const getRoleSchema = Joi.object({
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const listRolesSchema = Joi.object({
  query: Joi.object().optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});