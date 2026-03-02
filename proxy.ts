import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "better-auth/types";

export default async function authMiddleware(request: NextRequest) {
  // 1. Check if the user has a session by calling the Better Auth internal API
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        // We must pass the cookies from the request so Better Auth can verify the token
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // 2. Protect the /admin route
  // If no session exists and the user is trying to access /admin, redirect to sign-in
  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 3. Optional: Prevent logged-in users from seeing sign-in/sign-up pages
  if (
    session &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher allows you to filter which routes this middleware runs on
  // We exclude static files, images, and Next.js internals for performance
  matcher: ["/admin/:path*", "/sign-in", "/sign-up"],
};
