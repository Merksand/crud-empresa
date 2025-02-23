import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

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
      Nombre_Suc 
    } = data;

    const [result] = await pool.query(
      'UPDATE TbSucursal SET Id_Municipio_Suc = ?, Id_Geolocalizacion_Suc = ?, Nombre_Parametro_Suc = ?, Nombre_Suc = ? WHERE Id_Sucursal = ?',
      [Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, params.id]
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
  try {
    const { id } = params; // ID de la sucursal a eliminar

    // Validar que el ID sea un número válido
    const sucursalId = parseInt(id);
    if (isNaN(sucursalId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Verificar si la sucursal está relacionada en otras tablas
    const [relaciones] = await pool.query(
      'SELECT COUNT(*) as count FROM TbEmpresaSucursal WHERE Id_Sucursal_ES = ?',
      [sucursalId]
    );

    if (relaciones[0].count > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar la sucursal porque tiene relaciones asociadas.' },
        { status: 400 }
      );
    }

    // Intentar eliminar la sucursal
    const [result] = await pool.query('UPDATE TbSucursal SET Estado_Suc = ? WHERE Id_Sucursal = ?',  ['BA',sucursalId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sucursal eliminada correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la sucursal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}