import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todos los registros de LoteProductos con nombres de productos y lotes */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        lp.Id_LoteProductos, lp.Id_Lote_LoP, lp.Id_Producto_LoP, lp.Cantidad_LoP, lp.Estado_LoP,
        l.NroLote_Lot AS Numero_Lote,
        p.Nombre_Pro AS Nombre_Producto
      FROM TbInv_LoteProductos lp
      JOIN TbInv_Lote l ON lp.Id_Lote_LoP = l.Id_Lote
      JOIN TbInv_Producto p ON lp.Id_Producto_LoP = p.Id_Producto
      WHERE lp.Estado_LoP = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los registros de LoteProductos:", error);
    return NextResponse.json(
      { message: "Error al obtener los registros de LoteProductos", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo registro en LoteProductos */
export async function POST(req) {
  try {
    const { Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP, Estado_LoP = "AC" } = await req.json();

    if (!Id_Lote_LoP || !Id_Producto_LoP || !Cantidad_LoP) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO TbInv_LoteProductos (Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP, Estado_LoP) 
       VALUES (?, ?, ?, ?)`,
      [Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP, Estado_LoP]
    );

    return NextResponse.json({ message: "Registro de LoteProductos creado correctamente" });
  } catch (error) {
    console.error("Error al crear registro en LoteProductos:", error);
    return NextResponse.json(
      { message: "Error al crear registro en LoteProductos", error: error.message },
      { status: 500 }
    );
  }
}
