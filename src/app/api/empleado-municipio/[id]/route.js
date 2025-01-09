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
      FDN_Emp,
      Estado_Emp
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


export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query('DELETE FROM TbEmpleado WHERE Id_Empleado = ?', [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el empleado: ' + error.message },
      { status: 500 }
    );
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

