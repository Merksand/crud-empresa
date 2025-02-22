import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// DELETE - Dar de baja un ajuste (eliminación lógica)
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      'UPDATE TbInv_Ajustes SET Estado_Aju = "BA" WHERE Id_Ajuste = ?',
      [id]
    );

    return NextResponse.json({ message: 'Ajuste deshabilitado correctamente' });
  } catch (error) {
    console.error('Error al deshabilitar ajuste:', error);
    return NextResponse.json({ message: 'Error al deshabilitar ajuste', error }, { status: 500 });
  }
}

// GET - Obtener un ajuste específico con el nombre del producto
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT 
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
      WHERE a.Id_Ajuste = ? AND a.Estado_Aju = "AC"`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Ajuste no encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener ajuste:', error);
    return NextResponse.json({ message: 'Error al obtener ajuste', error }, { status: 500 });
  }
}

// PUT - Actualizar un ajuste específico
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { Id_Movimiento_Aju, Motivo_Aju, FechaAju } = await req.json();

    if (!Id_Movimiento_Aju || !Motivo_Aju || !FechaAju) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    const [result] = await poolInventario.query(
      `UPDATE TbInv_Ajustes 
       SET Id_Movimiento_Aju = ?, Motivo_Aju = ?, FechaAju = ?
       WHERE Id_Ajuste = ? AND Estado_Aju = 'AC'`,
      [Id_Movimiento_Aju, Motivo_Aju, FechaAju, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Ajuste no encontrado o deshabilitado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ajuste actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar ajuste:', error);
    return NextResponse.json({ message: 'Error al actualizar ajuste', error: error.message }, { status: 500 });
  }
}
