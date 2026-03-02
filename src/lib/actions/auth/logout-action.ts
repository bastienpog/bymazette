"use client";

import { ActionResult } from "@/lib/types/actions/action-result";

export const logoutAction = async (_prevState: unknown, _formData: FormData): ActionResult => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET",
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
