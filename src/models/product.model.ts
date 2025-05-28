import mongoose from "mongoose";

import { ProductCategory } from "../types";

const productCategoryValues = Object.values(ProductCategory);

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [6, "Title must be at least 6 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  category: { type: String, enum: productCategoryValues, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
