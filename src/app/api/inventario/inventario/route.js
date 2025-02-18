import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todo el inventario con nombres de productos y almacenes */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        i.Id_Inventario, i.Id_Producto_Inv, i.Id_Almacen_Inv, i.Cantidad_Inv, i.Estado_Inv,
        p.Nombre_Pro AS Nombre_Producto,
        a.Nombre_Alm AS Nombre_Almacen
      FROM TbInv_Inventario i
      JOIN TbInv_Producto p ON i.Id_Producto_Inv = p.Id_Producto
      JOIN TbInv_Almacen a ON i.Id_Almacen_Inv = a.Id_Almacen
      WHERE i.Estado_Inv = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    return NextResponse.json(
      { message: "Error al obtener el inventario", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo registro de inventario */
export async function POST(req) {
  try {
    const { Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv = "AC" } = await req.json();

    if (!Id_Producto_Inv || !Id_Almacen_Inv || !Cantidad_Inv) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO TbInv_Inventario (Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv) 
       VALUES (?, ?, ?, ?)`,
      [Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv]
    );

    return NextResponse.json({ message: "Registro de inventario creado correctamente" });
  } catch (error) {
    console.error("Error al crear registro de inventario:", error);
    return NextResponse.json(
      { message: "Error al crear registro de inventario", error: error.message },
      { status: 500 }
    );
  }
}
