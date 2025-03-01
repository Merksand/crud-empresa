import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

// Datos ficticios para los reportes
const datosMovimientos = [
  { id: 1, fecha: "2025-03-01", tipo: "Entrada", producto: "Laptop HP", cantidad: 10, almacen: "Almacén Principal" },
  { id: 2, fecha: "2025-03-02", tipo: "Salida", producto: "Monitor Dell", cantidad: 5, almacen: "Almacén Principal" },
  { id: 3, fecha: "2025-03-03", tipo: "Transferencia", producto: "Teclado Logitech", cantidad: 15, almacen: "Almacén Secundario" },
  { id: 4, fecha: "2025-03-04", tipo: "Entrada", producto: "Mouse Inalámbrico", cantidad: 20, almacen: "Almacén Principal" },
];

const datosKardex = [
  { id: 1, fecha: "2025-03-01", tipo: "Entrada", cantidad: 10, saldo: 10, precioUnitario: 1200, total: 12000 },
  { id: 2, fecha: "2025-03-02", tipo: "Salida", cantidad: 2, saldo: 8, precioUnitario: 1200, total: 9600 },
  { id: 3, fecha: "2025-03-03", tipo: "Entrada", cantidad: 5, saldo: 13, precioUnitario: 1250, total: 16250 },
  { id: 4, fecha: "2025-03-04", tipo: "Salida", cantidad: 3, saldo: 10, precioUnitario: 1250, total: 12500 },
];

const datosInventario = [
  { id: 1, codigo: "LP001", producto: "Laptop HP", stock: 10, almacen: "Almacén Principal", valorTotal: 12000 },
  { id: 2, codigo: "MN002", producto: "Monitor Dell", stock: 15, almacen: "Almacén Principal", valorTotal: 7500 },
  { id: 3, codigo: "TC003", producto: "Teclado Logitech", stock: 25, almacen: "Almacén Secundario", valorTotal: 2500 },
  { id: 4, codigo: "MS004", producto: "Mouse Inalámbrico", stock: 30, almacen: "Almacén Principal", valorTotal: 1500 },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tipoReporte = searchParams.get("tipo");
  const formato = searchParams.get("formato"); // "pdf" o "excel"

  try {
    let datos = [];

    // Seleccionar los datos según el tipo de reporte
    if (tipoReporte === "movimientos") {
      datos = datosMovimientos;
    } else if (tipoReporte === "kardex") {
      datos = datosKardex;
    } else if (tipoReporte === "inventario") {
      datos = datosInventario;
    } else {
      return NextResponse.json(
        { message: "Tipo de reporte no válido" },
        { status: 400 }
      );
    }

    // Generar el reporte en el formato solicitado
    if (formato === "pdf") {
      // Usar directamente la solución HTML para PDFs
      return generarPDFHTML(datos, tipoReporte);
    } else if (formato === "excel") {
      return await generarExcel(datos, tipoReporte);
    } else {
      return NextResponse.json(datos);
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
  // Configurar PDFDocument para usar fuentes estándar y evitar cargar archivos externos
  const doc = new PDFDocument({ 
    bufferPages: true,
    font: null, // No cargar fuente por defecto
    compress: true
  });
  
  // Usar fuente estándar
  doc.font('Helvetica');
  
  const filename = `${tipoReporte}.pdf`;

  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(
        new NextResponse(pdfData, {
          headers: {
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Content-Type": "application/pdf",
          },
        })
      );
    });

    doc.on("error", (err) => {
      reject(err);
    });

    // Título del reporte
    doc.fontSize(18).text(`Reporte: ${tipoReporte.toUpperCase()}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString()}`, { align: "center" });
    doc.moveDown(2);

    // Contenido según el tipo de reporte
    if (tipoReporte === "movimientos") {
      // Encabezados
      doc.fontSize(12).text("REPORTE DE MOVIMIENTOS DE INVENTARIO", { align: "center" });
      doc.moveDown();
      
      // Tabla
      const tableTop = doc.y;
      const tableLeft = 50;
      const colWidths = [80, 80, 120, 60, 120];
      
      // Encabezados de columna
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text("Fecha", tableLeft, tableTop);
      doc.text("Tipo", tableLeft + colWidths[0], tableTop);
      doc.text("Producto", tableLeft + colWidths[0] + colWidths[1], tableTop);
      doc.text("Cantidad", tableLeft + colWidths[0] + colWidths[1] + colWidths[2], tableTop);
      doc.text("Almacén", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], tableTop);
      
      // Línea después de encabezados
      doc.moveTo(tableLeft, tableTop + 15)
         .lineTo(tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], tableTop + 15)
         .stroke();
      
      // Datos
      doc.fontSize(9).font('Helvetica');
      let rowTop = tableTop + 25;
      
      data.forEach((item) => {
        doc.text(item.fecha, tableLeft, rowTop);
        doc.text(item.tipo, tableLeft + colWidths[0], rowTop);
        doc.text(item.producto, tableLeft + colWidths[0] + colWidths[1], rowTop);
        doc.text(item.cantidad.toString(), tableLeft + colWidths[0] + colWidths[1] + colWidths[2], rowTop);
        doc.text(item.almacen, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], rowTop);
        
        rowTop += 20;
      });
    } else if (tipoReporte === "kardex") {
      // Encabezados
      doc.fontSize(12).text("KARDEX DE PRODUCTO", { align: "center" });
      doc.moveDown();
      doc.fontSize(10).text("Producto: Laptop HP", { align: "left" });
      doc.text("Código: LP001", { align: "left" });
      doc.text("Almacén: Almacén Principal", { align: "left" });
      doc.moveDown();
      
      // Tabla
      const tableTop = doc.y;
      const tableLeft = 50;
      const colWidths = [80, 80, 60, 80, 80, 60];
      
      // Encabezados de columna
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text("Fecha", tableLeft, tableTop);
      doc.text("Tipo", tableLeft + colWidths[0], tableTop);
      doc.text("Cantidad", tableLeft + colWidths[0] + colWidths[1], tableTop);
      doc.text("P. Unitario", tableLeft + colWidths[0] + colWidths[1] + colWidths[2], tableTop);
      doc.text("Total", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], tableTop);
      doc.text("Saldo", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], tableTop);
      
      // Línea después de encabezados
      doc.moveTo(tableLeft, tableTop + 15)
         .lineTo(tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4] + colWidths[5], tableTop + 15)
         .stroke();
      
      // Datos
      doc.fontSize(9).font('Helvetica');
      let rowTop = tableTop + 25;
      
      data.forEach((item) => {
        doc.text(item.fecha, tableLeft, rowTop);
        doc.text(item.tipo, tableLeft + colWidths[0], rowTop);
        doc.text(item.cantidad.toString(), tableLeft + colWidths[0] + colWidths[1], rowTop);
        doc.text(`Bs. ${item.precioUnitario.toFixed(2)}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2], rowTop);
        doc.text(`Bs. ${item.total.toFixed(2)}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], rowTop);
        doc.text(item.saldo.toString(), tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], rowTop);
        
        rowTop += 20;
      });
    } else if (tipoReporte === "inventario") {
      // Encabezados
      doc.fontSize(12).text("INVENTARIO GENERAL", { align: "center" });
      doc.moveDown();
      
      // Resumen
      doc.fontSize(10).text("Total Productos: 80", { align: "left" });
      doc.text("Valor Total: Bs. 23,500", { align: "left" });
      doc.text("Productos Críticos: 5", { align: "left" });
      doc.moveDown();
      
      // Tabla
      const tableTop = doc.y;
      const tableLeft = 50;
      const colWidths = [80, 120, 60, 120, 80];
      
      // Encabezados de columna
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text("Código", tableLeft, tableTop);
      doc.text("Producto", tableLeft + colWidths[0], tableTop);
      doc.text("Stock", tableLeft + colWidths[0] + colWidths[1], tableTop);
      doc.text("Almacén", tableLeft + colWidths[0] + colWidths[1] + colWidths[2], tableTop);
      doc.text("Valor Total", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], tableTop);
      
      // Línea después de encabezados
      doc.moveTo(tableLeft, tableTop + 15)
         .lineTo(tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], tableTop + 15)
         .stroke();
      
      // Datos
      doc.fontSize(9).font('Helvetica');
      let rowTop = tableTop + 25;
      
      data.forEach((item) => {
        doc.text(item.codigo, tableLeft, rowTop);
        doc.text(item.producto, tableLeft + colWidths[0], rowTop);
        doc.text(item.stock.toString(), tableLeft + colWidths[0] + colWidths[1], rowTop);
        doc.text(item.almacen, tableLeft + colWidths[0] + colWidths[1] + colWidths[2], rowTop);
        doc.text(`Bs. ${item.valorTotal.toFixed(2)}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], rowTop);
        
        rowTop += 20;
      });
    }

    // Pie de página
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).text(
        `Página ${i + 1} de ${pageCount}`,
        50,
        doc.page.height - 50,
        { align: "center" }
      );
    }

    // Finalizar el documento
    doc.end();
  });
}

async function generarExcel(data, tipoReporte) {
  try {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Inventario';
    workbook.lastModifiedBy = 'Sistema de Inventario';
    workbook.created = new Date();
    workbook.modified = new Date();
    
    const worksheet = workbook.addWorksheet(tipoReporte, {
      properties: {
        tabColor: { argb: 'FFC0FFEE' }
      }
    });

    // Estilos simplificados para evitar problemas de formato
    const headerStyle = {
      font: { bold: true, size: 12 },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      },
      alignment: { horizontal: 'center', vertical: 'middle' }
    };

    const titleStyle = {
      font: { bold: true, size: 14 },
      alignment: { horizontal: 'center' }
    };

    const normalStyle = {
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    // Configuración según el tipo de reporte
    if (tipoReporte === "movimientos") {
      // Título
      worksheet.mergeCells('A1:E1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = 'REPORTE DE MOVIMIENTOS DE INVENTARIO';
      titleCell.font = titleStyle.font;
      titleCell.alignment = titleStyle.alignment;
      
      // Fecha de generación
      worksheet.mergeCells('A2:E2');
      const dateCell = worksheet.getCell('A2');
      dateCell.value = `Fecha de generación: ${new Date().toLocaleDateString()}`;
      dateCell.alignment = { horizontal: 'center' };
      
      // Espacio
      worksheet.addRow([]);
      
      // Encabezados
      const headerRow = worksheet.addRow(['Fecha', 'Tipo', 'Producto', 'Cantidad', 'Almacén']);
      headerRow.eachCell((cell) => {
        cell.font = headerStyle.font;
        cell.fill = headerStyle.fill;
        cell.border = headerStyle.border;
        cell.alignment = headerStyle.alignment;
      });
      
      // Datos
      data.forEach((item) => {
        const row = worksheet.addRow([
          item.fecha,
          item.tipo,
          item.producto,
          item.cantidad,
          item.almacen
        ]);
        
        row.eachCell((cell) => {
          cell.border = normalStyle.border;
        });
      });
      
      // Ajustar anchos de columna
      worksheet.columns.forEach((column) => {
        column.width = 20;
      });
    } else if (tipoReporte === "kardex") {
      // Título
      worksheet.mergeCells('A1:F1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = 'KARDEX DE PRODUCTO';
      titleCell.font = titleStyle.font;
      titleCell.alignment = titleStyle.alignment;
      
      // Información del producto
      worksheet.mergeCells('A2:F2');
      const infoCell = worksheet.getCell('A2');
      infoCell.value = 'Producto: Laptop HP (LP001) - Almacén Principal';
      infoCell.alignment = { horizontal: 'center' };
      
      // Espacio
      worksheet.addRow([]);
      
      // Encabezados
      const headerRow = worksheet.addRow(['Fecha', 'Tipo', 'Cantidad', 'Precio Unitario', 'Total', 'Saldo']);
      headerRow.eachCell((cell) => {
        cell.font = headerStyle.font;
        cell.fill = headerStyle.fill;
        cell.border = headerStyle.border;
        cell.alignment = headerStyle.alignment;
      });
      
      // Datos
      data.forEach((item) => {
        const row = worksheet.addRow([
          item.fecha,
          item.tipo,
          item.cantidad,
          item.precioUnitario,
          item.total,
          item.saldo
        ]);
        
        // Formato para columnas de precio (usando strings para evitar problemas)
        row.getCell(4).value = `Bs. ${item.precioUnitario.toFixed(2)}`;
        row.getCell(5).value = `Bs. ${item.total.toFixed(2)}`;
        
        row.eachCell((cell) => {
          cell.border = normalStyle.border;
        });
      });
      
      // Ajustar anchos de columna
      [15, 15, 15, 20, 20, 15].forEach((width, i) => {
        worksheet.getColumn(i + 1).width = width;
      });
    } else if (tipoReporte === "inventario") {
      // Título
      worksheet.mergeCells('A1:E1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = 'INVENTARIO GENERAL';
      titleCell.font = titleStyle.font;
      titleCell.alignment = titleStyle.alignment;
      
      // Resumen
      worksheet.mergeCells('A2:E2');
      const summaryCell = worksheet.getCell('A2');
      summaryCell.value = 'Total Productos: 80 | Valor Total: Bs. 23,500 | Productos Críticos: 5';
      summaryCell.alignment = { horizontal: 'center' };
      
      // Espacio
      worksheet.addRow([]);
      
      // Encabezados
      const headerRow = worksheet.addRow(['Código', 'Producto', 'Stock', 'Almacén', 'Valor Total']);
      headerRow.eachCell((cell) => {
        cell.font = headerStyle.font;
        cell.fill = headerStyle.fill;
        cell.border = headerStyle.border;
        cell.alignment = headerStyle.alignment;
      });
      
      // Datos
      data.forEach((item) => {
        const row = worksheet.addRow([
          item.codigo,
          item.producto,
          item.stock,
          item.almacen,
          `Bs. ${item.valorTotal.toFixed(2)}`  // Usar string para evitar problemas de formato
        ]);
        
        row.eachCell((cell) => {
          cell.border = normalStyle.border;
        });
      });
      
      // Ajustar anchos de columna
      [10, 25, 10, 25, 15].forEach((width, i) => {
        worksheet.getColumn(i + 1).width = width;
      });
    }

    // Generar el buffer del archivo
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

// Función alternativa para generar PDF sin usar fuentes personalizadas
async function generarPDFAlternativo(data, tipoReporte) {
  try {
    // Crear un documento PDF con configuración mínima
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      // Evitar cualquier configuración que pueda causar problemas
      font: null,
      bufferPages: true
    });

    const filename = `${tipoReporte}.pdf`;
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));

    return new Promise((resolve, reject) => {
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(
          new NextResponse(pdfData, {
            headers: {
              "Content-Disposition": `attachment; filename="${filename}"`,
              "Content-Type": "application/pdf",
            },
          })
        );
      });

      doc.on("error", (err) => {
        console.error("Error en la generación del PDF:", err);
        reject(err);
      });

      try {
        // Contenido extremadamente simple para evitar problemas
        doc.text(`REPORTE DE ${tipoReporte.toUpperCase()}`, {
          align: 'center'
        });
        
        doc.moveDown();
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, {
          align: 'center'
        });
        doc.moveDown();

        // Contenido simple según el tipo de reporte
        if (tipoReporte === "movimientos") {
          doc.text("DATOS DE MOVIMIENTOS:", { align: 'left' });
          doc.moveDown();
          
          data.forEach((item, index) => {
            doc.text(`Registro ${index + 1}:`);
            doc.text(`Fecha: ${item.fecha}`);
            doc.text(`Tipo: ${item.tipo}`);
            doc.text(`Producto: ${item.producto}`);
            doc.text(`Cantidad: ${item.cantidad}`);
            doc.text(`Almacén: ${item.almacen}`);
            doc.moveDown();
          });
        } else if (tipoReporte === "kardex") {
          doc.text("DATOS DE KARDEX:", { align: 'left' });
          doc.moveDown();
          
          data.forEach((item, index) => {
            doc.text(`Registro ${index + 1}:`);
            doc.text(`Fecha: ${item.fecha}`);
            doc.text(`Tipo: ${item.tipo}`);
            doc.text(`Cantidad: ${item.cantidad}`);
            doc.text(`Precio Unitario: Bs. ${item.precioUnitario}`);
            doc.text(`Total: Bs. ${item.total}`);
            doc.text(`Saldo: ${item.saldo}`);
            doc.moveDown();
          });
        } else if (tipoReporte === "inventario") {
          doc.text("DATOS DE INVENTARIO:", { align: 'left' });
          doc.moveDown();
          
          data.forEach((item, index) => {
            doc.text(`Producto ${index + 1}:`);
            doc.text(`Código: ${item.codigo}`);
            doc.text(`Producto: ${item.producto}`);
            doc.text(`Stock: ${item.stock}`);
            doc.text(`Almacén: ${item.almacen}`);
            doc.text(`Valor Total: Bs. ${item.valorTotal}`);
            doc.moveDown();
          });
        }

        // Finalizar el documento
        doc.end();
      } catch (innerError) {
        console.error("Error al generar contenido del PDF:", innerError);
        // Intentar finalizar el documento de todos modos
        try {
          doc.end();
        } catch (e) {
          console.error("Error al finalizar el documento:", e);
        }
        reject(innerError);
      }
    });
  } catch (error) {
    console.error("Error en generación alternativa de PDF:", error);
    // Si todo falla, devolver un mensaje de error
    return NextResponse.json(
      { message: "No se pudo generar el PDF. Por favor, intente con Excel." },
      { status: 500 }
    );
  }
}

// Función para generar PDF usando HTML
function generarPDFHTML(data, tipoReporte) {
  try {
    // Crear HTML según el tipo de reporte
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de ${tipoReporte}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
          }
          h1, h2 {
            text-align: center;
            color: #333;
          }
          .fecha {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .resumen {
            margin: 20px 0;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
          }
          @media print {
            body {
              font-size: 12pt;
            }
            table {
              page-break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
          }
        </style>
      </head>
      <body>
        <h1>REPORTE DE ${tipoReporte.toUpperCase()}</h1>
        <div class="fecha">Fecha: ${new Date().toLocaleDateString()}</div>
    `;

    if (tipoReporte === "movimientos") {
      htmlContent += `
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Almacén</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(item => {
        htmlContent += `
          <tr>
            <td>${item.fecha}</td>
            <td>${item.tipo}</td>
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.almacen}</td>
          </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
      `;
    } else if (tipoReporte === "kardex") {
      htmlContent += `
        <h2>Producto: Laptop HP (LP001) - Almacén Principal</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(item => {
        htmlContent += `
          <tr>
            <td>${item.fecha}</td>
            <td>${item.tipo}</td>
            <td>${item.cantidad}</td>
            <td>Bs. ${item.precioUnitario.toFixed(2)}</td>
            <td>Bs. ${item.total.toFixed(2)}</td>
            <td>${item.saldo}</td>
          </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
      `;
    } else if (tipoReporte === "inventario") {
      htmlContent += `
        <div class="resumen">Total Productos: 80 | Valor Total: Bs. 23,500 | Productos Críticos: 5</div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Stock</th>
              <th>Almacén</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(item => {
        htmlContent += `
          <tr>
            <td>${item.codigo}</td>
            <td>${item.producto}</td>
            <td>${item.stock}</td>
            <td>${item.almacen}</td>
            <td>Bs. ${item.valorTotal.toFixed(2)}</td>
          </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
      `;
    }

    htmlContent += `
        <div class="footer">
          <p>Página 1 de 1 - Generado por el Sistema de Inventario</p>
          <button onclick="window.print()" style="padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Imprimir</button>
        </div>
      </body>
      </html>
    `;

    // Devolver el HTML como respuesta
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error en generación HTML:", error);
    return NextResponse.json(
      { message: "No se pudo generar el reporte. Por favor, intente con Excel." },
      { status: 500 }
    );
  }
}
