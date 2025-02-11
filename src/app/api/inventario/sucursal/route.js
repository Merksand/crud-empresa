import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';


export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.Id_Sucursal, 
        s.Id_Empresa_Suc, 
        s.Nombre_Parametro_Suc, 
        s.Nombre_Suc,
        s.Estado_Suc,
        e.Nombre_Emp AS Nombre_Empresa
      FROM TbInv_Sucursal s
      JOIN TbEmpresaSucursal es ON s.Id_Empresa_Suc = es.Id_Empresa_Sucursal
      JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
      WHERE s.Estado_Suc = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener sucursales', error }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc = 'AC' } = await req.json();

    if (!Id_Empresa_Suc || !Nombre_Parametro_Suc || !Nombre_Suc) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO TbInv_Sucursal (Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc) VALUES (?, ?, ?, ?)',
      [Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc]
    );

    return NextResponse.json({ message: 'Sucursal creada correctamente' });
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    return NextResponse.json({ message: 'Error al crear sucursal', error: error.message }, { status: 500 });
  }
}