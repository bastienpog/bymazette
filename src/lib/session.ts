import { cookies } from "next/headers";
import { encrypt } from "@/lib/jwt";

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 604800000);
  const session = await encrypt({ userId, expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};
