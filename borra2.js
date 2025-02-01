// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req) {
  const token = cookies().get('token');

  // Verifica si la cookie de sesión existe
  if (!token && !req.url.includes('/login')) {
    // Redirige al login si no está autenticado
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si está autenticado y accede al login, lo redirige al dashboard
  if (token && req.url.includes('/auth/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
