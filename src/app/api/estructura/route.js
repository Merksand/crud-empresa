import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET - Obtener todas las estructuras
export async function GET() {
  try {
    // Llamada al procedimiento almacenado GetActiveEstructuras
    const [rows] = await pool.query("CALL GetActiveEstructuras()");
    return NextResponse.json(rows[0] || []); // Obtener el primer conjunto de resultados
  } catch (error) {
    console.error("Error al obtener estructuras activas:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}


export async function POST(request) {
  try {
    const data = await request.json();

    // Llamada al procedimiento almacenado InsertEstructura
    const [result] = await pool.query(
      "CALL InsertEstructura(?, ?, ?)",
      [
        data.Id_Empresa,
        data.Fecha_Creacion_Est,
        data.Resolucion_Est
      ]
    );

    // Obtener el registro recién creado
    const [newRecord] = await pool.query(
      "SELECT * FROM TbEstructura WHERE Id_Estructura = LAST_INSERT_ID()"
    );

    return NextResponse.json(newRecord[0]);
  } catch (error) {
    console.error("Error al crear estructura:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
