import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las dependencias
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.Id_Dependencia,
        d.Id_Area_Padre_Dep,
        d.Id_Area_Hijo_Dep,
        d.Fecha_Asignacion_Dep,
        d.Resolucion_Are_Dep,
        d.Estado_Dep,
        ap.Nombre_Are AS Nombre_Padre,
        ah.Nombre_Are AS Nombre_Hijo
      FROM TbDependencia d
      LEFT JOIN TbArea ap ON d.Id_Area_Padre_Dep = ap.Id_Area
      LEFT JOIN TbArea ah ON d.Id_Area_Hijo_Dep = ah.Id_Area
    `);

    return NextResponse.json(rows || []);
  } catch (error) {
    console.error('Error al obtener dependencias:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear una nueva dependencia
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Area_Padre_Dep,
      Id_Area_Hijo_Dep,
      Fecha_Asignacion_Dep,
      Resolucion_Are_Dep,
      Estado_Dep,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO TbDependencia (Id_Area_Padre_Dep, Id_Area_Hijo_Dep, Fecha_Asignacion_Dep, Resolucion_Are_Dep, Estado_Dep)
       VALUES (?, ?, ?, ?, ?)`,
      [
        Id_Area_Padre_Dep,
        Id_Area_Hijo_Dep,
        Fecha_Asignacion_Dep,
        Resolucion_Are_Dep,
        Estado_Dep,
      ]
    );

    const [newRecord] = await pool.query(
      'SELECT * FROM TbDependencia WHERE Id_Dependencia = ?',
      [result.insertId]
    );

    return NextResponse.json(newRecord[0]);
  } catch (error) {
    console.error('Error al crear dependencia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
