import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

// Función para generar Excel
async function generarExcel(tipo, datos, nombreEmpresa, nombreSucursal = '') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte');
  
  // Configurar título según el tipo de reporte
  let titulo = '';
  let columnas = [];
  
  switch (tipo) {
    case 'sucursales':
      titulo = `Sucursales de ${nombreEmpresa}`;
      columnas = [
        { header: 'Nombre', key: 'nombre' },
        { header: 'Municipio', key: 'municipio' }
      ];
      break;
      
    case 'estructuras':
      titulo = `Estructuras de ${nombreEmpresa}`;
      columnas = [
        { header: 'Fecha de Creación', key: 'fechaCreacion' },
        { header: 'Resolución', key: 'resolucion' }
      ];
      break;
      
    case 'empleados':
      titulo = `Empleados de ${nombreEmpresa}`;
      columnas = [
        { header: 'Nombre', key: 'nombre' },
        { header: 'Apellido Paterno', key: 'paterno' },
        { header: 'Apellido Materno', key: 'materno' },
        { header: 'CI', key: 'ci' },
        { header: 'Cargo', key: 'cargo' },
        { header: 'Sucursal', key: 'sucursal' }
      ];
      break;
      
    case 'empleados-sucursal':
      titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
      columnas = [
        { header: 'Nombre', key: 'nombre' },
        { header: 'Apellido Paterno', key: 'paterno' },
        { header: 'Apellido Materno', key: 'materno' },
        { header: 'CI', key: 'ci' },
        { header: 'Cargo', key: 'cargo' }
      ];
      break;
  }
  
  // Agregar título
  worksheet.mergeCells('A1:' + String.fromCharCode(65 + columnas.length - 1) + '1');
  worksheet.getCell('A1').value = titulo;
  worksheet.getCell('A1').font = { bold: true, size: 16 };
  worksheet.getCell('A1').alignment = { horizontal: 'center' };
  
  // Agregar fecha de generación
  worksheet.mergeCells('A2:' + String.fromCharCode(65 + columnas.length - 1) + '2');
  worksheet.getCell('A2').value = `Generado el: ${new Date().toLocaleString()}`;
  worksheet.getCell('A2').font = { size: 10 };
  worksheet.getCell('A2').alignment = { horizontal: 'center' };
  
  // Agregar encabezados
  worksheet.addRow([]);
  worksheet.columns = columnas;
  
  // Estilo para encabezados
  worksheet.getRow(4).font = { bold: true };
  worksheet.getRow(4).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFD3D3D3' }
  };
  
  // Agregar datos
  switch (tipo) {
    case 'sucursales':
      datos.forEach(fila => {
        worksheet.addRow({
          nombre: fila.Nombre_Suc,
          municipio: fila.municipioNombre || 'N/A'
        });
      });
      break;
      
    case 'estructuras':
      datos.forEach(fila => {
        worksheet.addRow({
          fechaCreacion: fila.Fecha_Creacion_Est ? new Date(fila.Fecha_Creacion_Est).toLocaleDateString() : 'N/A',
          resolucion: fila.Resolucion_Est || 'N/A'
        });
      });
      break;
      
    case 'empleados':
      datos.forEach(fila => {
        worksheet.addRow({
          nombre: fila.Nombre_Emp,
          paterno: fila.Paterno_Emp,
          materno: fila.Materno_Emp,
          ci: fila.CI_Emp,
          cargo: fila.cargo || 'N/A',
          sucursal: fila.sucursal
        });
      });
      break;
      
    case 'empleados-sucursal':
      datos.forEach(fila => {
        worksheet.addRow({
          nombre: fila.Nombre_Emp,
          paterno: fila.Paterno_Emp,
          materno: fila.Materno_Emp,
          ci: fila.CI_Emp,
          cargo: fila.cargo || 'N/A'
        });
      });
      break;
  }
  
  // Ajustar ancho de columnas
  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength + 2;
  });
  
  // Generar buffer
  const buffer = await workbook.xlsx.writeBuffer();
  
  // Configurar respuesta
  const headers = new Headers();
  headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  headers.append('Content-Disposition', `attachment; filename=reporte-${tipo}-${new Date().toISOString().split('T')[0]}.xlsx`);
  
  return new NextResponse(buffer, {
    status: 200,
    headers
  });
}

// Función para generar PDF
async function generarPDF(tipo, datos, nombreEmpresa, nombreSucursal = '') {
  return new Promise((resolve) => {
    // Crear documento PDF con configuración para evitar problemas de fuentes
    const doc = new PDFDocument({
      margin: 50,
      autoFirstPage: true,
      size: 'A4',
      layout: 'portrait',
      info: {
        Title: `Reporte de ${tipo}`,
        Author: 'Sistema de Reportes',
      }
    });
    
    // Recopilar chunks para crear el buffer
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const headers = new Headers();
      headers.append('Content-Type', 'application/pdf');
      headers.append('Content-Disposition', `attachment; filename=reporte-${tipo}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      resolve(new NextResponse(buffer, {
        status: 200,
        headers
      }));
    });
    
    // Configurar título según el tipo de reporte
    let titulo = '';
    let columnas = [];
    
    switch (tipo) {
      case 'sucursales':
        titulo = `Sucursales de ${nombreEmpresa}`;
        columnas = ['Nombre', 'Municipio'];
        break;
        
      case 'estructuras':
        titulo = `Estructuras de ${nombreEmpresa}`;
        columnas = ['Fecha de Creación', 'Resolución'];
        break;
        
      case 'empleados':
        titulo = `Empleados de ${nombreEmpresa}`;
        columnas = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'CI', 'Cargo', 'Sucursal'];
        break;
        
      case 'empleados-sucursal':
        titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
        columnas = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'CI', 'Cargo'];
        break;
    }
    
    // Agregar título
    doc.fontSize(16).text(titulo, { align: 'center' });
    doc.moveDown();
    
    // Agregar fecha de generación
    doc.fontSize(10).text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);
    
    // Calcular ancho de columnas
    const pageWidth = doc.page.width - 100;
    const columnWidth = pageWidth / columnas.length;
    
    // Dibujar encabezados
    doc.fontSize(10);
    let y = doc.y;
    doc.rect(50, y, pageWidth, 20).fill('#D3D3D3').stroke('#000000');
    
    columnas.forEach((columna, i) => {
      doc.fillColor('#000000').text(
        columna,
        50 + (i * columnWidth),
        y + 5,
        { width: columnWidth, align: 'center' }
      );
    });
    
    doc.moveDown();
    y = doc.y;
    
    // Dibujar datos
    doc.fontSize(9);
    
    datos.forEach((fila, index) => {
      // Alternar color de fondo para las filas
      if (index % 2 === 0) {
        doc.rect(50, y, pageWidth, 20).fill('#F9F9F9').stroke('#000000');
      } else {
        doc.rect(50, y, pageWidth, 20).fill('#FFFFFF').stroke('#000000');
      }
      
      // Verificar si necesitamos una nueva página
      if (y > doc.page.height - 100) {
        doc.addPage();
        y = 50;
        
        // Repetir encabezados en la nueva página
        doc.fontSize(10);
        doc.rect(50, y, pageWidth, 20).fill('#D3D3D3').stroke('#000000');
        
        columnas.forEach((columna, i) => {
          doc.fillColor('#000000').text(
            columna,
            50 + (i * columnWidth),
            y + 5,
            { width: columnWidth, align: 'center' }
          );
        });
        
        doc.moveDown();
        y = doc.y;
        doc.fontSize(9);
      }
      
      // Dibujar datos según el tipo de reporte
      switch (tipo) {
        case 'sucursales':
          doc.fillColor('#000000')
            .text(fila.Nombre_Suc, 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.municipioNombre || 'N/A', 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'estructuras':
          doc.fillColor('#000000')
            .text(fila.Fecha_Creacion_Est ? new Date(fila.Fecha_Creacion_Est).toLocaleDateString() : 'N/A', 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.Resolucion_Est || 'N/A', 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'empleados':
          doc.fillColor('#000000')
            .text(fila.Nombre_Emp, 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.Paterno_Emp, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.Materno_Emp, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.CI_Emp, 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.cargo || 'N/A', 50 + (4 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.sucursal, 50 + (5 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'empleados-sucursal':
          doc.fillColor('#000000')
            .text(fila.Nombre_Emp, 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.Paterno_Emp, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.Materno_Emp, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.CI_Emp, 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.cargo || 'N/A', 50 + (4 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
          break;
      }
      
      y += 20;
    });
    
    // Agregar numeración de páginas
    const totalPaginas = doc.bufferedPageRange().count;
    for (let i = 0; i < totalPaginas; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).text(
        `Página ${i + 1} de ${totalPaginas}`,
        50,
        doc.page.height - 50,
        { align: 'center', width: doc.page.width - 100 }
      );
    }
    
    // Finalizar documento
    doc.end();
  });
}

// Función principal para manejar la solicitud
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const empresaId = searchParams.get('empresaId');
    const sucursalId = searchParams.get('sucursalId');
    const formato = searchParams.get('formato');
    
    if (!tipo || !empresaId || !formato) {
      return NextResponse.json({ error: 'Parámetros incompletos' }, { status: 400 });
    }
    
    // Obtener nombre de la empresa - Nombre correcto de tabla y columna
    const empresaQuery = 'SELECT Nombre_Emp FROM TbEmpresa WHERE Id_Empresa = ?';
    const [empresaResult] = await pool.query(empresaQuery, [empresaId]);
    
    if (empresaResult.length === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    const nombreEmpresa = empresaResult[0].Nombre_Emp;
    let nombreSucursal = '';
    
    // Si es reporte de empleados por sucursal, obtener nombre de la sucursal - Nombre correcto de tabla y columna
    if (tipo === 'empleados-sucursal' && sucursalId) {
      const sucursalQuery = 'SELECT Nombre_Suc FROM TbSucursal WHERE Id_Sucursal = ?';
      const [sucursalResult] = await pool.query(sucursalQuery, [sucursalId]);
      
      if (sucursalResult.length === 0) {
        return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 });
      }
      
      nombreSucursal = sucursalResult[0].Nombre_Suc;
    }
    
    // Obtener datos según el tipo de reporte - Nombres correctos de tablas y columnas
    let datos = [];
    
    switch (tipo) {
      case 'sucursales':
        // Consulta para obtener sucursales de una empresa
        const sucursalesQuery = `
          SELECT s.*, m.Nombre_Mun as municipioNombre
          FROM TbSucursal s
          LEFT JOIN TbMunicipio m ON s.Id_Municipio_Suc = m.Id_Municipio
          JOIN TbEmpresaSucursal es ON s.Id_Sucursal = es.Id_Sucursal_ES
          WHERE es.Id_Empresa_ES = ?
        `;
        [datos] = await pool.query(sucursalesQuery, [empresaId]);
        break;
        
      case 'estructuras':
        // Consulta para obtener estructuras de una empresa
        const estructurasQuery = 'SELECT * FROM TbEstructura WHERE Id_Empresa_Est = ?';
        [datos] = await pool.query(estructurasQuery, [empresaId]);
        break;
        
      case 'empleados':
        // Consulta para obtener empleados de una empresa con sus cargos y sucursales
        const empleadosQuery = `
          SELECT e.*, c.Nombre_Car as cargo, s.Nombre_Suc as sucursal
          FROM TbEmpleado e
          JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
          LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
          JOIN TbEmpresaSucursal es ON es.Id_Empresa_ES = ?
          JOIN TbSucursal s ON es.Id_Sucursal_ES = s.Id_Sucursal
          WHERE ec.Estado_EC = 'Activo'
          GROUP BY e.Id_Empleado
        `;
        [datos] = await pool.query(empleadosQuery, [empresaId]);
        break;
        
      case 'empleados-sucursal':
        if (!sucursalId) {
          return NextResponse.json({ error: 'ID de sucursal requerido para este reporte' }, { status: 400 });
        }
        
        // Consulta para obtener empleados de una sucursal específica con sus cargos
        const empleadosSucursalQuery = `
          SELECT e.*, c.Nombre_Car as cargo
          FROM TbEmpleado e
          JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
          LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
          JOIN TbEmpresaSucursal es ON es.Id_Sucursal_ES = ?
          WHERE ec.Estado_EC = 'Activo'
          GROUP BY e.Id_Empleado
        `;
        [datos] = await pool.query(empleadosSucursalQuery, [sucursalId]);
        break;
        
      default:
        return NextResponse.json({ error: 'Tipo de reporte no válido' }, { status: 400 });
    }
    
    // Generar el reporte según el formato solicitado
    if (formato === 'excel') {
      return await generarExcel(tipo, datos, nombreEmpresa, nombreSucursal);
    } else if (formato === 'pdf') {
      return await generarPDF(tipo, datos, nombreEmpresa, nombreSucursal);
    } else {
      return NextResponse.json({ error: 'Formato no válido' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Error al exportar reporte:', error);
    return NextResponse.json({ error: 'Error al exportar reporte' }, { status: 500 });
  }
} 