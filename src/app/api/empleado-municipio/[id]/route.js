import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// PUT - Actualizar un empleado
export async function PUT(request, { params }) {
  try {
    // Leer datos enviados en la solicitud
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
      FDN_Emp
    } = data;

    // Realizar la consulta de actualización
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
           FDN_Emp = ?
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
        params.id
      ]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    // Manejar errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpleado WHERE Id_Empleado = ?', [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/// DELETE - Marcar empleado como "Inactivo" en lugar de eliminarlo
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar si el empleado tiene relaciones en TbEmpleadoCargo
    const [relaciones] = await pool.query(
      'SELECT COUNT(*) AS count FROM TbEmpleadoCargo WHERE Id_Empleado_EC = ?',
      [id]
    );

    if (relaciones[0].count > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar el empleado porque tiene relaciones en EmpleadoCargo.' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'UPDATE TbEmpleado SET Estado_Emp = "BA" WHERE Id_Empleado = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Empleado marcado como Inactivo correctamente' });
  } catch (error) {
    console.error('Error en DELETE /api/empleados/[id]:', error);
    return NextResponse.json(
      { error: 'Error al marcar como inactivo el empleado: ' + error.message },
      { status: 500 }
    );
  }
}
