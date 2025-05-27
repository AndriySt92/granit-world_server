import { Request, Response } from "express";

import { CreateProductData } from "../dto";
import ProductService from "../services/product.service";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { title, category }: CreateProductData = req.body;
  const image = req.file;

  const product = await ProductService.createProduct({ title, category }, image);
  res.status(201).json({ status: "success", data: product });
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const { products, pagination } = await ProductService.getAllProducts({
    page,
    limit,
  });

  res.json({
    status: "success",
    data: products,
    pagination,
  });
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  await ProductService.deleteProduct(productId);
  res.json({ status: "success", message: "Product deleted" });
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const updates = req.body;
  const image = req.file;

  const updatedProduct = await ProductService.updateProduct(productId, updates, image);

  res.json({ status: "success", data: updatedProduct });
};

export default {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
