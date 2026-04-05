import Joi from 'joi';

export const createPermissionSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().max(100).required(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updatePermissionSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().max(100).optional(),
    description: Joi.string().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const getPermissionSchema = Joi.object({
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const listPermissionsSchema = Joi.object({
  query: Joi.object().optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});
