import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; 
import { emitEvent } from "@/lib/socket";

/** 🔹 Obtener un registro de inventario por ID */
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT i.*, p.Nombre_Pro AS Nombre_Producto, a.Nombre_Alm AS Nombre_Almacen
       FROM TbInv_Inventario i
       JOIN TbInv_Producto p ON i.Id_Producto_Inv = p.Id_Producto
       JOIN TbInv_Almacen a ON i.Id_Almacen_Inv = a.Id_Almacen
       WHERE i.Id_Inventario = ? AND i.Estado_Inv = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener registro de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un registro de inventario */

export async function PUT(req, { params }) {
    const { id } = await params;
    const { Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv } = await req.json();

    try {
        await poolInventario.query(
            `UPDATE TbInv_Inventario 
             SET Id_Producto_Inv = ?, Id_Almacen_Inv = ?, Cantidad_Inv = ?
             WHERE Id_Inventario = ?`,
            [Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, id]
        );

        // ✅ Llama a emitEvent para notificar a todos los clientes
        await emitEvent("inventario-actualizado", {
            Id_Inventario: id,
            Id_Producto_Inv,
            Id_Almacen_Inv,
            Cantidad_Inv
        });

        return NextResponse.json({
            message: "Registro de inventario actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar registro de inventario:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/** 🔹 Eliminar lógicamente un registro de inventario */
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_Inventario 
       SET Estado_Inv = 'BA' 
       WHERE Id_Inventario = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Registro de inventario eliminado lógicamente",
    });
  } catch (error) {
    console.error("Error al eliminar registro de inventario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
