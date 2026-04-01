import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const signToken = (payload: object, expiresIn: string) => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.secret) as { id: string };
};

export const expiresAtFrom = (duration: string) => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const value = Number(match[1]);
  const unit = match[2];
  const multipliers: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return new Date(Date.now() + value * multipliers[unit]);
};