import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener todas las devoluciones activas con el nombre del producto
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        d.Id_Dev, 
        d.Id_Movimiento_Dev,
        m.Id_Producto_MoI,
        p.Nombre_Pro AS Nombre_Producto,
        d.Motivo_Dev, 
        d.Autorizacion_Dev, 
        d.Fecha_Dev, 
        d.Estado_Baj
      FROM TbInv_Devoluciones d
      JOIN TbInv_MovimientoInventario m ON d.Id_Movimiento_Dev = m.Id_MovimientoInventario
      JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
      WHERE d.Estado_Baj = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener las devoluciones:', error);
    return NextResponse.json({ message: 'Error al obtener las devoluciones', error }, { status: 500 });
  }
}

// POST - Crear una nueva devolución
export async function POST(req) {
  try {
    const { Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Estado_Dev = 'AC' } = await req.json();

    if (!Id_Movimiento_Dev || !Motivo_Dev || !Autorizacion_Dev) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

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
