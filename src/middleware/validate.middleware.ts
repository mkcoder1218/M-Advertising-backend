import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => (req: Request, _res: Response, next: NextFunction) => {
  const { error, value } = schema.validate({
    body: req.body,
    query: req.query,
    params: req.params,
  }, { abortEarly: false, stripUnknown: true });

  if (error) {
    (error as any).status = 400;
    return next(error);
  }

  req.body = value.body || {};
  req.query = value.query || {};
  req.params = value.params || {};
  return next();
};