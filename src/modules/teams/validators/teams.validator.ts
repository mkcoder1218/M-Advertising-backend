import Joi from 'joi';

export const createTeamSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(100).required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateTeamSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(100).optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const createTeamMemberSchema = Joi.object({
  body: Joi.object({
    teamId: Joi.string().uuid().required(),
    employeeId: Joi.string().uuid().required(),
    roleTitle: Joi.string().max(100).optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});