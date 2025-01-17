import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paisId = searchParams.get('pais');

    if (!paisId) {
      return NextResponse.json({ error: 'ID del país requerido' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT Id_Departamento, Nombre_Dep FROM TbDepartamento WHERE Id_Pais_Dep = ? order by Nombre_Dep',
      [paisId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
