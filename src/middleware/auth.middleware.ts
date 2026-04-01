import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.util';
import { User } from '../modules/users/models/user.model';
import { Role } from '../modules/roles/models/role.model';
import { Permission } from '../modules/roles/models/permission.model';

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return next({ statusCode: 401, message: 'Missing token' });
    }
    const token = auth.split(' ')[1];
    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [{ model: Permission, through: { attributes: [] } }],
        },
      ],
    });

    if (!user) return next({ statusCode: 401, message: 'Invalid token' });

    const roles = (user as any).Roles?.map((r: any) => r.name) || [];
    const permissions = (user as any).Roles?.flatMap((r: any) => r.Permissions?.map((p: any) => p.code) || []) || [];

    (req as any).user = { id: user.id, roles, permissions };
    return next();
  } catch (err) {
    return next({ statusCode: 401, message: 'Invalid token' });
  }
};