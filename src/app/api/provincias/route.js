import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const departamentoId = searchParams.get('departamento');

    if (!departamentoId) {
      return NextResponse.json({ error: 'ID del departamento requerido' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT Id_Provincia, Nombre_Pro FROM TbProvincia WHERE Id_Departamento_Pro = ?',
      [departamentoId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
