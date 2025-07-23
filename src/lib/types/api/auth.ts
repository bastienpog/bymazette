import type { NextResponse } from "next/server";

export type LoginResponse = Promise<
  NextResponse<{
    message?: string;
    error?: string;
  }>
>;

export type LogoutResponse = Promise<
  NextResponse<{
    message?: string;
    error?: string;
  }>
>;
