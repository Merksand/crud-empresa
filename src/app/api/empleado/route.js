import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todos los empleados
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpleado');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}