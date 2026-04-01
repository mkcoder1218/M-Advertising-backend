import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.roles) {
      return next({ statusCode: 403, message: 'Forbidden' });
    }
    const allowed = roles.some(r => user.roles.includes(r));
    if (!allowed) return next({ statusCode: 403, message: 'Forbidden' });
    return next();
  };
};

export const authorizePermissions = (...permissions: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.permissions) {
      return next({ statusCode: 403, message: 'Forbidden' });
    }
    const allowed = permissions.some(p => user.permissions.includes(p));
    if (!allowed) return next({ statusCode: 403, message: 'Forbidden' });
    return next();
  };
};