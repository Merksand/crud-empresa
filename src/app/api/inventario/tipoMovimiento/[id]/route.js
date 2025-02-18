import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // BD correcta

/** 🔹 Obtener un tipo de movimiento por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT Id_TipoMovimiento, Nombre_TiM, Codigo_TiM, Estado_TiM
       FROM TbInv_TipoMovimiento
       WHERE Id_TipoMovimiento = ? AND Estado_TiM = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Tipo de movimiento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de movimiento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un tipo de movimiento */
export async function PUT(req, { params }) {
  const { id } = params;
  const { Nombre_TiM, Codigo_TiM } = await req.json();

  try {
    await poolInventario.query(
      `UPDATE TbInv_TipoMovimiento 
       SET Nombre_TiM = ?, Codigo_TiM = ?
       WHERE Id_TipoMovimiento = ?`,
      [Nombre_TiM, Codigo_TiM || null, id]
    );

    return NextResponse.json({
      message: "Tipo de movimiento actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar tipo de movimiento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente un tipo de movimiento */
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_TipoMovimiento 
       SET Estado_TiM = 'BA' 
       WHERE Id_TipoMovimiento = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Tipo de movimiento eliminado lógicamente",
    });
  } catch (error) {
    console.error("Error al eliminar tipo de movimiento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
