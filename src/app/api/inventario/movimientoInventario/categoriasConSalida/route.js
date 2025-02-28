import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

export async function GET() {
    try {
        const [categorias] = await poolInventario.query(`
            SELECT DISTINCT c.Id_Categoria, c.Nombre_Cat
            FROM TbInv_MovimientoInventario m
            JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
            JOIN TbInv_Categoria c ON p.Id_Categoria_Pro = c.Id_Categoria
            WHERE m.Id_TipoMovimiento_MoI = 2
        `);

        return NextResponse.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías con salida previa:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
