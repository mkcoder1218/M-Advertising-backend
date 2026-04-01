import { ProductionJob } from '../models/productionJob.model';
import { ProductionTask } from '../models/productionTask.model';

export const createJob = async (data: any) => ProductionJob.create(data);
export const getJobById = async (id: string) => ProductionJob.findByPk(id);
export const listJobs = async () => ProductionJob.findAll();
export const updateJob = async (id: string, data: any) => {
  const job = await ProductionJob.findByPk(id);
  if (!job) return null;
  return job.update(data);
};
export const deleteJob = async (id: string) => {
  const job = await ProductionJob.findByPk(id);
  if (!job) return null;
  await job.destroy();
  return job;
};

export const createTask = async (data: any) => ProductionTask.create(data);
export const listTasksByJob = async (jobId: string) => ProductionTask.findAll({ where: { productionJobId: jobId } });