import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Obtener todas las empresas
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpresa');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nueva empresa
export async function POST(request) {
  try {
    const data = await request.json();
    const { Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp } = data;
    
    const [result] = await pool.query(
      'INSERT INTO TbEmpresa (Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp) VALUES (?, ?, ?, ?, ?, ?)',
      [Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp]
    );
    
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 