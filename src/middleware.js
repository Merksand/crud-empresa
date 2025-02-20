import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  try {
    const secret = new TextEncoder().encode('secret');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando JWT:", error);
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ]
};
