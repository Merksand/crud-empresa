import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las áreas
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpleadoCargo');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}