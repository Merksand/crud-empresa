import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await poolInventario.query('SELECT * FROM TbInv_Categoria WHERE Estado_Cat = "AC" ');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    const { Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat } = data;

    if (!Nombre_Cat) {
      return new Response(JSON.stringify({ message: "El nombre es obligatorio" }), { status: 400 });
    }

    const query = `
      INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) 
      VALUES (?, ?, ?)
    `;
    const values = [Nombre_Cat, Id_Categoria_Padre_Cat || null, Estado_Cat || "AC"];

    await poolInventario.query(query, values);

    return new Response(JSON.stringify({ message: "Categoría creada con éxito" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al crear la categoría" }), { status: 500 });
  }
}




