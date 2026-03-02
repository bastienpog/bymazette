import type { NextRequest } from "next/server";
import type { LoginResponse } from "@/lib/types/api/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/schemas/login-schema";

export const POST = async (request: NextRequest): LoginResponse => {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    const existingUser = await prisma.administrator.findUnique({
      where: { email: parsed.data.email },
    });
    if (!existingUser || existingUser.password !== parsed.data.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    await createSession(existingUser.id);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(`Error @ POST /auth/login - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
