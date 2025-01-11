import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { empleadoId, cargoId } = params;

    const [rows] = await pool.query(
      `SELECT ec.*, e.Nombre_Emp, c.Nombre_Car
       FROM TbEmpleadoCargo ec
       JOIN TbEmpleado e ON ec.Id_Empleado_EC = e.Id_Empleado
       JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
       WHERE ec.Id_Empleado_EC = ? AND ec.Id_Cargo_EC = ?`,
      [empleadoId, cargoId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Relación no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    const { empleadoId, cargoId } = params;
    const data = await request.json();
    const { Fecha_Inicio_EC, Fecha_Fin_EC, Estado_EC } = data;

    // Validar los datos requeridos
    if (!Fecha_Inicio_EC || !Estado_EC) {
      return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 });
    }

    // Actualizar el registro
    const [result] = await pool.query(
      `UPDATE TbEmpleadoCargo
       SET Fecha_Inicio_EC = ?, Fecha_Fin_EC = ?, Estado_EC = ?
       WHERE Id_Empleado_EC = ? AND Id_Cargo_EC = ?`,
      [Fecha_Inicio_EC, Fecha_Fin_EC || null, Estado_EC, empleadoId, cargoId]
    );

    // Verificar si el registro fue encontrado y actualizado
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Relación no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Relación actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const { empleadoId, cargoId } = params;

    const [result] = await pool.query(
      `DELETE FROM TbEmpleadoCargo WHERE Id_Empleado_EC = ? AND Id_Cargo_EC = ?`,
      [empleadoId, cargoId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Relación no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


