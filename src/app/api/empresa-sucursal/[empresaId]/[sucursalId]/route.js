import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// PUT - Actualizar una relación
export async function PUT(request, { params }) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const data = await request.json();
    const { 
      Id_Empresa, 
      Id_Sucursal, 
      Fecha_Apertura_ES, 
      Fecha_Cierre_ES, 
      Estado_ES 
    } = data;
    const { empresaId, sucursalId } = params;

    // Verificar si ya existe una relación con los nuevos IDs
    if (Id_Empresa !== parseInt(empresaId) || Id_Sucursal !== parseInt(sucursalId)) {
      const [existing] = await connection.query(
        'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
        [Id_Empresa, Id_Sucursal]
      );

      if (existing.length > 0) {
        await connection.rollback();
        return NextResponse.json(
          { error: 'Ya existe una relación con la empresa y sucursal seleccionadas' },
          { status: 400 }
        );
      }
    }

    // Eliminar la relación anterior
    await connection.query(
      'DELETE FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
      [empresaId, sucursalId]
    );

    // Insertar la nueva relación
    const [result] = await connection.query(
      `INSERT INTO TbEmpresaSucursal 
       (Id_Empresa, Id_Sucursal, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES) 
       VALUES (?, ?, ?, ?, ?)`,
      [Id_Empresa, Id_Sucursal, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES]
    );

    await connection.commit();

    // Obtener los datos actualizados
    const [updated] = await connection.query(
      'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
      [Id_Empresa, Id_Sucursal]
    );

    return NextResponse.json({ 
      message: 'Relación actualizada correctamente',
      data: updated[0]
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar la relación' },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}

// DELETE - Eliminar una relación
export async function DELETE(request, { params }) {
  try {
    const { empresaId, sucursalId } = params;

    const [result] = await pool.query(
      'DELETE FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
      [empresaId, sucursalId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Relación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Obtener una relación específica
export async function GET(request, { params }) {
  try {
    const { empresaId, sucursalId } = params;

    const [rows] = await pool.query(
      'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
      [empresaId, sucursalId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Relación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 