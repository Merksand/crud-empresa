import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Obtener una empresa específica
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpresa WHERE Id_Empresa = ?', [params.id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar una empresa
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp } = data;
    
    const [result] = await pool.query(
      'UPDATE TbEmpresa SET Nombre_Emp = ?, Sede_Emp = ?, Fecha_Fundacion_Emp = ?, Tipo_Emp = ?, Idioma_Emp = ?, Estado_Emp = ? WHERE Id_Empresa = ?',
      [Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp, params.id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Empresa actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Eliminar una empresa
export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query('DELETE FROM TbEmpresa WHERE Id_Empresa = ?', [params.id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Empresa eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 