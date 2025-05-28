import cloudinary from "../config/cloudinary";
import { CreateProductData } from "../dto";
import Product from "../models/product.model";
import { GetProductsOptions } from "../types";
import { CustomError, uploadImage } from "../utils";

const createProduct = async (data: CreateProductData, imageFile?: Express.Multer.File) => {
  if (!imageFile) throw new CustomError("Image is required", 400);

  const imageUrl = await uploadImage(imageFile);
  const product = await Product.create({ ...data, imageUrl });

  return product;
};

const getAllProducts = async (options: GetProductsOptions) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find().sort("-createdAt").skip(skip).limit(limit),
    Product.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) throw new Error("Product not found");

  // Delete image from Cloudinary
  const publicId = `products/${product.imageUrl.split("/").pop()?.split(".")[0]}`;

  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  await product.deleteOne();
};

const updateProduct = async (
  productId: string,
  updates: Partial<CreateProductData> & { imageUrl?: string },
  imageFile?: Express.Multer.File,
) => {
  const product = await Product.findById(productId);
  if (!product) throw new CustomError("Product not found", 404);

  if (imageFile) {
    // Delete old image
    const publicId = `products/${product.imageUrl.split("/").pop()?.split(".")[0]}`;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new image
    const imageUrl = await uploadImage(imageFile);
    updates.imageUrl = imageUrl;
  }

  Object.assign(product, updates);
  await product.save();

  return product;
};

export default {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
