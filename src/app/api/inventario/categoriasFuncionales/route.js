import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await poolInventario.query('SELECT * FROM TbInv_Categoria WHERE Estado_Cat = "AC" AND Id_Categoria_Padre_Cat IS NOT NULL');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 });
  }
}