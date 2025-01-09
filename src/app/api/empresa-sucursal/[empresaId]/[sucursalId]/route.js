import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// PUT - Actualizar una relación
// PUT - Actualizar una relación
export async function PUT(request, { params }) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const data = await request.json();
    const { 
      Id_Empresa_ES, 
      Id_Sucursal_ES, 
      Fecha_Apertura_ES, 
      Fecha_Cierre_ES, 
      Estado_ES 
    } = data;
    const { empresaId, sucursalId } = params;

    // Verificar si los IDs cambiaron
    if (Id_Empresa_ES === parseInt(empresaId) && Id_Sucursal_ES === parseInt(sucursalId)) {
      // Actualizar la relación sin eliminarla
      await connection.query(
        `UPDATE TbEmpresaSucursal 
         SET Fecha_Apertura_ES = ?, Fecha_Cierre_ES = ?, Estado_ES = ? 
         WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?`,
        [Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES, empresaId, sucursalId]
      );
    } else {
      // Validar duplicados
      const [existing] = await connection.query(
        'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?',
        [Id_Empresa_ES, Id_Sucursal_ES]
      );
      if (existing.length > 0) {
        throw new Error('Ya existe una relación con la empresa y sucursal seleccionadas');
      }

      // Eliminar la relación anterior
      await connection.query(
        'DELETE FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?',
        [empresaId, sucursalId]
      );

      // Insertar la nueva relación
      await connection.query(
        `INSERT INTO TbEmpresaSucursal 
         (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES) 
         VALUES (?, ?, ?, ?, ?)`,
        [Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES]
      );
    }

    await connection.commit();

    // Obtener los datos actualizados
    const [updated] = await connection.query(
      'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?',
      [Id_Empresa_ES, Id_Sucursal_ES]
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
      'DELETE FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?',
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

// GET - Obtener una relación específica o todas las relaciones
export async function GET(request, { params }) {
  try {
    const { empresaId, sucursalId } = params || {};

    let query = 'SELECT * FROM TbEmpresaSucursal';
    const queryParams = [];

    if (empresaId && sucursalId) {
      query += ' WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?';
      queryParams.push(empresaId, sucursalId);
    } else if (empresaId) {
      query += ' WHERE Id_Empresa_ES = ?';
      queryParams.push(empresaId);
    } else if (sucursalId) {
      query += ' WHERE Id_Sucursal_ES = ?';
      queryParams.push(sucursalId);
    }

    const [rows] = await pool.query(query, queryParams);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron relaciones' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error en GET TbEmpresaSucursal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
