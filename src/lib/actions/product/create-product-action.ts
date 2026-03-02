"use client";

import type { ActionResult } from "@/lib/types/actions/action-result";

export const createProductAction = async (_prevState: unknown, formData: FormData): ActionResult => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.getAll("tags") as string[];
  const images = formData.getAll("images") as string[];
  const price = formData.get("price") as string;
  try {
    const response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, tags, images, price }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
