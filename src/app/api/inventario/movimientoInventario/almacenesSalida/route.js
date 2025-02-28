import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const producto = searchParams.get("producto");

    if (!producto) {
        return NextResponse.json({ message: "Falta el id del producto" }, { status: 400 });
    }

    try {
        const [almacenes] = await poolInventario.query(`
            SELECT m.Id_AlmacenOrigen_MoI AS Id_Almacen, a.Nombre_Alm, SUM(m.Cantidad_MoI) AS Cantidad_Salida
            FROM TbInv_MovimientoInventario m
            JOIN TbInv_Almacen a ON m.Id_AlmacenOrigen_MoI = a.Id_Almacen
            WHERE m.Id_Producto_MoI = ? AND m.Id_TipoMovimiento_MoI = 2
            GROUP BY m.Id_AlmacenOrigen_MoI
            HAVING SUM(m.Cantidad_MoI) > 0
        `, [producto]);

        return NextResponse.json(almacenes);
    } catch (error) {
        console.error("Error al obtener almacenes de salida:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
