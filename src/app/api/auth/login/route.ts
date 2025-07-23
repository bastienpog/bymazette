import type { NextRequest } from "next/server";
import type { LoginResponse } from "@/lib/types/api/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const POST = async (request: NextRequest): LoginResponse => {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.message }, { status: 400 });
    const existingUser = await prisma.administrator.findUnique({
      where: { email: result.data.email },
    });
    if (!existingUser || existingUser.password !== result.data.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    await createSession(existingUser.id);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(`Error @ POST /auth/login - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
