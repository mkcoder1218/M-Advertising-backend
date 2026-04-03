import Joi from 'joi';

export const createUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().max(255).required(),
    phone: Joi.string().max(50).optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const updateUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).optional(),
    password: Joi.string().min(6).optional(),
    fullName: Joi.string().max(255).optional(),
    phone: Joi.string().max(50).optional(),
    isActive: Joi.boolean().optional(),
    attendanceLat: Joi.number().optional(),
    attendanceLng: Joi.number().optional(),
    attendanceRadiusM: Joi.number().integer().min(10).max(1000).optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const updateAttendanceLocationSchema = Joi.object({
  body: Joi.object({
    attendanceLat: Joi.number().required(),
    attendanceLng: Joi.number().required(),
    attendanceRadiusM: Joi.number().integer().min(10).max(1000).optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const getUserSchema = Joi.object({
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const listUsersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    isActive: Joi.boolean().optional(),
    search: Joi.string().allow('').optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});
