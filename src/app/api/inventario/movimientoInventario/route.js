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


export async function POST(req) {
  try {
    const {
      Id_TipoMovimiento_MoI,
      Id_Producto_MoI,
      Id_MetodoValoracion_MoI,
      Id_AlmacenOrigen_MoI,
      Id_AlmacenDestino_MoI,
      Cantidad_MoI,
      Estado_MoI = "AC",
    } = await req.json();

    // ✅ Validación de campos obligatorios
    if (!Id_TipoMovimiento_MoI || !Id_Producto_MoI || !Cantidad_MoI || !Id_MetodoValoracion_MoI) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }

    // ✅ Cálculo automático de DEBITO según el tipo de movimiento
    let Debito_MoI = 0;
    if (Id_TipoMovimiento_MoI == 1) Debito_MoI = +Cantidad_MoI; // Entrada
    if (Id_TipoMovimiento_MoI == 2) Debito_MoI = -Cantidad_MoI; // Salida
    // Traslado: Origen (-), Destino (+)

    // ✅ Buscar el ID de Inventario según el Producto y Almacén
    const almacenId = Id_TipoMovimiento_MoI == 2 || Id_TipoMovimiento_MoI == 3 ? Id_AlmacenOrigen_MoI : Id_AlmacenDestino_MoI;

    const [inventario] = await poolInventario.query(
      `SELECT Id_Inventario FROM TbInv_Inventario WHERE Id_Producto_Inv = ? AND Id_Almacen_Inv = ?`,
      [Id_Producto_MoI, almacenId]
    );

    if (inventario.length === 0) {
      return NextResponse.json({ message: "No se encontró el inventario para este producto y almacén" }, { status: 404 });
    }

    const Id_Inventario_MoI = inventario[0].Id_Inventario;

    // ✅ INSERT en la tabla TbInv_MovimientoInventario
    await poolInventario.query(
      `INSERT INTO TbInv_MovimientoInventario 
       (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI || null, Id_AlmacenDestino_MoI || null, Cantidad_MoI, Debito_MoI, Estado_MoI]
    );

    // ✅ Traslado: Crear el segundo registro para el almacén destino
    if (Id_TipoMovimiento_MoI == 3) {
      await poolInventario.query(
        `INSERT INTO TbInv_MovimientoInventario 
         (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
         VALUES (?, ?, ?, 
                 (SELECT Id_Inventario FROM TbInv_Inventario WHERE Id_Producto_Inv = ? AND Id_Almacen_Inv = ?), 
                 ?, ?, ?, ?, ?)`,
        [
          Id_TipoMovimiento_MoI,
          Id_Producto_MoI,
          Id_MetodoValoracion_MoI,
          Id_Producto_MoI,
          Id_AlmacenDestino_MoI,
          null,
          Id_AlmacenDestino_MoI,
          Cantidad_MoI,
          +Cantidad_MoI, // Positivo para el destino
          Estado_MoI,
        ]
      );
    }

    return NextResponse.json({ message: "Movimiento de inventario creado correctamente" });
  } catch (error) {
    console.error("Error al crear movimiento de inventario:", error);
    return NextResponse.json({ message: "Error al crear movimiento de inventario", error: error.message }, { status: 500 });
  }
}
