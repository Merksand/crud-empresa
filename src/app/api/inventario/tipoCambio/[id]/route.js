import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// DELETE - Dar de baja un tipo de cambio (eliminación lógica)
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      'UPDATE TbInv_TipoCambio SET Estado_TiC = "BA" WHERE Id_TipoCambio = ?',
      [id]
    );

    return NextResponse.json({ message: 'Tipo de cambio deshabilitado correctamente' });
  } catch (error) {
    console.error('Error al deshabilitar tipo de cambio:', error);
    return NextResponse.json({ message: 'Error al deshabilitar tipo de cambio', error }, { status: 500 });
  }
}

// GET - Obtener un tipo de cambio específico
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT 
        tc.Id_TipoCambio, 
        tc.Id_Moneda_TiC, 
        m.Codigo_Mon AS Codigo_Moneda,
        m.Nombre_Mon AS Nombre_Moneda,
        tc.Fecha_TiC, 
        tc.TasaCambio_TiC, 
        tc.Estado_TiC
      FROM TbInv_TipoCambio tc
      JOIN TbInv_Moneda m ON tc.Id_Moneda_TiC = m.Id_Moneda
      WHERE tc.Id_TipoCambio = ? AND tc.Estado_TiC = "AC"`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Tipo de cambio no encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener tipo de cambio:', error);
    return NextResponse.json({ message: 'Error al obtener tipo de cambio', error }, { status: 500 });
  }
}

// PUT - Actualizar un tipo de cambio
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC } = await req.json();

    if (!Id_Moneda_TiC || !Fecha_TiC || !TasaCambio_TiC) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    const [result] = await poolInventario.query(
      `UPDATE TbInv_TipoCambio 
       SET Id_Moneda_TiC = ?, Fecha_TiC = ?, TasaCambio_TiC = ? 
       WHERE Id_TipoCambio = ? AND Estado_TiC = 'AC'`,
      [Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Tipo de cambio no encontrado o deshabilitado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tipo de cambio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar tipo de cambio:', error);
    return NextResponse.json({ message: 'Error al actualizar tipo de cambio', error: error.message }, { status: 500 });
  }
}
