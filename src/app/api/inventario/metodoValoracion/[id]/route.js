import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // BD correcta

/** 🔹 Obtener un método de valoración por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT Id_MetodoValoracion, Nombre_MeV, Descripcion_MeV, Fecha_Creacion_MeV, Estado_MeV
       FROM TbInv_MetodoValoracion
       WHERE Id_MetodoValoracion = ? AND Estado_MeV = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Método de valoración no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener método de valoración:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un método de valoración */
export async function PUT(req, { params }) {
  const { id } = params;
  const { Nombre_MeV, Descripcion_MeV } = await req.json();

  try {
    await poolInventario.query(
      `UPDATE TbInv_MetodoValoracion 
       SET Nombre_MeV = ?, Descripcion_MeV = ?
       WHERE Id_MetodoValoracion = ?`,
      [Nombre_MeV, Descripcion_MeV || "", id]
    );

    return NextResponse.json({
      message: "Método de valoración actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar método de valoración:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente un método de valoración */
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_MetodoValoracion 
       SET Estado_MeV = 'BA' 
       WHERE Id_MetodoValoracion = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Método de valoración eliminado lógicamente",
    });
  } catch (error) {
    console.error("Error al eliminar método de valoración:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
