import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // If user is not logged in, redirect to login
  if (!token && path !== "/login" && path !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and trying to access login/signup, redirect to home
  if (token && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
