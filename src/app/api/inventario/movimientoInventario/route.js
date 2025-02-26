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

    // ✅ Validar que los campos obligatorios estén presentes
    if (!Id_TipoMovimiento_MoI || !Id_Producto_MoI || !Cantidad_MoI || !Id_MetodoValoracion_MoI) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }

    // ✅ Determinar el almacén afectado (usando Almacén Origen en todas las operaciones)
    const almacenId = Id_AlmacenOrigen_MoI; 

    // ✅ Buscar el inventario en el almacén origen
    const [inventario] = await poolInventario.query(
      `SELECT Id_Inventario, Cantidad_Inv FROM TbInv_Inventario WHERE Id_Producto_Inv = ? AND Id_Almacen_Inv = ?`,
      [Id_Producto_MoI, almacenId]
    );

    let Id_Inventario_MoI;
    let stockActual = 0;

    if (inventario.length === 0) {
      // ✅ Si no existe el inventario en ese almacén, lo creamos con stock 0
      const [newInventario] = await poolInventario.query(
        `INSERT INTO TbInv_Inventario (Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv) 
         VALUES (?, ?, 0, 'AC')`,
        [Id_Producto_MoI, almacenId]
      );
      Id_Inventario_MoI = newInventario.insertId;
    } else {
      Id_Inventario_MoI = inventario[0].Id_Inventario;
      stockActual = inventario[0].Cantidad_Inv;
    }

    // ✅ Validar stock antes de una salida o traslado
    if ((Id_TipoMovimiento_MoI == 2 || Id_TipoMovimiento_MoI == 3) && stockActual < Cantidad_MoI) {
      return NextResponse.json({ message: "Stock insuficiente en el almacén origen" }, { status: 400 });
    }

    // ✅ Calcular el Debito según el tipo de movimiento
    let Debito_MoI = 0;
    if (Id_TipoMovimiento_MoI == 1) Debito_MoI = +Cantidad_MoI; // Entrada
    if (Id_TipoMovimiento_MoI == 2) Debito_MoI = -Cantidad_MoI; // Salida

    // ✅ Insertar el movimiento en `TbInv_MovimientoInventario`
    await poolInventario.query(
      `INSERT INTO TbInv_MovimientoInventario 
       (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI || null, Cantidad_MoI, Debito_MoI, Estado_MoI]
    );

    // ✅ Actualizar el stock en el almacén origen
    await poolInventario.query(
      `UPDATE TbInv_Inventario SET Cantidad_Inv = Cantidad_Inv + ? WHERE Id_Inventario = ?`,
      [Debito_MoI, Id_Inventario_MoI]
    );

    // ✅ Si es un traslado (Id_TipoMovimiento_MoI == 3), crear un registro en el almacén destino
    if (Id_TipoMovimiento_MoI == 3) {
      // Buscar si el producto ya está en el almacén destino
      const [inventarioDestino] = await poolInventario.query(
        `SELECT Id_Inventario FROM TbInv_Inventario WHERE Id_Producto_Inv = ? AND Id_Almacen_Inv = ?`,
        [Id_Producto_MoI, Id_AlmacenDestino_MoI]
      );

      let Id_Inventario_Destino;
      if (inventarioDestino.length > 0) {
        Id_Inventario_Destino = inventarioDestino[0].Id_Inventario;
        // ✅ Actualizar stock en el almacén destino
        await poolInventario.query(
          `UPDATE TbInv_Inventario SET Cantidad_Inv = Cantidad_Inv + ? WHERE Id_Inventario = ?`,
          [Cantidad_MoI, Id_Inventario_Destino]
        );
      } else {
        // ✅ Crear un nuevo inventario si no existe en el destino
        const [insertResult] = await poolInventario.query(
          `INSERT INTO TbInv_Inventario (Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv)
           VALUES (?, ?, ?, 'AC')`,
          [Id_Producto_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI]
        );
        Id_Inventario_Destino = insertResult.insertId;
      }

      // ✅ Insertar el movimiento de entrada en el almacén destino
      await poolInventario.query(
        `INSERT INTO TbInv_MovimientoInventario 
         (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Id_TipoMovimiento_MoI,
          Id_Producto_MoI,
          Id_MetodoValoracion_MoI,
          Id_Inventario_Destino,
          null,
          Id_AlmacenDestino_MoI,
          Cantidad_MoI,
          +Cantidad_MoI, // Entrada positiva en destino
          Estado_MoI,
        ]
      );
    }

    return NextResponse.json({ message: "Movimiento de inventario creado correctamente y stock actualizado" });
  } catch (error) {
    console.error("Error al crear movimiento de inventario:", error);
    return NextResponse.json({ message: "Error al crear movimiento de inventario", error: error.message }, { status: 500 });
  }
}
