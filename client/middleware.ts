// middleware.js
import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(request) {
  const token = Cookies.get("token");
  const path = request.nextUrl.pathname;

  // Allow access to login and signup routes
  if (!token && path !== "/login" && path !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
