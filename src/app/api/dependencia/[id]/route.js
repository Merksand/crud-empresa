import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener una dependencia específica
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(
      `SELECT 
        d.Id_Dependencia,
        d.Id_Area_Padre_Dep,
        d.Id_Area_Hijo_Dep,
        d.Fecha_Asignacion_Dep,
        d.Resolucion_Are_Dep,
        d.Estado_Dep,
        ap.Nombre_Are AS Nombre_Padre,
        ah.Nombre_Are AS Nombre_Hijo;
       FROM TbDependencia d
       LEFT JOIN TbArea ap ON d.Id_Area_Padre_Dep = ap.Id_Area
       LEFT JOIN TbArea ah ON d.Id_Area_Hijo_Dep = ah.Id_Area
       WHERE d.Id_Dependencia = ?`,
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Dependencia no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener dependencia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar una dependencia
export async function PUT(request, { params }) {
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
      `UPDATE TbDependencia
       SET Id_Area_Padre_Dep = ?, Id_Area_Hijo_Dep = ?, Fecha_Asignacion_Dep = ?, Resolucion_Are_Dep = ?, Estado_Dep = ?
       WHERE Id_Dependencia = ?`,
      [
        Id_Area_Padre_Dep,
        Id_Area_Hijo_Dep,
        Fecha_Asignacion_Dep,
        Resolucion_Are_Dep,
        Estado_Dep,
        params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Dependencia no encontrada' }, { status: 404 });
    }

    const [updatedRecord] = await pool.query(
      'SELECT * FROM TbDependencia WHERE Id_Dependencia = ?',
      [params.id]
    );

    return NextResponse.json(updatedRecord[0]);
  } catch (error) {
    console.error('Error al actualizar dependencia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// DELETE (eliminación lógica) - Marcar una dependencia como "Inactivo"
export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query(
      `UPDATE TbDependencia 
       SET Estado_Dep = 'Inactivo' 
       WHERE Id_Dependencia = ?`,
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Dependencia no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Dependencia marcada como Inactivo correctamente' });
  } catch (error) {
    console.error('Error al cambiar estado de dependencia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

