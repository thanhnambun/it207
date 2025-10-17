import { Category } from "./category.interface";

export interface ProductImage {
  id: number;
  url: string;
  publicId: string;
}

export interface Product {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: string;
  description: string;
  category: Category;
  createdAt: string;
  images: ProductImage[];
}
