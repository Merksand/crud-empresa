import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

        // Usuario y hash de la base de datos
        const user = rows[0];
        const hashedPassword = user.Password_Pas;

        // Comparación de contraseñas
        const isValidPassword = bcrypt.compareSync(password, hashedPassword);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Contraseña incorrecta" },
                { status: 401 }
            );
        }

        // Generación de datos de sesión o token
        const sessionData = {
            userId: user.Id_Usuario,
            username: user.login_Usu,
        };

        return NextResponse.json({
            message: "Inicio de sesión exitoso",
            session: sessionData,
        });
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
