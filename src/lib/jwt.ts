import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (session?: string) => {
  if (!session) return null;
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload;
};
