import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.Id_Almacen, 
        a.Id_Sucursal_Alm, 
        s.Nombre_Suc AS Nombre_Sucursal,
        a.Nombre_Alm, 
        a.Ubicacion_Alm, 
        a.Capacidad_maxima_Alm,
        a.Estado_Alm
      FROM TbInv_Almacen a
      JOIN TbInv_Sucursal s ON a.Id_Sucursal_Alm = s.Id_Sucursal
      WHERE a.Estado_Alm = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener almacenes:', error);
    return NextResponse.json({ message: 'Error al obtener almacenes', error }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, Estado_Alm = 'AC' } = await req.json();

    if (!Id_Sucursal_Alm || !Nombre_Alm || !Ubicacion_Alm) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO TbInv_Almacen (Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, Estado_Alm) VALUES (?, ?, ?, ?, ?)',
      [Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, Estado_Alm]
    );

    return NextResponse.json({ message: 'Almacén creado correctamente' });
  } catch (error) {
    console.error('Error al crear almacén:', error);
    return NextResponse.json({ message: 'Error al crear almacén', error: error.message }, { status: 500 });
  }
}
