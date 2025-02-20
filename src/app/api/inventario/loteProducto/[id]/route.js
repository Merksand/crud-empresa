import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // BD correcta

/** 🔹 Obtener un registro de LoteProductos por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT lp.*, 
              l.NroLote_Lot AS Numero_Lote, 
              p.Nombre_Pro AS Nombre_Producto
       FROM TbInv_LoteProductos lp
       JOIN TbInv_Lote l ON lp.Id_Lote_LoP = l.Id_Lote
       JOIN TbInv_Producto p ON lp.Id_Producto_LoP = p.Id_Producto
       WHERE lp.Id_LoteProductos = ? AND lp.Estado_LoP = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener registro de LoteProductos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un registro de LoteProductos */
export async function PUT(req, { params }) {
  const { id } = params;
  const { Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP } = await req.json();

  try {
    await poolInventario.query(
      `UPDATE TbInv_LoteProductos 
       SET Id_Lote_LoP = ?, Id_Producto_LoP = ?, Cantidad_LoP = ?
       WHERE Id_LoteProductos = ?`,
      [Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP, id]
    );

    return NextResponse.json({
      message: "Registro de LoteProductos actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar registro de LoteProductos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente un registro de LoteProductos */
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_LoteProductos 
       SET Estado_LoP = 'BA' 
       WHERE Id_LoteProductos = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Registro de LoteProductos eliminado lógicamente",
    });
  } catch (error) {
    console.error("Error al eliminar registro de LoteProductos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
