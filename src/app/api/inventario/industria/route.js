import { NextResponse } from 'next/server';
import {pool} from '@/lib/db';


export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbInv_Industria WHERE Estado_Pai = "AC"');
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Dato no encontrado' },
        { status: 404 });
    }
  
    return NextResponse.json(rows);
    
  } catch (error) {
    console.error(error);
  }
}




export async function POST(request) {
  try {
    const { Nombre_Ind, Estado_Pai } = await request.json();

    if (!Nombre_Ind || !Estado_Pai) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO TbInv_Industria (Nombre_Ind, Estado_Pai) VALUES (?, ?)',
      [Nombre_Ind, Estado_Pai]
    );

    return NextResponse.json({ message: 'Industria creada correctamente', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear la industria' }, { status: 500 });
  }
}
