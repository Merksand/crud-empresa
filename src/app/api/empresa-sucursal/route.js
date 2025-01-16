import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las relaciones
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT es.*, e.Nombre_Emp AS Nombre_Empresa, s.Nombre_Suc AS Nombre_Sucursal
      FROM TbEmpresaSucursal es
      JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
      JOIN TbSucursal s ON es.Id_Sucursal_ES = s.Id_Sucursal
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear una nueva relación
export async function POST(request) {
  try {
    const data = await request.json();
    const { Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES } = data;

    const [result] = await pool.query(
      `INSERT INTO TbEmpresaSucursal (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES)
       VALUES (?, ?, ?)`,
      [Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES]
    );

    return NextResponse.json({ message: 'Relación creada correctamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
