import { NextResponse } from "next/server";
import { pool } from '../../../../lib/db';

// GET - Obtener un cargo específico usando el procedimiento almacenado
export async function GET(request, { params }) {
  try {
    // Llamar al procedimiento almacenado GetCargoById
    const [rows] = await pool.query('CALL GetCargoById(?)', [params.id]);

    if (rows[0].length === 0) {
      return NextResponse.json({ error: 'Cargo no encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0][0]); // Extraer el primer registro del resultado
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


///PUT - ACTUALIZAR CARGO
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { 
      Nombre_Car, 
      Nivel_Car, 
      Sueldo_Car, 
      Sueldo_USD_Car, 
      Resolucion_Car 
    } = data;

    const [result] = await pool.query(
      'CALL UpdateCargo(?, ?, ?, ?, ?, ?)',
      [params.id, Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Cargo no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cargo actualizado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// DELETE - Dar de baja un cargo
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
      'SELECT COUNT(*) AS count FROM TbEmpleadoCargo WHERE Id_Cargo_EC = ?',
      [id]
    );

    if (relaciones[0].count > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar el cargo porque tiene relaciones en EmpleadoCargo.' },
        { status: 400 }
      );
    }

    // Llamada al procedimiento almacenado para dar de baja el cargo
    const [result] = await pool.query('CALL DeleteCargo(?)', [id]);

    return NextResponse.json({ message: 'Cargo dado de baja correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al dar de baja el cargo: ' + error.message },
      { status: 500 }
    );
  }
}

