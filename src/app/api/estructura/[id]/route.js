import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEstructura WHERE Id_Estructura = ?', [params.id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { Id_Estructura, Nombre_Estr, Estado_Estr } = data;
    
    const [result] = await pool.query('UPDATE TbEstructura SET Id_Estructura = ?, Nombre_Estr = ?, Estado_Estr = ? WHERE Id_Estructura = ?', [Id_Estructura, Nombre_Estr, Estado_Estr, params.id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Estructura actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try { 
    const [result] = await pool.query('DELETE FROM TbEstructura WHERE Id_Estructura = ?', [params.id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Estructura eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}