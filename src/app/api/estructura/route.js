import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las estructuras
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEstructura');
    return NextResponse.json(rows || []);
  } catch (error) {
    console.error('Error al obtener estructuras:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 