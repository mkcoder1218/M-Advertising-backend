import { Tender } from '../models/tender.model';

export const createTender = async (data: any) => Tender.create(data);
export const listTenders = async () => Tender.findAll();