import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  images: z.array(z.url()),
  price: z.number().int().nonnegative(),
});

export const updateProductSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.url()).optional(),
  price: z.number().int().nonnegative().optional(),
});
