import { Request, Response, NextFunction } from 'express';
import * as productionService from '../services/production.service';

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await productionService.createJob(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await productionService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const listJobs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await productionService.listJobs();
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await productionService.updateJob(req.params.id, req.body);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const removeJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await productionService.deleteJob(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await productionService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const listTasksByJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await productionService.listTasksByJob(req.params.jobId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};