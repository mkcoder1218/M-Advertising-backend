import { Request, Response, NextFunction } from 'express';
import * as inventoryService from '../services/inventory.service';
import { Upload } from '../../uploads/models/upload.model';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await inventoryService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await inventoryService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const result = await inventoryService.listProducts(req.query);
    res.json({
      items: result.rows,
      total: result.count,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await inventoryService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await inventoryService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventory = await inventoryService.upsertInventory(req.params.productId, req.body);
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

export const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = (req as any).file;
    if (!file) return res.status(400).json({ message: 'File is required' });

    const upload = await Upload.create({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/${file.filename}`,
    });

    const product = await inventoryService.setProductImage(req.params.id, upload.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product, upload });
  } catch (err) {
    next(err);
  }
};
