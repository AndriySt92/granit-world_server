import { ProductCategory } from "./";

export interface Product {
  title: string;
  category: ProductCategory;
}

export interface GetProductsOptions {
  page?: number;
  limit?: number;
}
