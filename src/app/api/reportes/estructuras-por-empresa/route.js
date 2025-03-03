import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    if (!empresaId) {
      return NextResponse.json({ error: 'ID de empresa no proporcionado' }, { status: 400 });
    }

    // Consulta corregida con los nombres exactos de las columnas según la BD
    const [estructuras] = await pool.query(`
      SELECT Id_Estructura, Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est
      FROM TbEstructura
      WHERE Id_Empresa = ?
      ORDER BY Id_Estructura ASC
    `, [empresaId]);

    return NextResponse.json(estructuras);
  } catch (error) {
    console.error('Error al obtener estructuras por empresa:', error);
    return NextResponse.json({ error: 'Error al obtener estructuras' }, { status: 500 });
  }
} 