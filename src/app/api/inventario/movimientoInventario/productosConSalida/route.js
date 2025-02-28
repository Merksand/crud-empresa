import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");

    if (!categoria) {
        return NextResponse.json({ message: "Falta la categoría" }, { status: 400 });
    }

    try {
        const [productos] = await poolInventario.query(`
            SELECT DISTINCT p.Id_Producto, p.Nombre_Pro
            FROM TbInv_MovimientoInventario m
            JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
            WHERE p.Id_Categoria_Pro = ? AND m.Id_TipoMovimiento_MoI = 2
        `, [categoria]);

        return NextResponse.json(productos);
    } catch (error) {
        console.error("Error al obtener productos con salida previa:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
