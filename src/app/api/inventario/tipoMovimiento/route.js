import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todos los tipos de movimientos */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT Id_TipoMovimiento, Nombre_TiM, Codigo_TiM, Estado_TiM
      FROM TbInv_TipoMovimiento
      WHERE Estado_TiM = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los tipos de movimientos:", error);
    return NextResponse.json(
      { message: "Error al obtener los tipos de movimientos", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo tipo de movimiento */
export async function POST(req) {
  try {
    const { Nombre_TiM, Codigo_TiM, Estado_TiM = "AC" } = await req.json();

    if (!Nombre_TiM) {
      return NextResponse.json(
        { message: "El nombre del tipo de movimiento es obligatorio" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO TbInv_TipoMovimiento (Nombre_TiM, Codigo_TiM, Estado_TiM) 
       VALUES (?, ?, ?)`,
      [Nombre_TiM, Codigo_TiM || null, Estado_TiM]
    );

    return NextResponse.json({ message: "Tipo de movimiento creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de movimiento:", error);
    return NextResponse.json(
      { message: "Error al crear tipo de movimiento", error: error.message },
      { status: 500 }
    );
  }
}
