import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

import * as PDFDocument from "pdfkit";

import ExcelJS from "exceljs";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const tipoReporte = searchParams.get("tipo");
    const fechaInicio = searchParams.get("fechaInicio");
    const fechaFin = searchParams.get("fechaFin");
    const idSucursal = searchParams.get("idSucursal");
    const idAlmacen = searchParams.get("idAlmacen");
    const idProducto = searchParams.get("idProducto");
    const formato = searchParams.get("formato"); // "pdf" o "excel"

    try {
        let query = "";
        let params = [];

        // 🔹 Reporte 1: Movimiento por rango de fecha de una sucursal
        if (tipoReporte === "movimientos") {
            query = `
                SELECT m.FechaMovimiento_MoI, tm.Nombre_TiM, p.Nombre_Pro, m.Cantidad_MoI, a.Nombre_Alm
                FROM TbInv_MovimientoInventario m
                JOIN TbInv_TipoMovimiento tm ON m.Id_TipoMovimiento_MoI = tm.Id_TipoMovimiento
                JOIN TbInv_Producto p ON m.Id_Producto_MoI = p.Id_Producto
                JOIN TbInv_Almacen a ON m.Id_AlmacenOrigen_MoI = a.Id_Almacen
                WHERE m.FechaMovimiento_MoI BETWEEN ? AND ? AND a.Id_Sucursal_Alm = ?
                ORDER BY m.FechaMovimiento_MoI DESC
            `;
            params = [fechaInicio, fechaFin, idSucursal];
        }

        // 🔹 Reporte 2: Kardex de un producto en un rango de fechas en un almacén
        else if (tipoReporte === "kardex") {
            query = `
                SELECT m.FechaMovimiento_MoI, tm.Nombre_TiM, m.Cantidad_MoI, m.Debito_MoI, a.Nombre_Alm
                FROM TbInv_MovimientoInventario m
                JOIN TbInv_TipoMovimiento tm ON m.Id_TipoMovimiento_MoI = tm.Id_TipoMovimiento
                JOIN TbInv_Almacen a ON m.Id_AlmacenOrigen_MoI = a.Id_Almacen
                WHERE m.Id_Producto_MoI = ? AND m.FechaMovimiento_MoI BETWEEN ? AND ? AND m.Id_AlmacenOrigen_MoI = ?
                ORDER BY m.FechaMovimiento_MoI DESC
            `;
            params = [idProducto, fechaInicio, fechaFin, idAlmacen];
        }

        // 🔹 Reporte 3: Inventario general con cantidad de productos y precios
        else if (tipoReporte === "inventario") {
            query = `
                SELECT p.Nombre_Pro, i.Cantidad_Inv, p.Precio_Venta_Pro, a.Nombre_Alm
                FROM TbInv_Inventario i
                JOIN TbInv_Producto p ON i.Id_Producto_Inv = p.Id_Producto
                JOIN TbInv_Almacen a ON i.Id_Almacen_Inv = a.Id_Almacen
                ORDER BY p.Nombre_Pro
            `;
        }

        const [resultados] = await poolInventario.query(query, params);

        if (formato === "pdf") {
            return generarPDF(resultados, tipoReporte);
        } else if (formato === "excel") {
            return generarExcel(resultados, tipoReporte);
        } else {
            return NextResponse.json(resultados);
        }

    } catch (error) {
        console.error("Error al generar reporte:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}

function generarPDF(data, tipoReporte) {
    const doc = new PDFDocument.default({ bufferPages: true });

    // 🛠 Solución: Usar una fuente integrada en `pdfkit`
    doc.font("Courier");

    const filename = `${tipoReporte}.pdf`;

    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        return new NextResponse(pdfData, {
            headers: {
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Type": "application/pdf"
            }
        });
    });

    doc.fontSize(18).text(`Reporte: ${tipoReporte.toUpperCase()}`, { align: "center" });
    doc.moveDown();

    data.forEach((item) => {
        doc.fontSize(12).text(JSON.stringify(item, null, 2));
        doc.moveDown();
    });

    doc.end();
}




async function generarExcel(data, tipoReporte) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(tipoReporte);

    // Definir columnas
    if (tipoReporte === "movimientos") {
        worksheet.columns = [
            { header: "Fecha", key: "FechaMovimiento_MoI", width: 20 },
            { header: "Tipo", key: "Nombre_TiM", width: 20 },
            { header: "Producto", key: "Nombre_Pro", width: 30 },
            { header: "Cantidad", key: "Cantidad_MoI", width: 15 },
            { header: "Almacén", key: "Nombre_Alm", width: 30 }
        ];
    } else if (tipoReporte === "kardex") {
        worksheet.columns = [
            { header: "Fecha", key: "FechaMovimiento_MoI", width: 20 },
            { header: "Tipo", key: "Nombre_TiM", width: 20 },
            { header: "Cantidad", key: "Cantidad_MoI", width: 15 },
            { header: "Débito", key: "Debito_MoI", width: 15 },
            { header: "Almacén", key: "Nombre_Alm", width: 30 }
        ];
    } else if (tipoReporte === "inventario") {
        worksheet.columns = [
            { header: "Producto", key: "Nombre_Pro", width: 30 },
            { header: "Cantidad", key: "Cantidad_Inv", width: 15 },
            { header: "Precio", key: "Precio_Venta_Pro", width: 15 },
            { header: "Almacén", key: "Nombre_Alm", width: 30 }
        ];
    }

    // Insertar datos en las filas
    data.forEach((item) => {
        worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
        headers: {
            "Content-Disposition": `attachment; filename="${tipoReporte}.xlsx"`,
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    });
}
