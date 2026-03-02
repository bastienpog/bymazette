import type { Product } from "@prisma/client";
import type { NextResponse } from "next/server";

export type Params = {
  params: Promise<{ id: string }>;
};

export type GetAllProductsResponse = Promise<
  NextResponse<{
    products?: Product[];
    error?: string;
  }>
>;

export type GetProductByIdResponse = Promise<
  NextResponse<{
    product?: Product;
    error?: string;
  }>
>;

export type CreateProductResponse = Promise<
  NextResponse<{
    product?: Product;
    error?: string;
  }>
>;

export type UpdateProductResponse = Promise<
  NextResponse<{
    product?: Product;
    error?: string;
  }>
>;

export type DeleteProductResponse = Promise<
  NextResponse<{
    message?: string;
    error?: string;
  }>
>;
