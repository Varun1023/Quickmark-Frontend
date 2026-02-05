import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token");
  const role = request.cookies.get("role");

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // If logged in, block auth pages
  if (isAuthPage && token) {
    if (role?.value === "student") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    if (role?.value === "faculty") {
      return NextResponse.redirect(new URL("/faculty/dashboard", request.url));
    }
  }

  // If NOT logged in, block protected pages
  if (!token && (pathname.startsWith("/student") || pathname.startsWith("/faculty"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based protection
  if (pathname.startsWith("/student") && role?.value !== "student") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/faculty") && role?.value !== "faculty") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/student/:path*", "/faculty/:path*"],
};
