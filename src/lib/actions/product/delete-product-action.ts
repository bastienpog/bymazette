"use client";

import type { ActionResult } from "@/lib/types/actions/action-result";

export const updateProductAction = async (_prevState: unknown, formData: FormData): ActionResult => {
  const id = formData.get("id") as string;
  try {
    const response = await fetch(`http://localhost:3000/api/product/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Something went wrong." };
  }
};
