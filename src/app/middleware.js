import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Middleware ejecutándose...");

    const token = req.cookies.has("session"); // Verifica si la cookie existe
    const { pathname } = req.nextUrl;

    console.log("Ruta actual:", pathname);
    console.log("Token presente:", token);

    // Redirigir si no hay token y no estamos en la página de login
    if (!token && pathname !== "/auth/login") {
        console.log("No hay sesión, redirigiendo al login");
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Redirigir si hay token y estamos en la página de login (ya autenticado)
    if (token && pathname === "/auth/login") {
        console.log("Usuario autenticado, redirigiendo al dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url)); // O usa /(dashboard) dependiendo de la estructura de la ruta
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/(dashboard)/:path*", "/clientes/:path*", "/auth/login"],
};
