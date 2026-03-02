import type { NextRequest } from "next/server";
import type { Params } from "@/lib/types/api/product";
import type { GetProductByIdResponse } from "@/lib/types/api/product";
import type { UpdateProductResponse } from "@/lib/types/api/product";
import type { DeleteProductResponse } from "@/lib/types/api/product";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/schemas/product-schema";

export const GET = async (_request: NextRequest, { params }: Params): GetProductByIdResponse => {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(`Error @ GET /api/product/${id} - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const UPDATE = async (request: NextRequest, { params }: Params): UpdateProductResponse => {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    const product = await prisma.product.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(`Error @ UPDATE /api/product/${id} - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (_request: NextRequest, { params }: Params): DeleteProductResponse => {
  const { id } = await params;
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(`Error @ DELETE /api/product/${id} - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
