import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT ec.*, e.Nombre_Emp, c.Nombre_Car
      FROM TbEmpleadoCargo ec
      JOIN TbEmpleado e ON ec.Id_Empleado_EC = e.Id_Empleado
      JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


//POST - Crear una nueva relacion

export async function POST(request) {
  try {
    const data = await request.json();
    const { Id_Cargo_EC, Id_Empleado_EC, Fecha_Inicio_EC, Fecha_Fin_EC, Estado_EC } = data;

    // Validar los datos requeridos
    if (!Id_Cargo_EC || !Id_Empleado_EC || !Fecha_Inicio_EC || !Estado_EC) {
      return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 });
    }

    // Insertar en la tabla TbEmpleadoCargo
    const [result] = await pool.query(
      `INSERT INTO TbEmpleadoCargo (Id_Cargo_EC, Id_Empleado_EC, Fecha_Inicio_EC, Fecha_Fin_EC, Estado_EC)
       VALUES (?, ?, ?, ?, ?)`,
      [Id_Cargo_EC, Id_Empleado_EC, Fecha_Inicio_EC, Fecha_Fin_EC || null, Estado_EC]
    );

    return NextResponse.json({ message: 'Relación creada correctamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
