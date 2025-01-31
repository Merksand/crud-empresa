// app/middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await request.cookies.get('token');  // Asegúrate de usar `await`

  // Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Si hay un token, permite el acceso a la ruta solicitada
  return NextResponse.next();
}

// Define las rutas que serán protegidas por el middleware
export const config = {
  matcher: ['/clientes/*', '/(dashboard)/*', '/otraRutaProtegida/*'], // Asegúrate de usar el formato correcto
};
