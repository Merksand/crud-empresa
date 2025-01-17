import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las áreas
export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT Id_Area, Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, Nivel_Are FROM TbArea'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nueva área
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Estructura_Ar,
      Fecha_Creacion_Ar,
      Nombre_Are,
      Resolucion_Are,
      Estado_Are = 'Activo', // Valor predeterminado para Estado_Are
      Nivel_Are,
    } = data;

    const [result] = await pool.query(
      'INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, Nivel_Are) VALUES (?, ?, ?, ?, ?, ?)',
      [Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, Nivel_Are]
    );

    return NextResponse.json({
      message: 'Área creada correctamente',
      id: result.insertId,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
