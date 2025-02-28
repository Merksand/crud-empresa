import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

// ✅ GET - Obtener todas las bajas activas con el nombre del producto
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        b.Id_Baja, 
        b.Id_Movimiento_Baj,
        m.Id_Producto_MoI,
        p.Nombre_Pro AS Nombre_Producto,
        b.Motivo_Baj, 
        b.Autorizacion_Baj, 
        b.Fecha_Baj, 
        b.Estado_Baj
      FROM TbInv_Bajas b
      JOIN TbInv_MovimientoInventario m ON b.Id_Movimiento_Baj = m.Id_MovimientoInventario
      JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
      WHERE b.Estado_Baj = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener las bajas:", error);
    return NextResponse.json(
      { message: "Error al obtener las bajas", error },
      { status: 500 }
    );
  }
}

// ✅ POST - Crear una nueva baja
export async function POST(req) {
  try {
    const { Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Estado_Baj = "AC" } = await req.json();

    if (!Id_Movimiento_Baj || !Motivo_Baj || !Autorizacion_Baj) {
      return NextResponse.json({ message: "Campos obligatorios faltantes" }, { status: 400 });
    }

    await poolInventario.query(
      "INSERT INTO TbInv_Bajas (Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Estado_Baj) VALUES (?, ?, ?, ?)",
      [Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Estado_Baj]
    );

    return NextResponse.json({ message: "Baja creada correctamente" });
  } catch (error) {
    console.error("Error al crear la baja:", error);
    return NextResponse.json(
      { message: "Error al crear la baja", error: error.message },
      { status: 500 }
    );
  }
}
