"use client";

import type { ActionResult } from "@/lib/types/actions/action-result";

export const loginAction = async (_prevState: unknown, formData: FormData): ActionResult => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
