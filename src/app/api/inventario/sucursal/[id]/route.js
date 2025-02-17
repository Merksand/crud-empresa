import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Aseguramos los pools correctos

/** 🔹 Obtener una sucursal por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [sucursal] = await poolInventario.query(
      `SELECT 
        s.*, 
        e.Nombre_Emp AS Nombre_Empresa
      FROM Bd_INVENTARIO_12022025_2.TbInv_Sucursal s
      JOIN empresa.TbEmpresa e ON s.Id_Empresa_Suc = e.Id_Empresa
      WHERE s.Id_Sucursal = ? AND s.Estado_Suc = 'AC'`,
      [id]
    );
    return NextResponse.json(sucursal);
  } catch (error) {
    console.error("Error al obtener la sucursal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar una sucursal */
export async function PUT(req, { params }) {
  const { id } = params;
  const { Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc } = await req.json();
  try {
    await poolInventario.query(
      `UPDATE Bd_INVENTARIO_12022025_2.TbInv_Sucursal 
       SET Id_Empresa_Suc = ?, Nombre_Parametro_Suc = ?, Nombre_Suc = ? 
       WHERE Id_Sucursal = ?`,
      [Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, id]
    );
    return NextResponse.json({ message: "Sucursal actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la sucursal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente una sucursal */
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      `UPDATE Bd_INVENTARIO_12022025_2.TbInv_Sucursal 
       SET Estado_Suc = 'BA' 
       WHERE Id_Sucursal = ?`,
      [id]
    );
    return NextResponse.json({ message: "Sucursal eliminada lógicamente" });
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
