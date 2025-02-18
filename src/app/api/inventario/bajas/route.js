import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

// ✅ Obtener todas las bajas
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT b.*, 
             m.Id_MovimientoInventario, 
             m.Id_Producto_MoI, 
             m.Cantidad_MoI
      FROM TbInv_Bajas b
      JOIN TbInv_MovimientoInventario m ON b.Id_Movimiento_Baj = m.Id_MovimientoInventario
      WHERE b.Estado_Baj = 'AC'
      ORDER BY b.Fecha_Baj DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener bajas:", error);
    return NextResponse.json({ message: "Error al obtener bajas", error }, { status: 500 });
  }
}

// ✅ Crear una nueva baja
export async function POST(req) {
  try {
    const { Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj } = await req.json();

    if (!Id_Movimiento_Baj || !Motivo_Baj || !Autorizacion_Baj) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    await poolInventario.query(
      `INSERT INTO TbInv_Bajas (Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Estado_Baj) 
       VALUES (?, ?, ?, 'AC')`,
      [Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj]
    );

    return NextResponse.json({ message: "Baja registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar baja:", error);
    return NextResponse.json({ message: "Error al registrar baja", error }, { status: 500 });
  }
}
