import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // BD correcta

/** 🔹 Obtener un movimiento de inventario por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT * FROM TbInv_MovimientoInventario
       WHERE Id_MovimientoInventario = ? AND Estado_MoI = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Movimiento de inventario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener movimiento de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un movimiento de inventario */
export async function PUT(req, { params }) {
  const { id } = params;
  const { 
    Id_TipoMovimiento_MoI, 
    Id_Producto_MoI, 
    Id_MetodoValoracion_MoI, 
    Id_AlmacenOrigen_MoI, 
    Id_AlmacenDestino_MoI, 
    Cantidad_MoI, 
    Debito_MoI 
  } = await req.json();

  try {
    await poolInventario.query(
      `UPDATE TbInv_MovimientoInventario 
       SET Id_TipoMovimiento_MoI = ?, Id_Producto_MoI = ?, Id_MetodoValoracion_MoI = ?, Id_AlmacenOrigen_MoI = ?, Id_AlmacenDestino_MoI = ?, Cantidad_MoI = ?, Debito_MoI = ?
       WHERE Id_MovimientoInventario = ?`,
      [Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_AlmacenOrigen_MoI || null, Id_AlmacenDestino_MoI || null, Cantidad_MoI, Debito_MoI || 0, id]
    );

    return NextResponse.json({ message: "Movimiento de inventario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar movimiento de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente un movimiento de inventario */
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_MovimientoInventario 
       SET Estado_MoI = 'BA' 
       WHERE Id_MovimientoInventario = ?`,
      [id]
    );

    return NextResponse.json({ message: "Movimiento de inventario eliminado lógicamente" });
  } catch (error) {
    console.error("Error al eliminar movimiento de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
