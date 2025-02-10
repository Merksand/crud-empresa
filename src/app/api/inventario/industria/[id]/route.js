import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [rows] = await pool.query('SELECT * FROM TbInv_Industria WHERE Id_Industria = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Industria no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener la industria' }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { Nombre_Ind, Estado_Pai } = await request.json();

    if (!Nombre_Ind && !Estado_Pai) {
      return NextResponse.json({ error: 'No se proporcionaron campos para actualizar' }, { status: 400 });
    }

    const updateFields = [];
    const values = [];

    if (Nombre_Ind) {
      updateFields.push('Nombre_Ind = ?');
      values.push(Nombre_Ind);
    }

    if (Estado_Pai) {
      updateFields.push('Estado_Pai = ?');
      values.push(Estado_Pai);
    }

    values.push(id);

    const query = `UPDATE TbInv_Industria SET ${updateFields.join(', ')} WHERE Id_Industria = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Industria no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Industria actualizada correctamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar la industria' }, { status: 500 });
  }
}




export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const [result] = await pool.query('UPDATE TbInv_Industria SET Estado_Pai = "BA" WHERE Id_Industria = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Industria no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Industria eliminada correctamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar la industria' }, { status: 500 });
  }
}