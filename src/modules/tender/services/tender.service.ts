import { Tender } from '../models/tender.model';
import { Op } from 'sequelize';

const generateTenderNumber = () => `TN-${Date.now().toString().slice(-6)}`;

export const createTender = async (data: any) => {
  const payload = {
    ...data,
    tenderNumber: data.tenderNumber || generateTenderNumber(),
    issueDate: data.issueDate || new Date().toISOString().slice(0, 10),
    status: data.status || 'OPEN',
    approvalStatus: data.approvalStatus || 'PENDING_MANAGEMENT',
  };
  return Tender.create(payload);
};

export const listTenders = async (filters: any) => {
  const page = filters.page ? Number(filters.page) : 1;
  const limit = filters.limit ? Number(filters.limit) : 20;
  const offset = (page - 1) * limit;
  const search = filters.search ? String(filters.search).toLowerCase() : '';
  const where: any = {};

  if (filters.approvalStatus) where.approvalStatus = filters.approvalStatus;
  if (filters.status) where.status = filters.status;
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { clientName: { [Op.iLike]: `%${search}%` } },
      { tenderNumber: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Tender.findAndCountAll({
    where,
    order: [['issueDate', 'DESC']],
    limit,
    offset,
  });

  return { total: count, items: rows, page, limit };
};

export const updateTender = async (id: string, data: any) => {
  const item = await Tender.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
