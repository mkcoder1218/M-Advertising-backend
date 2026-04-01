import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    if (!result) return res.status(401).json({ message: 'Invalid credentials' });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    if (!result) return res.status(401).json({ message: 'Invalid refresh token' });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ok = await authService.logout(req.body.refreshToken);
    if (!ok) return res.status(400).json({ message: 'Invalid refresh token' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
