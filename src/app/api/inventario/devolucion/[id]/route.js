import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// DELETE - Dar de baja una devolución (eliminación lógica)
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      'UPDATE TbInv_Devoluciones SET Estado_Dev = "BA" WHERE Id_Dev = ?',
      [id]
    );

    return NextResponse.json({ message: 'Devolución deshabilitada correctamente' });
  } catch (error) {
    console.error('Error al deshabilitar devolución:', error);
    return NextResponse.json({ message: 'Error al deshabilitar devolución', error }, { status: 500 });
  }
}

// GET - Obtener una devolución específica con el nombre del producto
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT 
        d.Id_Dev, 
        d.Id_Movimiento_Dev,
        m.Id_Producto_MoI,
        p.Nombre_Pro AS Nombre_Producto,
        d.Motivo_Dev, 
        d.Autorizacion_Dev, 
        d.Fecha_Dev, 
        d.Estado_Dev
      FROM TbInv_Devoluciones d
      JOIN TbInv_MovimientoInventario m ON d.Id_Movimiento_Dev = m.Id_MovimientoInventario
      JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
      WHERE d.Id_Dev = ? AND d.Estado_Dev = "AC"`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Devolución no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener devolución:', error);
    return NextResponse.json({ message: 'Error al obtener devolución', error }, { status: 500 });
  }
}

// PUT - Actualizar una devolución específica
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev } = await req.json();

    if (!Id_Movimiento_Dev || !Motivo_Dev || !Autorizacion_Dev) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    const [result] = await poolInventario.query(
      `UPDATE TbInv_Devoluciones 
       SET Id_Movimiento_Dev = ?, Motivo_Dev = ?, Autorizacion_Dev = ? 
       WHERE Id_Dev = ? AND Estado_Dev = 'AC'`,
      [Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Devolución no encontrada o deshabilitada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Devolución actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar devolución:', error);
    return NextResponse.json({ message: 'Error al actualizar devolución', error: error.message }, { status: 500 });
  }
}
