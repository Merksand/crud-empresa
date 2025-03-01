import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

import PDFDocument from "pdfkit";

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
                WHERE m.FechaMovimiento_MoI BETWEEN ? AND ? 
            `;
            
            params = [fechaInicio || '2000-01-01', fechaFin || new Date().toISOString().split('T')[0]];
            
            // Añadir filtro de sucursal si se proporciona
            if (idSucursal) {
                query += ` AND a.Id_Sucursal_Alm = ?`;
                params.push(idSucursal);
            }
            
            // Añadir filtro de almacén si se proporciona
            if (idAlmacen) {
                query += ` AND m.Id_AlmacenOrigen_MoI = ?`;
                params.push(idAlmacen);
            }
            
            query += ` ORDER BY m.FechaMovimiento_MoI DESC`;
        }

        // 🔹 Reporte 2: Kardex de un producto en un rango de fechas en un almacén
        else if (tipoReporte === "kardex") {
            query = `
                SELECT m.FechaMovimiento_MoI, tm.Nombre_TiM, m.Cantidad_MoI, m.Debito_MoI, a.Nombre_Alm
                FROM TbInv_MovimientoInventario m
                JOIN TbInv_TipoMovimiento tm ON m.Id_TipoMovimiento_MoI = tm.Id_TipoMovimiento
                JOIN TbInv_Almacen a ON m.Id_AlmacenOrigen_MoI = a.Id_Almacen
                WHERE m.FechaMovimiento_MoI BETWEEN ? AND ?
            `;
            
            params = [fechaInicio || '2000-01-01', fechaFin || new Date().toISOString().split('T')[0]];
            
            // Añadir filtro de producto si se proporciona
            if (idProducto) {
                query += ` AND m.Id_Producto_MoI = ?`;
                params.push(idProducto);
            }
            
            // Añadir filtro de almacén si se proporciona
            if (idAlmacen) {
                query += ` AND m.Id_AlmacenOrigen_MoI = ?`;
                params.push(idAlmacen);
            }
            
            query += ` ORDER BY m.FechaMovimiento_MoI DESC`;
        }

        // 🔹 Reporte 3: Inventario general con cantidad de productos y precios
        else if (tipoReporte === "inventario") {
            query = `
                SELECT p.Nombre_Pro, i.Cantidad_Inv, p.Precio_Venta_Pro, a.Nombre_Alm
                FROM TbInv_Inventario i
                JOIN TbInv_Producto p ON i.Id_Producto_Inv = p.Id_Producto
                JOIN TbInv_Almacen a ON i.Id_Almacen_Inv = a.Id_Almacen
            `;
            
            // Añadir filtros si se proporcionan
            const whereConditions = [];
            
            if (idSucursal) {
                whereConditions.push(`a.Id_Sucursal_Alm = ?`);
                params.push(idSucursal);
            }
            
            if (idAlmacen) {
                whereConditions.push(`i.Id_Almacen_Inv = ?`);
                params.push(idAlmacen);
            }
            
            if (whereConditions.length > 0) {
                query += ` WHERE ` + whereConditions.join(' AND ');
            }
            
            query += ` ORDER BY p.Nombre_Pro`;
        } else {
            // Si no se especifica un tipo de reporte válido
            return NextResponse.json(
                { message: "Tipo de reporte no válido" }, 
                { status: 400 }
            );
        }

        // Ejecutar la consulta
        console.log("Ejecutando consulta:", query, params);
        const [resultados] = await poolInventario.query(query, params);
        
        // Si no hay resultados, devolver un mensaje
        if (!resultados || resultados.length === 0) {
            return NextResponse.json(
                { message: "No se encontraron datos para el reporte solicitado" }, 
                { status: 404 }
            );
        }

        // Generar el reporte en el formato solicitado
        if (formato === "pdf") {
            return await generarPDF(resultados, tipoReporte);
        } else if (formato === "excel") {
            return await generarExcel(resultados, tipoReporte);
        } else {
            return NextResponse.json(resultados);
        }

    } catch (error) {
        console.error("Error al generar reporte:", error);
        return NextResponse.json(
            { message: "Error en el servidor", error: error.message }, 
            { status: 500 }
        );
    }
}

function generarPDF(data, tipoReporte) {
    const doc = new PDFDocument({ bufferPages: true });

    // 🛠 Solución: Usar una fuente integrada en `pdfkit`
    doc.font("Courier");

    const filename = `${tipoReporte}.pdf`;

    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    
    // Crear una promesa para manejar la finalización del documento
    return new Promise((resolve, reject) => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(new NextResponse(pdfData, {
                headers: {
                    "Content-Disposition": `attachment; filename="${filename}"`,
                    "Content-Type": "application/pdf"
                }
            }));
        });
        
        doc.on("error", (err) => {
            reject(err);
        });

        // Contenido del PDF
        doc.fontSize(18).text(`Reporte: ${tipoReporte.toUpperCase()}`, { align: "center" });
        doc.moveDown();

        // Añadir encabezados según el tipo de reporte
        if (tipoReporte === "movimientos") {
            doc.fontSize(12).text("Fecha | Tipo | Producto | Cantidad | Almacén", { align: "left" });
            doc.moveDown();
            
            data.forEach((item) => {
                doc.fontSize(10).text(
                    `${item.FechaMovimiento_MoI} | ${item.Nombre_TiM} | ${item.Nombre_Pro} | ${item.Cantidad_MoI} | ${item.Nombre_Alm}`
                );
                doc.moveDown(0.5);
            });
        } else if (tipoReporte === "kardex") {
            doc.fontSize(12).text("Fecha | Tipo | Cantidad | Débito | Almacén", { align: "left" });
            doc.moveDown();
            
            data.forEach((item) => {
                doc.fontSize(10).text(
                    `${item.FechaMovimiento_MoI} | ${item.Nombre_TiM} | ${item.Cantidad_MoI} | ${item.Debito_MoI || 0} | ${item.Nombre_Alm}`
                );
                doc.moveDown(0.5);
            });
        } else if (tipoReporte === "inventario") {
            doc.fontSize(12).text("Producto | Cantidad | Precio | Almacén", { align: "left" });
            doc.moveDown();
            
            data.forEach((item) => {
                doc.fontSize(10).text(
                    `${item.Nombre_Pro} | ${item.Cantidad_Inv} | ${item.Precio_Venta_Pro} | ${item.Nombre_Alm}`
                );
                doc.moveDown(0.5);
            });
        } else {
            // Formato genérico para otros tipos de reportes
            data.forEach((item) => {
                doc.fontSize(10).text(JSON.stringify(item, null, 2));
                doc.moveDown();
            });
        }

        // Finalizar el documento
        doc.end();
    });
}

async function generarExcel(data, tipoReporte) {
    try {
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

        // Aplicar estilo a los encabezados
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // Insertar datos en las filas
        data.forEach((item) => {
            worksheet.addRow(item);
        });

        // Ajustar bordes de las celdas
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        
        return new NextResponse(buffer, {
            headers: {
                "Content-Disposition": `attachment; filename="${tipoReporte}.xlsx"`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        });
    } catch (error) {
        console.error("Error al generar Excel:", error);
        return new NextResponse(
            JSON.stringify({ message: "Error al generar el archivo Excel" }), 
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
