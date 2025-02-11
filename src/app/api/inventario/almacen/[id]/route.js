import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await pool.query(
      'UPDATE TbInv_Almacen SET Estado_Alm = "BA" WHERE Id_Almacen = ?',
      [id]
    );

    return NextResponse.json({ message: 'Almacén deshabilitado correctamente' });
  } catch (error) {
    console.error('Error al deshabilitar almacén:', error);
    return NextResponse.json({ message: 'Error al deshabilitar almacén', error }, { status: 500 });
  }
}


export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM TbInv_Almacen WHERE Id_Almacen = ? AND Estado_Alm = "AC"',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Almacén no encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener almacén:', error);
    return NextResponse.json({ message: 'Error al obtener almacén', error }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm } = await req.json();

    if (!Id_Sucursal_Alm || !Nombre_Alm || !Ubicacion_Alm) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    const [result] = await pool.query(
      `UPDATE TbInv_Almacen 
       SET Id_Sucursal_Alm = ?, Nombre_Alm = ?, Ubicacion_Alm = ?, Capacidad_maxima_Alm = ? 
       WHERE Id_Almacen = ? AND Estado_Alm = 'AC'`,
      [Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Almacén no encontrado o deshabilitado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Almacén actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar almacén:', error);
    return NextResponse.json({ message: 'Error al actualizar almacén', error: error.message }, { status: 500 });
  }
}
