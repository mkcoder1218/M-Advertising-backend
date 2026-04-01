import { User } from '../../users/models/user.model';
import { Role } from '../../roles/models/role.model';
import { RefreshToken } from '../models/refreshToken.model';
import { comparePassword } from '../../../utils/password.util';
import { signToken, verifyToken, expiresAtFrom } from '../../../utils/token.util';
import { jwtConfig } from '../../../config/jwt';

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email }, include: [Role] });
  if (!user) return null;

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return null;

  const token = signToken({ id: user.id }, jwtConfig.expiresIn);
  const refreshToken = signToken({ id: user.id }, jwtConfig.refreshExpiresIn);

  await RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: expiresAtFrom(jwtConfig.refreshExpiresIn),
  });

  return { user, token, refreshToken };
};

export const refresh = async (token: string) => {
  const stored = await RefreshToken.findOne({ where: { token } });
  if (!stored || stored.revokedAt) return null;

  if (stored.expiresAt && stored.expiresAt < new Date()) return null;

  const payload = verifyToken(token);
  const newToken = signToken({ id: payload.id }, jwtConfig.expiresIn);
  return { token: newToken };
};

export const logout = async (token: string) => {
  const stored = await RefreshToken.findOne({ where: { token } });
  if (!stored || stored.revokedAt) return false;
  await stored.update({ revokedAt: new Date() });
  return true;
};
