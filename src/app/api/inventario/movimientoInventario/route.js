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


















 

/** 🔹 Función para actualizar stock en un almacén */
async function actualizarStock(Id_Producto, Id_Almacen, cantidad, connection) {
    if (!Id_Almacen) {
        throw new Error("Id_Almacen no puede ser NULL.");
    }

    const [inventario] = await connection.query(
        `SELECT Id_Inventario, Cantidad_Inv FROM TbInv_Inventario WHERE Id_Producto_Inv = ? AND Id_Almacen_Inv = ? FOR UPDATE`,
        [Id_Producto, Id_Almacen]
    );

    let Id_Inventario;
    if (inventario.length === 0) {
        const [newInventario] = await connection.query(
            `INSERT INTO TbInv_Inventario (Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv) 
            VALUES (?, ?, ?, 'AC')`,
            [Id_Producto, Id_Almacen, cantidad > 0 ? cantidad : 0]
        );
        Id_Inventario = newInventario.insertId;
    } else {
        Id_Inventario = inventario[0].Id_Inventario;
        const stockActual = inventario[0].Cantidad_Inv;

        if (stockActual + cantidad < 0) {
            throw new Error("Stock insuficiente en el almacén.");
        }

        await connection.query(
            `UPDATE TbInv_Inventario SET Cantidad_Inv = Cantidad_Inv + ? WHERE Id_Inventario = ?`,
            [cantidad, Id_Inventario]
        );
    }
    return Id_Inventario;
}

/** 🔹 Endpoint POST */
export async function POST(req) {
    const connection = await poolInventario.getConnection();
    await connection.beginTransaction();

    try {
        const {
            Id_TipoMovimiento_MoI,
            Id_Producto_MoI,
            Id_MetodoValoracion_MoI,
            Id_AlmacenOrigen_MoI,
            Id_AlmacenDestino_MoI,
            Cantidad_MoI,
            Motivo_Dev,
            Autorizacion_Dev,
            Motivo_Baj,
            Autorizacion_Baj,
            Estado_MoI = "AC",
        } = await req.json();

        // ✅ Convertir valores a número
        const tipoMovimiento = Number(Id_TipoMovimiento_MoI);
        const producto = Number(Id_Producto_MoI);
        const metodoValoracion = Number(Id_MetodoValoracion_MoI);
        const almacenOrigen = Id_AlmacenOrigen_MoI ? Number(Id_AlmacenOrigen_MoI) : null;
        const almacenDestino = Id_AlmacenDestino_MoI ? Number(Id_AlmacenDestino_MoI) : null;
        const cantidad = Number(Cantidad_MoI);

        // ✅ Validaciones básicas
        if (isNaN(tipoMovimiento) || isNaN(producto) || isNaN(metodoValoracion) || isNaN(cantidad) || cantidad <= 0) {
            throw new Error("Datos inválidos o faltantes.");
        }

        let Id_Inventario_MoI;
        let Debito_MoI = '';

        switch (tipoMovimiento) {
            case 1: // Entrada
            case 5: // Ajuste Positivo
                Debito_MoI = 'Entrada';
                Id_Inventario_MoI = await actualizarStock(producto, almacenOrigen, cantidad, connection);
                break;
            case 2: // Salida
            case 6: // Ajuste Negativo
            case 7: // Baja
                Debito_MoI = 'Salida';
                Id_Inventario_MoI = await actualizarStock(producto, almacenOrigen, -cantidad, connection);
                break;
            case 3: // Transferencia
                // Verificar que hay stock suficiente antes de hacer la transferencia
                Id_Inventario_MoI = await actualizarStock(producto, almacenOrigen, -cantidad, connection);
                const Id_Inventario_Destino = await actualizarStock(producto, almacenDestino, cantidad, connection);
                break;
            case 4: // Devolución
                Debito_MoI = 'Entrada';
                Id_Inventario_MoI = await actualizarStock(producto, almacenOrigen, cantidad, connection);

                if (!Motivo_Dev || !Autorizacion_Dev) {
                    throw new Error("Motivo y autorización son requeridos para devoluciones.");
                }

                break;
            default:
                throw new Error("Tipo de movimiento inválido.");
        }

        // 🔹 Insertar el movimiento en `TbInv_MovimientoInventario`
        const [result] = await connection.query(
            `INSERT INTO TbInv_MovimientoInventario 
            (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, 
            Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, Debito_MoI, Estado_MoI) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [tipoMovimiento, producto, metodoValoracion, Id_Inventario_MoI, almacenOrigen, almacenDestino, cantidad, Debito_MoI, Estado_MoI]
        );

        const Id_Movimiento_Dev = result.insertId;

        // 🔹 Manejo de devoluciones
        if (tipoMovimiento === 4) {
            await connection.query(
                `INSERT INTO TbInv_Devoluciones (Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Estado_Baj) 
                VALUES (?, ?, ?, 'AC')`,
                [Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev]
            );
        }


        const Id_Movimiento_Baj = result.insertId;
                // 🔹 Manejo de bajas
        if (tipoMovimiento === 7) {
            if (!Motivo_Baj || !Autorizacion_Baj) {
                throw new Error("Motivo y autorización son requeridos para bajas.");
            }

            await connection.query(
                `INSERT INTO TbInv_Bajas (Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Estado_Baj) 
                VALUES (?, ?, ?, 'AC')`,
                [Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj]
            );
        }

        await connection.commit();

        // 🔹 Mensaje de respuesta según el tipo de movimiento
        let mensaje = "Movimiento registrado correctamente.";
        if (tipoMovimiento === 1) mensaje = "Entrada de inventario registrada correctamente.";
        if (tipoMovimiento === 2) mensaje = "Salida de inventario registrada correctamente.";
        if (tipoMovimiento === 3) mensaje = "Traslado de inventario registrado correctamente.";
        if (tipoMovimiento === 4) mensaje = "Devolución registrada correctamente.";
        if (tipoMovimiento === 7) mensaje = "Baja registrada correctamente.";

        return NextResponse.json({ message: mensaje });

    } catch (error) {
        await connection.rollback();
        console.error("Error al crear movimiento de inventario:", error);
        return NextResponse.json({ message: "Error en el servidor", error: error.message }, { status: 500 });
    } finally {
        connection.release();
    }
}
