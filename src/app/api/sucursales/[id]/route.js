import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Obtener una sucursal específica
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbSucursal WHERE Id_Sucursal = ?', [params.id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar una sucursal
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { 
      Id_Municipio_Suc, 
      Id_Geolocalizacion_Suc, 
      Nombre_Parametro_Suc, 
      Nombre_Suc, 
      Estado_Suc 
    } = data;

    const [result] = await pool.query(
      'UPDATE TbSucursal SET Id_Municipio_Suc = ?, Id_Geolocalizacion_Suc = ?, Nombre_Parametro_Suc = ?, Nombre_Suc = ?, Estado_Suc = ? WHERE Id_Sucursal = ?',
      [Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sucursal actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Eliminar una sucursal
export async function DELETE(request, { params }) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Primero eliminamos las referencias en la tabla de relación
    await connection.query(
      'DELETE FROM TbEmpresaSucursal WHERE Id_Sucursal = ?',
      [params.id]
    );

    // Luego eliminamos la sucursal
    const [result] = await connection.query(
      'DELETE FROM TbSucursal WHERE Id_Sucursal = ?',
      [params.id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return NextResponse.json(
        { error: 'Sucursal no encontrada' },
        { status: 404 }
      );
    }

    await connection.commit();
    return NextResponse.json({ message: 'Sucursal eliminada correctamente' });

  } catch (error) {
    await connection.rollback();
    return NextResponse.json(
      { error: 'Error al eliminar la sucursal: ' + error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
} 