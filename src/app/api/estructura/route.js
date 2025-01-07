import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET - Obtener todas las estructuras
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM TbEstructura");
    return NextResponse.json(rows || []);
  } catch (error) {
    console.error("Error al obtener estructuras:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

 
export async function POST(request) {
  try {
    const data = await request.json();

    const [result] = await pool.query(
      "INSERT INTO TbEstructura (Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est) VALUES (?, ?, ?, ?)",
      [
        data.Id_Empresa,
        data.Fecha_Creacion_Est,
        data.Resolucion_Est,
        data.Estado_Est,  
      ]
    );

    const [newRecord] = await pool.query(
      "SELECT * FROM TbEstructura WHERE Id_Estructura = LAST_INSERT_ID()"
    );

    return NextResponse.json(newRecord[0]);
  } catch (error) {
    console.error("Error al crear estructura:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
