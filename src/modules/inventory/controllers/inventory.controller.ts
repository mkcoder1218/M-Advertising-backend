import { Request, Response, NextFunction } from 'express';
import * as inventoryService from '../services/inventory.service';

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
    const products = await inventoryService.listProducts(req.query);
    res.json(products);
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