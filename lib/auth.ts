import "server-only";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { USER_ROLES, UserRoleType } from "@/constants/roles";
const key = new TextEncoder().encode(process.env.JWT_SECRET as string);

function getJwtExpiration(role: UserRoleType[number]): string {
  if (role === USER_ROLES.ADMIN) {
    return process.env.ADMIN_JWT_EXPIRES_IN ?? "2h";
  }
  return process.env.JWT_EXPIRES_IN ?? "24h";
}

function getSessionMaxAgeMs(role: UserRoleType[number]): number {
  if (role === USER_ROLES.ADMIN) {
    const hours = Number(process.env.ADMIN_SESSION_HOURS ?? 2);
    return hours * 60 * 60 * 1000;
  }

  const hours = Number(process.env.SESSION_MAX_AGE_HOURS ?? 24);
  return hours * 60 * 60 * 1000;
}

export async function encrypt(payload: { userId: string, name: string, role:  UserRoleType[number] }) {
  return await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime(getJwtExpiration(payload.role))
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}
export async function createSession(payload: { userId: string, name: string, role:  UserRoleType[number] }) {
  const expires = new Date(Date.now() + getSessionMaxAgeMs(payload.role));
  const session = await encrypt(payload);
  const cookie = await cookies();
  cookie.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });
  return session;
}
export type SessionUser = {
  userId: string;
  name: string;
  role:  UserRoleType[number];
};

export async function getSessionFromRequest(
  request: NextRequest
): Promise<SessionUser | null> {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;

  const parsed = (await decrypt(session)) as JWTPayload | null;
  if (!parsed?.userId || !parsed?.role) return null;

  return {
    userId: parsed.userId as string,
    name: parsed.name as string,
    role: parsed.role as  UserRoleType[number],
  };
}

export async function verifySession(): Promise<SessionUser | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  if (!parsed?.userId || !parsed?.role) return null;

  return {
    userId: parsed.userId as string,
    name: (parsed.name as string) ?? "",
    role: parsed.role as UserRoleType[number],
  };
}

export async function refreshSession(): Promise<SessionUser | null> {
  const current = await verifySession();
  if (!current) return null;

  await createSession(current);
  return current;
}
export async function updateCookies() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  const parsed = (await decrypt(session)) as JWTPayload;
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set("session", await encrypt(parsed as { userId: string, name: string, role:  UserRoleType[number] }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: parsed.expires as Date,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
export async function deleteSession() {
  const cookie = await cookies();
  cookie.delete("session");
  return NextResponse.next();
}
