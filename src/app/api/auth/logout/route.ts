import type { NextRequest } from "next/server";
import type { LogoutResponse } from "@/lib/types/api/auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export const GET = async (_request: NextRequest): LogoutResponse => {
  try {
    await deleteSession();
    redirect("/");
  } catch (error) {
    console.error(`Error @ POST /auth/logout - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
