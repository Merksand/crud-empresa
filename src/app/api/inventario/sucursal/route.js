import { NextResponse } from "next/server";
import { poolClientes, pool } from "@/lib/db"; // Asegurar que usamos el pool correcto

/** 🔹 Obtener todas las sucursales con su empresa */
export async function GET() {
  try {
    const [rows] = await poolClientes.query(`
      SELECT 
        s.Id_Sucursal, 
        s.Id_Empresa_Suc, 
        s.Nombre_Parametro_Suc, 
        s.Nombre_Suc,
        s.Estado_Suc,
        e.Nombre_Emp AS Nombre_Empresa
      FROM Bd_INVENTARIO_12022025_2.TbInv_Sucursal s
      JOIN empresa.TbEmpresa e ON s.Id_Empresa_Suc = e.Id_Empresa
      WHERE s.Estado_Suc = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener sucursales:", error);
    return NextResponse.json(
      { message: "Error al obtener sucursales", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear una nueva sucursal */
export async function POST(req) {
  try {
    const { Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc = "AC" } =
      await req.json();

    if (!Id_Empresa_Suc || !Nombre_Parametro_Suc || !Nombre_Suc) {
      return NextResponse.json(
        { message: "Campos obligatorios faltantes" },
        { status: 400 }
      );
    }

    await poolClientes.query(
      "INSERT INTO Bd_INVENTARIO_12022025_2.TbInv_Sucursal (Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc) VALUES (?, ?, ?, ?)",
      [Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc]
    );

    return NextResponse.json({ message: "Sucursal creada correctamente" });
  } catch (error) {
    console.error("Error al crear sucursal:", error);
    return NextResponse.json(
      { message: "Error al crear sucursal", error: error.message },
      { status: 500 }
    );
  }
}
