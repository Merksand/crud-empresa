import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const idProducto = searchParams.get("idProducto");

    if (!idProducto) {
        return NextResponse.json({ message: "Falta el id del producto" }, { status: 400 });
    }

    try {
        const [almacenes] = await poolInventario.query(`
            SELECT a.Id_Almacen, a.Nombre_Alm, i.Cantidad_Inv
            FROM TbInv_Inventario i
            JOIN TbInv_Almacen a ON i.Id_Almacen_Inv = a.Id_Almacen
            WHERE i.Id_Producto_Inv = ? AND i.Cantidad_Inv > 0
            ORDER BY i.Cantidad_Inv DESC
        `, [idProducto]);

        return NextResponse.json(almacenes);
    } catch (error) {
        console.error("Error al obtener almacenes con stock:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
