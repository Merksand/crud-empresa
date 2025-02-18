import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todos los métodos de valoración */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT Id_MetodoValoracion, Nombre_MeV, Descripcion_MeV, Fecha_Creacion_MeV, Estado_MeV
      FROM TbInv_MetodoValoracion
      WHERE Estado_MeV = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los métodos de valoración:", error);
    return NextResponse.json(
      { message: "Error al obtener los métodos de valoración", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo método de valoración */
export async function POST(req) {
  try {
    const { Nombre_MeV, Descripcion_MeV, Estado_MeV = "AC" } = await req.json();

    if (!Nombre_MeV) {
      return NextResponse.json(
        { message: "El nombre del método de valoración es obligatorio" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO TbInv_MetodoValoracion (Nombre_MeV, Descripcion_MeV, Estado_MeV) 
       VALUES (?, ?, ?)`,
      [Nombre_MeV, Descripcion_MeV || "", Estado_MeV]
    );

    return NextResponse.json({ message: "Método de valoración creado correctamente" });
  } catch (error) {
    console.error("Error al crear método de valoración:", error);
    return NextResponse.json(
      { message: "Error al crear método de valoración", error: error.message },
      { status: 500 }
    );
  }
}
