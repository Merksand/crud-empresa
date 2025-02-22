import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener todos los ajustes activos con el nombre del producto
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        a.Id_Ajuste, 
        a.Id_Movimiento_Aju,
        m.Id_Producto_MoI,
        p.Nombre_Pro AS Nombre_Producto,
        a.Motivo_Aju, 
        a.FechaAju, 
        a.Estado_Aju
      FROM TbInv_Ajustes a
      JOIN TbInv_MovimientoInventario m ON a.Id_Movimiento_Aju = m.Id_MovimientoInventario
      JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
      WHERE a.Estado_Aju = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener los ajustes:', error);
    return NextResponse.json({ message: 'Error al obtener los ajustes', error }, { status: 500 });
  }
}

// POST - Crear un nuevo ajuste
export async function POST(req) {
  try {
    const { Id_Movimiento_Aju, Motivo_Aju, Estado_Aju = 'AC' } = await req.json();

    if (!Id_Movimiento_Aju || !Motivo_Aju) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    await poolInventario.query(
      'INSERT INTO TbInv_Ajustes (Id_Movimiento_Aju, Motivo_Aju, Estado_Aju) VALUES (?, ?, ?)',
      [Id_Movimiento_Aju, Motivo_Aju, Estado_Aju]
    );

    return NextResponse.json({ message: 'Ajuste creado correctamente' });
  } catch (error) {
    console.error('Error al crear ajuste:', error);
    return NextResponse.json({ message: 'Error al crear ajuste', error: error.message }, { status: 500 });
  }
}
