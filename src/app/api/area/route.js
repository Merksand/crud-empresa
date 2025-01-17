import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las áreas
export async function GET() {
  try {
    // Llamada al procedimiento almacenado GetActiveAreas
    const [rows] = await pool.query('CALL GetActiveAreas()');
    return NextResponse.json(rows[0]); // Obtener el primer conjunto de resultados
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
      Resolucion_Are
    } = data;

    // Llamada al procedimiento almacenado InsertArea
    const [result] = await pool.query(
      'CALL InsertArea(?, ?, ?, ?)',
      [Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are]
    );

    return NextResponse.json({ 
      message: 'Área creada correctamente',
      id: result[0][0].insertId 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
