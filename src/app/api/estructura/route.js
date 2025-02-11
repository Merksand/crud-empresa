import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        e.Id_Estructura, 
        e.Resolucion_Est, 
        e.Estado_Est, 
        e.Fecha_Creacion_Est, 
        e.Id_Empresa, 
        emp.Nombre_Emp
      FROM 
        TbEstructura e
        LEFT JOIN TbEmpresa emp ON e.Id_Empresa = emp.Id_Empresa
      WHERE 
        e.Estado_Est = 'AC'
    `);

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
