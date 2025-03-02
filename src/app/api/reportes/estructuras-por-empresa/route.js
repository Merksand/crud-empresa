import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    if (!empresaId) {
      return NextResponse.json({ error: 'ID de empresa no proporcionado' }, { status: 400 });
    }

    // Obtener las estructuras para la empresa seleccionada
    const [estructuras] = await pool.query(`
      SELECT Id_Estructura as id, nombre, descripcion, nivel
      FROM TbEstructura
      WHERE empresaId = ?
      ORDER BY nivel ASC
    `, [empresaId]);

    return NextResponse.json(estructuras);
  } catch (error) {
    console.error('Error al obtener estructuras por empresa:', error);
    return NextResponse.json({ error: 'Error al obtener estructuras' }, { status: 500 });
  }
} 