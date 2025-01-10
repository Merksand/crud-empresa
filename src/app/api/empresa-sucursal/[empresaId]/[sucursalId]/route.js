import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { empresaId, sucursalId } = params;

    const [rows] = await pool.query(
      `SELECT es.*, e.Nombre_Emp AS Nombre_Empresa, s.Nombre_Suc AS Nombre_Sucursal
       FROM TbEmpresaSucursal es
       JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
       JOIN TbSucursal s ON es.Id_Sucursal_ES = s.Id_Sucursal
       WHERE es.Id_Empresa_ES = ? AND es.Id_Sucursal_ES = ?`,
      [empresaId, sucursalId]
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
    const { empresaId, sucursalId } = params;
    const data = await request.json();
    const { Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES } = data;

    if (!Fecha_Apertura_ES || !Estado_ES) {
      return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 });
    }

    const [result] = await pool.query(
      `UPDATE TbEmpresaSucursal
       SET Fecha_Apertura_ES = ?, Fecha_Cierre_ES = ?, Estado_ES = ?
       WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?`,
      [Fecha_Apertura_ES, Fecha_Cierre_ES || null, Estado_ES, empresaId, sucursalId]
    );

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
    const { empresaId, sucursalId } = params;

    const [result] = await pool.query(
      `DELETE FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?`,
      [empresaId, sucursalId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Relación no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
