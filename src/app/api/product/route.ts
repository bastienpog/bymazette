import type { NextRequest } from "next/server";
import type { GetAllProductsResponse } from "@/lib/types/api/product";
import type { CreateProductResponse } from "@/lib/types/api/product";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/schemas/product-schema";

export const GET = async (_request: NextRequest): GetAllProductsResponse => {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(`Error @ GET /api/product - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest): CreateProductResponse => {
  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    const product = await prisma.product.create({ data: parsed.data });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error(`Error @ POST /api/product - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
