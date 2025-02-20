import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener todos los tipos de cambio activos
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        tc.Id_TipoCambio, 
        tc.Id_Moneda_TiC, 
        m.Codigo_Mon AS Codigo_Moneda,
        m.Nombre_Mon AS Nombre_Moneda,
        tc.Fecha_TiC, 
        tc.TasaCambio_TiC, 
        tc.Estado_TiC
      FROM TbInv_TipoCambio tc
      JOIN TbInv_Moneda m ON tc.Id_Moneda_TiC = m.Id_Moneda
      WHERE tc.Estado_TiC = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener los tipos de cambio:', error);
    return NextResponse.json({ message: 'Error al obtener los tipos de cambio', error }, { status: 500 });
  }
}

// POST - Crear un nuevo tipo de cambio
export async function POST(req) {
  try {
    const { Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC, Estado_TiC = 'AC' } = await req.json();

    if (!Id_Moneda_TiC || !Fecha_TiC || !TasaCambio_TiC) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    await poolInventario.query(
      'INSERT INTO TbInv_TipoCambio (Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC, Estado_TiC) VALUES (?, ?, ?, ?)',
      [Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC, Estado_TiC]
    );

    return NextResponse.json({ message: 'Tipo de cambio creado correctamente' });
  } catch (error) {
    console.error('Error al crear tipo de cambio:', error);
    return NextResponse.json({ message: 'Error al crear tipo de cambio', error: error.message }, { status: 500 });
  }
}
