import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const { Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat } = data;

    if (!Nombre_Cat) {
      return new Response(JSON.stringify({ message: "El nombre es obligatorio" }), { status: 400 });
    }

    const query = `
      UPDATE TbInv_Categoria 
      SET Nombre_Cat = ?, Id_Categoria_Padre_Cat = ?, Estado_Cat = ?
      WHERE Id_Categoria = ?
    `;
    const values = [Nombre_Cat, Id_Categoria_Padre_Cat || null, Estado_Cat || "AC", id];

    await poolInventario.query(query, values);

    return new Response(JSON.stringify({ message: "Categoría actualizada con éxito" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al actualizar la categoría" }), { status: 500 });
  }
}




export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    console.log("IDDD: ", id)
    const query = `
      UPDATE TbInv_Categoria SET Estado_Cat = 'BA' WHERE Id_Categoria = ?
    `;
    await poolInventario.query(query, [id]);

    return new Response(JSON.stringify({ message: "Categoría eliminada con éxito" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al eliminar la categoría", error: error }), { status: 500 });
  }
}
