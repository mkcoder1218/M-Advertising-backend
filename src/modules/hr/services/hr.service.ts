import { Employee } from '../models/employee.model';

export const createEmployee = async (data: any) => Employee.create(data);
export const listEmployees = async () => Employee.findAll();