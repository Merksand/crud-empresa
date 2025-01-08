import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// PUT - Actualizar empleado
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const {
      Id_Municipio_Emp,
      CI_Emp,
      Nombre_Emp,
      Paterno_Emp,
      Materno_Emp,
      Sexo_Emp,
      Direccion_Emp,
      Estado_Civil_Emp,
      FDN_Emp,
      Estado_Emp,
    } = data;
    const { empleadoId } = params;

    // Verificar si existe el empleado
    const [existing] = await pool.query(
      'SELECT * FROM TbEmpleado WHERE Id_Empleado = ?',
      [empleadoId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    const [result] = await pool.query(
      `UPDATE TbEmpleado 
       SET Id_Municipio_Emp = ?, 
           CI_Emp = ?, 
           Nombre_Emp = ?, 
           Paterno_Emp = ?, 
           Materno_Emp = ?, 
           Sexo_Emp = ?, 
           Direccion_Emp = ?, 
           Estado_Civil_Emp = ?, 
           FDN_Emp = ?, 
           Estado_Emp = ?
       WHERE Id_Empleado = ?`,
      [
        Id_Municipio_Emp,
        CI_Emp,
        Nombre_Emp,
        Paterno_Emp,
        Materno_Emp,
        Sexo_Emp,
        Direccion_Emp,
        Estado_Civil_Emp,
        FDN_Emp,
        Estado_Emp,
        empleadoId,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se pudo actualizar el empleado' },
        { status: 400 }
      );
    }

    // Obtener los datos actualizados
    const [updated] = await pool.query(
      'SELECT * FROM TbEmpleado WHERE Id_Empleado = ?',
      [empleadoId]
    );

    return NextResponse.json({
      message: 'Empleado actualizado correctamente',
      data: updated[0],
    });
  } catch (error) {
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el empleado' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar empleado
export async function DELETE(request, { params }) {
  try {
    const { empleadoId } = params;

    const [result] = await pool.query(
      'DELETE FROM TbEmpleado WHERE Id_Empleado = ?',
      [empleadoId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminación:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar el empleado' },
      { status: 500 }
    );
  }
}

// GET - Obtener información específica del empleado
export async function GET(request, { params }) {
  try {
    const { empleadoId } = params;

    const [rows] = await pool.query(
      'SELECT * FROM TbEmpleado WHERE Id_Empleado = ?',
      [empleadoId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener el empleado' },
      { status: 500 }
    );
  }
}
