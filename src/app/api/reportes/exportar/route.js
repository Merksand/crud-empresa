import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import mysql from "mysql2/promise";
import { pool } from "@/lib/db";

// Configuración de la conexión a la base de datos

// Función para generar Excel
async function generarExcel(tipo, datos, nombreEmpresa, nombreSucursal = "") {
  try {
    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte");

    // Configurar título y encabezados según el tipo de reporte
    let titulo = "";
    let columnas = [];

    switch (tipo) {
      case "sucursales":
        titulo = `Sucursales de ${nombreEmpresa}`;
        columnas = ["Nombre", "Municipio"];
        break;

      case "estructuras":
        titulo = `Estructuras de ${nombreEmpresa}`;
        columnas = ["Fecha de Creación", "Resolución"];
        break;

      case "empleados":
        titulo = `Empleados de ${nombreEmpresa}`;
        columnas = [
          "Nombre",
          "Apellido Paterno",
          "Apellido Materno",
          "CI",
          "Cargo",
          "Sucursal",
        ];
        break;

      case "empleados-sucursal":
        titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
        columnas = [
          "Nombre",
          "Apellido Paterno",
          "Apellido Materno",
          "CI",
          "Cargo",
        ];
        break;
    }

    // Agregar título
    worksheet.mergeCells(
      "A1:" + String.fromCharCode(64 + columnas.length) + "1"
    );
    worksheet.getCell("A1").value = titulo;
    worksheet.getCell("A1").font = { bold: true, size: 16 };
    worksheet.getCell("A1").alignment = { horizontal: "center" };

    // Agregar fecha de generación
    worksheet.mergeCells(
      "A2:" + String.fromCharCode(64 + columnas.length) + "2"
    );
    worksheet.getCell(
      "A2"
    ).value = `Generado el: ${new Date().toLocaleString()}`;
    worksheet.getCell("A2").font = { size: 10 };
    worksheet.getCell("A2").alignment = { horizontal: "center" };

    // Agregar encabezados
    const headerRow = worksheet.addRow(columnas);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD3D3D3" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Agregar datos
    switch (tipo) {
      case "sucursales":
        datos.forEach((sucursal) => {
          worksheet.addRow([
            sucursal.Nombre_Suc,
            sucursal.municipioNombre || "N/A",
          ]);
        });
        break;

      case "estructuras":
        datos.forEach((estructura) => {
          worksheet.addRow([
            estructura.Fecha_Creacion_Est
              ? new Date(estructura.Fecha_Creacion_Est).toLocaleDateString()
              : "N/A",
            estructura.Resolucion_Est || "N/A",
          ]);
        });
        break;

      case "empleados":
        datos.forEach((empleado) => {
          worksheet.addRow([
            empleado.Nombre_Emp,
            empleado.Paterno_Emp,
            empleado.Materno_Emp,
            empleado.CI_Emp,
            empleado.cargo || "N/A",
            empleado.sucursal || "N/A",
          ]);
        });
        break;

      case "empleados-sucursal":
        datos.forEach((empleado) => {
          worksheet.addRow([
            empleado.Nombre_Emp,
            empleado.Paterno_Emp,
            empleado.Materno_Emp,
            empleado.CI_Emp,
            empleado.cargo || "N/A",
          ]);
        });
        break;
    }

    // Ajustar ancho de columnas
    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Devolver respuesta con el archivo Excel
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=reporte-${tipo}-${
          new Date().toISOString().split("T")[0]
        }.xlsx`,
      },
    });
  } catch (error) {
    console.error("Error al generar Excel:", error);
    return NextResponse.json(
      { error: "Error al generar Excel" },
      { status: 500 }
    );
  }
}

// Función para generar PDF
async function generarPDF(tipo, datos, nombreEmpresa, nombreSucursal = "") {
  try {
    // Crear un buffer para almacenar el PDF
    const chunks = [];

    // Crear documento PDF sin especificar fuente
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    // Capturar datos del documento
    doc.on("data", (chunk) => chunks.push(chunk));

    // Configurar título y encabezados según el tipo de reporte
    let titulo = "";
    let columnas = [];

    switch (tipo) {
      case "sucursales":
        titulo = `Sucursales de ${nombreEmpresa}`;
        columnas = ["Nombre", "Municipio"];
        break;

      case "estructuras":
        titulo = `Estructuras de ${nombreEmpresa}`;
        columnas = ["Fecha de Creación", "Resolución"];
        break;

      case "empleados":
        titulo = `Empleados de ${nombreEmpresa}`;
        columnas = [
          "Nombre",
          "Apellido Paterno",
          "Apellido Materno",
          "CI",
          "Cargo",
          "Sucursal",
        ];
        break;

      case "empleados-sucursal":
        titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
        columnas = [
          "Nombre",
          "Apellido Paterno",
          "Apellido Materno",
          "CI",
          "Cargo",
        ];
        break;
    }

    // Agregar título (sin especificar fuente)
    doc.fontSize(16);
    doc.text(titulo, {
      align: "center",
    });
    doc.moveDown();

    // Agregar fecha de generación
    doc.fontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, {
      align: "center",
    });
    doc.moveDown(2);

    // Calcular ancho de columnas
    const pageWidth = doc.page.width - 100;
    const columnWidth = pageWidth / columnas.length;

    // Dibujar encabezados (sin especificar fuente)
    doc.fontSize(12);

    let y = doc.y;
    doc.rect(50, y, pageWidth, 20).fill("#D3D3D3").stroke("#000000");

    columnas.forEach((columna, index) => {
      doc.fillColor("#000000").text(columna, 50 + index * columnWidth, y + 5, {
        width: columnWidth,
        align: "center",
      });
    });

    doc.moveDown();
    y = doc.y;

    // Agregar datos (sin especificar fuente)
    let alturaFila = 20;
    let filasPorPagina = Math.floor((doc.page.height - 150) / alturaFila);
    let contadorFilas = 0;

    const dibujarFila = (valores, y) => {
      doc.rect(50, y, pageWidth, alturaFila).stroke("#000000");

      valores.forEach((valor, index) => {
        doc.text(valor.toString(), 50 + index * columnWidth, y + 5, {
          width: columnWidth,
          align: "center",
        });
      });

      return y + alturaFila;
    };

    switch (tipo) {
      case "sucursales":
        datos.forEach((sucursal, index) => {
          if (contadorFilas >= filasPorPagina) {
            doc.addPage();
            y = 50;
            contadorFilas = 0;
          }

          y = dibujarFila(
            [sucursal.Nombre_Suc, sucursal.municipioNombre || "N/A"],
            y
          );

          contadorFilas++;
        });
        break;

      case "estructuras":
        datos.forEach((estructura, index) => {
          if (contadorFilas >= filasPorPagina) {
            doc.addPage();
            y = 50;
            contadorFilas = 0;
          }

          y = dibujarFila(
            [
              estructura.Fecha_Creacion_Est
                ? new Date(estructura.Fecha_Creacion_Est).toLocaleDateString()
                : "N/A",
              estructura.Resolucion_Est || "N/A",
            ],
            y
          );

          contadorFilas++;
        });
        break;

      case "empleados":
        datos.forEach((empleado, index) => {
          if (contadorFilas >= filasPorPagina) {
            doc.addPage();
            y = 50;
            contadorFilas = 0;
          }

          y = dibujarFila(
            [
              empleado.Nombre_Emp,
              empleado.Paterno_Emp,
              empleado.Materno_Emp,
              empleado.CI_Emp,
              empleado.cargo || "N/A",
              empleado.sucursal || "N/A",
            ],
            y
          );

          contadorFilas++;
        });
        break;

      case "empleados-sucursal":
        datos.forEach((empleado, index) => {
          if (contadorFilas >= filasPorPagina) {
            doc.addPage();
            y = 50;
            contadorFilas = 0;
          }

          y = dibujarFila(
            [
              empleado.Nombre_Emp,
              empleado.Paterno_Emp,
              empleado.Materno_Emp,
              empleado.CI_Emp,
              empleado.cargo || "N/A",
            ],
            y
          );

          contadorFilas++;
        });
        break;
    }

    // Finalizar documento y devolver respuesta
    return new Promise((resolve, reject) => {
      doc.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(buffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename=reporte-${tipo}-${
                new Date().toISOString().split("T")[0]
              }.pdf`,
            },
          })
        );
      });

      doc.on("error", (error) => {
        console.error("Error al generar PDF:", error);
        reject(
          NextResponse.json({ error: "Error al generar PDF" }, { status: 500 })
        );
      });

      doc.end();
    });
  } catch (error) {
    console.error("Error al generar PDF:", error);
    return NextResponse.json(
      { error: "Error al generar PDF" },
      { status: 500 }
    );
  }
}

// Función principal para manejar la solicitud
export async function GET(request) {
  try {
    // Obtener parámetros de la solicitud
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");
    const empresaId = searchParams.get("empresaId");
    const sucursalId = searchParams.get("sucursalId");
    const formato = searchParams.get("formato");

    // Validar parámetros
    if (!tipo || !empresaId || !formato) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    // Obtener nombre de la empresa
    const [empresaRows] = await pool.query(
      "SELECT Nombre_Emp FROM TbEmpresa WHERE Id_Empresa = ?",
      [empresaId]
    );

    if (empresaRows.length === 0) {
      return NextResponse.json(
        { error: "Empresa no encontrada" },
        { status: 404 }
      );
    }

    const nombreEmpresa = empresaRows[0].Nombre_Emp;
    let nombreSucursal = "";

    // Si es reporte por sucursal, obtener nombre de la sucursal
    if (tipo === "empleados-sucursal" && sucursalId) {
      const [sucursalRows] = await pool.query(
        "SELECT Nombre_Suc FROM TbSucursal WHERE Id_Sucursal = ?",
        [sucursalId]
      );

      if (sucursalRows.length === 0) {
        return NextResponse.json(
          { error: "Sucursal no encontrada" },
          { status: 404 }
        );
      }

      nombreSucursal = sucursalRows[0].Nombre_Suc;
    }

    // Consultas según el tipo de reporte
    let datos = [];

    switch (tipo) {
      case "sucursales":
        const sucursalesQuery = `
         SELECT s.*, m.Nombre_Mun AS municipioNombre
          FROM TbSucursal s
          LEFT JOIN TbMunicipio m ON s.Id_Municipio_Suc = m.Id_Municipio
          WHERE s.Id_Sucursal IN (
              SELECT Id_Sucursal_ES FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ?
          )

        `;
        [datos] = await pool.query(sucursalesQuery, [empresaId]);
        break;

      case "estructuras":
        const estructurasQuery = `
          SELECT * FROM TbEstructura
          WHERE Id_Estructura = ?
        `;
        [datos] = await pool.query(estructurasQuery, [empresaId]);
        break;

      case "empleados":
        const empleadosQuery = `
          SELECT e.*, c.Nombre_Car as cargo, s.Nombre_Suc as sucursal
          FROM TbEmpleado e
          JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
          LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
          JOIN TbSucursal s ON e.Id_Sucursal = s.Id_Sucursal
          JOIN TbEmpresaSucursal es ON es.Id_Sucursal_ES = s.Id_Sucursal
          WHERE es.Id_Empresa_ES = ? AND ec.Estado_EC = 'AC'
          GROUP BY e.Id_Empleado
        `;
        [datos] = await pool.query(empleadosQuery, [empresaId]);
        break;

      case "empleados-sucursal":
        const empleadosSucursalQuery = `
         

SELECT DISTINCT 
    e.Id_Empleado, 
    e.Nombre_Emp, 
    e.Paterno_Emp, 
    e.Materno_Emp, 
    e.CI_Emp, 
    COALESCE(c.Nombre_Car, 'Sin Cargo') AS cargo
FROM TbEmpleado e
JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
JOIN TbEmpresaSucursal es ON es.Id_Sucursal_ES = (
    SELECT Id_Sucursal_ES FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ?
    ORDER BY Id_Sucursal_ES LIMIT ?
)
WHERE ec.Estado_EC = 'AC'
ORDER BY e.Paterno_Emp, e.Nombre_Emp;

        `;
        [datos] = await pool.query(empleadosSucursalQuery, [sucursalId]);
        break;

      default:
        return NextResponse.json(
          { error: "Tipo de reporte no válido" },
          { status: 400 }
        );
    }

    // Generar el reporte según el formato solicitado
    if (formato === "excel") {
      return await generarExcel(tipo, datos, nombreEmpresa, nombreSucursal);
    } else if (formato === "pdf") {
      return await generarPDF(tipo, datos, nombreEmpresa, nombreSucursal);
    } else {
      return NextResponse.json({ error: "Formato no válido" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al exportar reporte:", error);
    return NextResponse.json(
      { error: "Error al exportar reporte" },
      { status: 500 }
    );
  }
}
