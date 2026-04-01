import Joi from 'joi';

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const refreshSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const logoutSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});
