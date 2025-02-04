import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value; // Asegura que obtienes el valor del token correctamente

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  try {
    const secret = new TextEncoder().encode('secret'); // Usa una variable de entorno para la clave secreta
    await jwtVerify(token, secret); // No necesitas extraer payload si no lo usas
    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando JWT:", error);
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard"],
};
