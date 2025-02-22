import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

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
  const { id } = await params;
  const {
    Id_TipoMovimiento_MoI,
    Id_Producto_MoI,
    Id_MetodoValoracion_MoI,
    Id_AlmacenOrigen_MoI,
    Id_AlmacenDestino_MoI,
    Cantidad_MoI,
  } = await req.json();

  try {
    // ✅ Calcular automáticamente el DEBITO
    let Debito_MoI = 0;
    if (Id_TipoMovimiento_MoI == 1) Debito_MoI = +Cantidad_MoI; // Entrada
    if (Id_TipoMovimiento_MoI == 2) Debito_MoI = -Cantidad_MoI; // Salida
    if (Id_TipoMovimiento_MoI == 3 && Id_AlmacenOrigen_MoI) Debito_MoI = -Cantidad_MoI; // Traslado - Origen
    if (Id_TipoMovimiento_MoI == 3 && Id_AlmacenDestino_MoI) Debito_MoI = +Cantidad_MoI; // Traslado - Destino

    // ✅ Manejo correcto de los valores de almacén
    const AlmacenOrigen = Id_AlmacenOrigen_MoI !== "" ? Id_AlmacenOrigen_MoI : null;
    const AlmacenDestino = Id_AlmacenDestino_MoI !== "" ? Id_AlmacenDestino_MoI : null;

    await poolInventario.query(
      `UPDATE TbInv_MovimientoInventario 
       SET Id_TipoMovimiento_MoI = ?, 
           Id_Producto_MoI = ?, 
           Id_MetodoValoracion_MoI = ?, 
           Id_AlmacenOrigen_MoI = ?, 
           Id_AlmacenDestino_MoI = ?, 
           Cantidad_MoI = ?, 
           Debito_MoI = ?
       WHERE Id_MovimientoInventario = ?`,
      [
        Id_TipoMovimiento_MoI,
        Id_Producto_MoI,
        Id_MetodoValoracion_MoI,
        AlmacenOrigen,
        AlmacenDestino,
        Cantidad_MoI,
        Debito_MoI,
        id,
      ]
    );

    return NextResponse.json({ message: "Movimiento de inventario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar movimiento de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
