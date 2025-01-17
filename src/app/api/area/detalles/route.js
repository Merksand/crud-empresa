import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.Id_Area, 
        a.Id_Estructura_Ar, 
        a.Fecha_Creacion_Ar, 
        a.Nombre_Are, 
        a.Resolucion_Are, 
        a.Estado_Are, 
        a.Nivel_Are, -- Nueva columna
        e.Id_Estructura,
        e.Resolucion_Est
      FROM 
        TbArea a
        JOIN TbEstructura e ON a.Id_Estructura_Ar = e.Id_Estructura;
    `);

    return NextResponse.json(rows || []);
  } catch (error) {
    console.error("Error al obtener áreas con detalles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
