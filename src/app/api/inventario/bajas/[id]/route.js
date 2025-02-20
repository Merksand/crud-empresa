import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

// ✅ Obtener una baja por ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT * FROM TbInv_Bajas WHERE Id_Baja = ? AND Estado_Baj = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Baja no encontrada" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener baja:", error);
    return NextResponse.json({ message: "Error al obtener baja", error }, { status: 500 });
  }
}

// ✅ Editar una baja
export async function PUT(req, { params }) {
  const { id } = await params;
  const { Motivo_Baj, Autorizacion_Baj } = await req.json();

  try {
    const [result] = await poolInventario.query(
      `UPDATE TbInv_Bajas SET Motivo_Baj = ?, Autorizacion_Baj = ? WHERE Id_Baja = ?`,
      [Motivo_Baj, Autorizacion_Baj, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Baja no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Baja actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar baja:", error);
    return NextResponse.json({ message: "Error al actualizar baja", error }, { status: 500 });
  }
}

// ✅ Eliminar una baja (Eliminación lógica)
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const [result] = await poolInventario.query(
      `UPDATE TbInv_Bajas SET Estado_Baj = 'BA' WHERE Id_Baja = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Baja no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Baja eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar baja:", error);
    return NextResponse.json({ message: "Error al eliminar baja", error }, { status: 500 });
  }
}
