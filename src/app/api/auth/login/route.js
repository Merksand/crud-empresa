import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // Configura tu conexión a la base de datos

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validación de datos
    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Ejecuta el query correctamente relacionado al usuario y su contraseña
    const [rows] = await pool.query(
      `SELECT u.Id_Usuario, u.login_Usu, p.Password_Pas 
       FROM tbUsuario u 
       JOIN tbUsuarioPassword up ON u.Id_Usuario = up.Id_Usuario_UP 
       JOIN tbPassword p ON up.Id_Password_UP = p.Id_Password 
       WHERE u.login_Usu = ?`,
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const user = rows[0];
    const hashedPassword = user.Password_Pas;

    // Comparación de contraseñas sin usar bcrypt (texto plano)
    if (password !== hashedPassword) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Guardar sesión en cookie
    const sessionData = {
      userId: user.Id_Usuario,
      username: user.login_Usu,
    };

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso",
      session: sessionData,
    });

    // Agregar la cookie de sesión de forma asíncrona
    response.cookies.set("session", JSON.stringify(sessionData), {
      httpOnly: true, // Protege contra XSS
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "strict", // Evita ataques CSRF
    });

    return response;
  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
