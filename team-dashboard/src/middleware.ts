import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/forgot-password";

  // Get the token from cookies
  const token = request.cookies.get('team_auth')?.value;

  // If the path requires authentication and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and tries to access login page, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specify the paths that should trigger this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/forgot-password"],
};
