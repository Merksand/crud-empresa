import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todos los movimientos de inventario con detalles */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
          mi.Id_MovimientoInventario, 
          mi.Id_TipoMovimiento_MoI, 
          tm.Nombre_TiM AS Nombre_TipoMovimiento,
          mi.Id_Producto_MoI, 
          p.Nombre_Pro AS Nombre_Producto,
          mi.Id_MetodoValoracion_MoI, 
          mv.Nombre_MeV AS Nombre_MetodoValoracion,
          mi.Id_Inventario_MoI, 
          mi.Id_AlmacenOrigen_MoI, 
          ao.Nombre_Alm AS Nombre_AlmacenOrigen,
          mi.Id_AlmacenDestino_MoI, 
          ad.Nombre_Alm AS Nombre_AlmacenDestino,
          mi.Cantidad_MoI, 
          mi.Debito_MoI, 
          mi.FechaMovimiento_MoI, 
          mi.Estado_MoI
        FROM TbInv_MovimientoInventario mi
        JOIN TbInv_TipoMovimiento tm ON mi.Id_TipoMovimiento_MoI = tm.Id_TipoMovimiento
        JOIN TbInv_Producto p ON mi.Id_Producto_MoI = p.Id_Producto
        JOIN TbInv_MetodoValoracion mv ON mi.Id_MetodoValoracion_MoI = mv.Id_MetodoValoracion
        LEFT JOIN TbInv_Almacen ao ON mi.Id_AlmacenOrigen_MoI = ao.Id_Almacen
        LEFT JOIN TbInv_Almacen ad ON mi.Id_AlmacenDestino_MoI = ad.Id_Almacen
        WHERE mi.Estado_MoI = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los movimientos de inventario:", error);
    return NextResponse.json(
      { message: "Error al obtener los movimientos de inventario", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo movimiento de inventario */
export async function POST(req) {
  try {

    console.log(req)
    const { 
      Id_TipoMovimiento_MoI, 
      Id_Producto_MoI, 
      Id_MetodoValoracion_MoI, 
      Id_Inventario_MoI,  // Aseguramos que el campo esté presente
      Id_AlmacenOrigen_MoI, 
      Id_AlmacenDestino_MoI, 
      Cantidad_MoI, 
      Debito_MoI, 
      Estado_MoI = "AC" 
    } = await req.json();

    // Validamos que los campos obligatorios estén presentes
    if (!Id_TipoMovimiento_MoI || !Id_Producto_MoI || !Cantidad_MoI || !Id_MetodoValoracion_MoI || !Id_Inventario_MoI) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO TbInv_MovimientoInventario 
      (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI || null, Id_AlmacenDestino_MoI || null, Cantidad_MoI, Debito_MoI || 0, Estado_MoI]
    );

    return NextResponse.json({ message: "Movimiento de inventario creado correctamente" });
  } catch (error) {
    console.error("Error al crear movimiento de inventario:", error);
    return NextResponse.json(
      { message: "Error al crear movimiento de inventario", error: error.message },
      { status: 500 }
    );
  }
}
