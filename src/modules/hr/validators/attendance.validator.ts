import Joi from 'joi';

export const createAttendanceSchema = Joi.object({
  body: Joi.object({
    employeeId: Joi.string().uuid().required(),
    date: Joi.date().required(),
    status: Joi.string().valid('PRESENT', 'ABSENT', 'ON_LEAVE').required(),
    notes: Joi.string().optional(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

export const listAttendanceSchema = Joi.object({
  query: Joi.object({
    date: Joi.date().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
  }).optional(),
  params: Joi.object().optional(),
  body: Joi.object().optional(),
});

export const updateAttendanceSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('PRESENT', 'ABSENT', 'ON_LEAVE').required(),
    notes: Joi.string().optional(),
  }).required(),
  params: Joi.object({ id: Joi.string().uuid().required() }).required(),
  query: Joi.object().optional(),
});

export const markAttendanceSchema = Joi.object({
  body: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});
