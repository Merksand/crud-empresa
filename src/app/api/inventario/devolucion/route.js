import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// Método GET: Obtener todas las devoluciones con el nombre del movimiento relacionado
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        d.Id_Dev, 
        d.Id_Movimiento_Dev, 
        m.Nombre_Movimiento AS Nombre_Movimiento,
        d.Motivo_Dev, 
        d.Autorizacion_Dev, 
        d.Fecha_Dev, 
        d.Estado_Dev
      FROM TbInv_Devoluciones d
      JOIN TbInv_MovimientoInventario m ON d.Id_Movimiento_Dev = m.Id_MovimientoInventario
      WHERE d.Estado_Dev = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener devoluciones:', error);
    return NextResponse.json({ message: 'Error al obtener devoluciones', error }, { status: 500 });
  }
}

// Método POST: Insertar una nueva devolución
export async function POST(req) {
  try {
    const { Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Estado_Dev = 'AC' } = await req.json();

    // Validación de campos obligatorios
    if (!Id_Movimiento_Dev || !Motivo_Dev || !Autorizacion_Dev) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    // Inserción en la base de datos
    await poolInventario.query(
      'INSERT INTO TbInv_Devoluciones (Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Estado_Dev) VALUES (?, ?, ?, ?)',
      [Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Estado_Dev]
    );

    return NextResponse.json({ message: 'Devolución creada correctamente' });
  } catch (error) {
    console.error('Error al crear devolución:', error);
    return NextResponse.json({ message: 'Error al crear devolución', error: error.message }, { status: 500 });
  }
}
