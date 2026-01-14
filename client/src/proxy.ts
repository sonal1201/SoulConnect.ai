import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token:", token);

  // Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

  // Logged in → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding", "/question", "/profile"],
};
