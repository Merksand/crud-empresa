import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.*, 
        e.Resolucion_Est, 
        em.Nombre_Emp 
      FROM 
        TbArea a
        JOIN TbEstructura e ON a.Id_Estructura_Ar = e.Id_Estructura
        JOIN TbEmpresa em ON e.Id_Empresa = em.Id_Empresa;
    `);
    return NextResponse.json(rows || []);
  } catch (error) {
    console.error("Error al obtener áreas con detalles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
