import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener un área específica
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM TbArea WHERE Id_Area = ?', 
      [params.id]
    );
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Área no encontrada' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar un área
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { 
      Id_Estructura_Ar,
      Fecha_Creacion_Ar,
      Nombre_Are,
      Resolucion_Are,
      Estado_Are
    } = data;

    const [result] = await pool.query(
      'UPDATE TbArea SET Id_Estructura_Ar = ?, Fecha_Creacion_Ar = ?, Nombre_Are = ?, Resolucion_Are = ?, Estado_Are = ? WHERE Id_Area = ?',
      [Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Área no encontrada' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Área actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Eliminar un área
export async function DELETE(request, { params }) {
  try {
  console.log("DELETE - ID recibido:", params.id);

    const [result] = await pool.query(
      'DELETE FROM TbArea WHERE Id_Area = ?',
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Área no encontrada' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Área eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 