import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const formato = searchParams.get('formato');
    const empresaId = searchParams.get('empresaId');
    const sucursalId = searchParams.get('sucursalId');

    if (!tipo || !formato || !empresaId) {
      return NextResponse.json({ error: 'Parámetros incompletos' }, { status: 400 });
    }

    // Verificar si necesitamos sucursalId para el tipo de reporte
    if (tipo === 'empleados-sucursal' && !sucursalId) {
      return NextResponse.json({ error: 'ID de sucursal no proporcionado' }, { status: 400 });
    }

    // Obtener el nombre de la empresa para el título del reporte
    const [empresas] = await pool.query('SELECT nombre FROM TbEmpresa WHERE id = ?', [empresaId]);
    
    if (empresas.length === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    const nombreEmpresa = empresas[0].nombre;
    
    // Obtener datos según el tipo de reporte
    let datos = [];
    let nombreSucursal = '';
    
    switch (tipo) {
      case 'sucursales':
        const [sucursales] = await pool.query(`
          SELECT s.id, s.nombre, s.direccion, s.telefono, m.nombre as municipioNombre
          FROM TbSucursal s
          JOIN TbEmpresaSucursal es ON s.id = es.sucursalId
          LEFT JOIN TbMunicipio m ON s.municipioId = m.id
          WHERE es.empresaId = ?
        `, [empresaId]);
        datos = sucursales;
        break;
        
      case 'estructuras':
        const [estructuras] = await pool.query(`
          SELECT id, nombre, descripcion, nivel
          FROM TbEstructura
          WHERE empresaId = ?
          ORDER BY nivel ASC
        `, [empresaId]);
        datos = estructuras;
        break;
        
      case 'empleados':
        const [empleados] = await pool.query(`
          SELECT e.id, e.nombre, e.apellido, e.email, e.telefono, 
                c.nombre as cargo, s.nombre as sucursal
          FROM TbEmpleado e
          JOIN TbSucursal s ON e.sucursalId = s.id
          JOIN TbEmpresaSucursal es ON s.id = es.sucursalId
          LEFT JOIN TbEmpleadoCargo ec ON e.id = ec.empleadoId
          LEFT JOIN TbCargo c ON ec.cargoId = c.id
          WHERE es.empresaId = ?
        `, [empresaId]);
        datos = empleados;
        break;
        
      case 'empleados-sucursal':
        // Obtener el nombre de la sucursal
        const [sucursalInfo] = await pool.query('SELECT nombre FROM TbSucursal WHERE id = ?', [sucursalId]);
        if (sucursalInfo.length > 0) {
          nombreSucursal = sucursalInfo[0].nombre;
        }
        
        const [empleadosSucursal] = await pool.query(`
          SELECT e.id, e.nombre, e.apellido, e.email, e.telefono, 
                c.nombre as cargo, s.nombre as sucursal
          FROM TbEmpleado e
          JOIN TbSucursal s ON e.sucursalId = s.id
          LEFT JOIN TbEmpleadoCargo ec ON e.id = ec.empleadoId
          LEFT JOIN TbCargo c ON ec.cargoId = c.id
          WHERE e.sucursalId = ?
        `, [sucursalId]);
        datos = empleadosSucursal;
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

async function generarExcel(tipo, datos, nombreEmpresa, nombreSucursal = '') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte');
  
  // Configurar estilos
  const titleStyle = {
    font: { bold: true, size: 16 },
    alignment: { horizontal: 'center' }
  };
  
  const headerStyle = {
    font: { bold: true },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3D3D3' }
    },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };
  
  const cellStyle = {
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };
  
  // Configurar título según el tipo de reporte
  let titulo = '';
  let columnas = [];
  
  switch (tipo) {
    case 'sucursales':
      titulo = `Sucursales de ${nombreEmpresa}`;
      columnas = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Dirección', key: 'direccion', width: 40 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Municipio', key: 'municipioNombre', width: 30 }
      ];
      break;
      
    case 'estructuras':
      titulo = `Estructuras de ${nombreEmpresa}`;
      columnas = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Descripción', key: 'descripcion', width: 40 },
        { header: 'Nivel', key: 'nivel', width: 10 }
      ];
      break;
      
    case 'empleados':
      titulo = `Empleados de ${nombreEmpresa}`;
      columnas = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Apellido', key: 'apellido', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Cargo', key: 'cargo', width: 20 },
        { header: 'Sucursal', key: 'sucursal', width: 30 }
      ];
      break;
      
    case 'empleados-sucursal':
      titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
      columnas = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Apellido', key: 'apellido', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Cargo', key: 'cargo', width: 20 }
      ];
      break;
  }
  
  // Agregar título
  worksheet.mergeCells('A1:' + String.fromCharCode(65 + columnas.length - 1) + '1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = titulo;
  titleCell.style = titleStyle;
  
  // Agregar fecha de generación
  worksheet.mergeCells('A2:' + String.fromCharCode(65 + columnas.length - 1) + '2');
  const dateCell = worksheet.getCell('A2');
  dateCell.value = `Generado el: ${new Date().toLocaleString()}`;
  dateCell.style = { alignment: { horizontal: 'center' } };
  
  // Agregar encabezados
  worksheet.columns = columnas;
  
  // Aplicar estilo a los encabezados
  worksheet.getRow(3).eachCell((cell) => {
    cell.style = headerStyle;
  });
  
  // Agregar datos
  worksheet.addRows(datos);
  
  // Aplicar estilo a las celdas de datos
  for (let i = 4; i <= datos.length + 3; i++) {
    worksheet.getRow(i).eachCell((cell) => {
      cell.style = cellStyle;
    });
  }
  
  // Generar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  
  // Crear respuesta
  const headers = new Headers();
  headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  headers.append('Content-Disposition', `attachment; filename=reporte-${tipo}-${new Date().toISOString().split('T')[0]}.xlsx`);
  
  return new NextResponse(buffer, {
    status: 200,
    headers
  });
}

async function generarPDF(tipo, datos, nombreEmpresa, nombreSucursal = '') {
  return new Promise((resolve) => {
    // Crear documento PDF
    const doc = new PDFDocument({ margin: 50 });
    
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
        columnas = ['ID', 'Nombre', 'Dirección', 'Teléfono', 'Municipio'];
        break;
        
      case 'estructuras':
        titulo = `Estructuras de ${nombreEmpresa}`;
        columnas = ['ID', 'Nombre', 'Descripción', 'Nivel'];
        break;
        
      case 'empleados':
        titulo = `Empleados de ${nombreEmpresa}`;
        columnas = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Cargo', 'Sucursal'];
        break;
        
      case 'empleados-sucursal':
        titulo = `Empleados de la Sucursal ${nombreSucursal} - ${nombreEmpresa}`;
        columnas = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Cargo'];
        break;
    }
    
    // Agregar título
    doc.fontSize(16).font('Helvetica-Bold').text(titulo, { align: 'center' });
    doc.moveDown();
    
    // Agregar fecha de generación
    doc.fontSize(10).font('Helvetica').text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);
    
    // Calcular ancho de columnas
    const pageWidth = doc.page.width - 100;
    const columnWidth = pageWidth / columnas.length;
    
    // Dibujar encabezados
    doc.fontSize(10).font('Helvetica-Bold');
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
    doc.fontSize(9).font('Helvetica');
    
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
        doc.fontSize(10).font('Helvetica-Bold');
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
        doc.fontSize(9).font('Helvetica');
      }
      
      // Dibujar datos según el tipo de reporte
      switch (tipo) {
        case 'sucursales':
          doc.fillColor('#000000')
            .text(fila.id.toString(), 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.nombre, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.direccion, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.telefono, 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.municipioNombre || 'N/A', 50 + (4 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'estructuras':
          doc.fillColor('#000000')
            .text(fila.id.toString(), 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.nombre, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.descripcion, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.nivel.toString(), 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'empleados':
          doc.fillColor('#000000')
            .text(fila.id.toString(), 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.nombre, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.apellido, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.email, 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.telefono, 50 + (4 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.cargo || 'N/A', 50 + (5 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.sucursal, 50 + (6 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
          break;
          
        case 'empleados-sucursal':
          doc.fillColor('#000000')
            .text(fila.id.toString(), 50, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.nombre, 50 + columnWidth, y + 5, { width: columnWidth, align: 'center' })
            .text(fila.apellido, 50 + (2 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.email, 50 + (3 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.telefono, 50 + (4 * columnWidth), y + 5, { width: columnWidth, align: 'center' })
            .text(fila.cargo || 'N/A', 50 + (5 * columnWidth), y + 5, { width: columnWidth, align: 'center' });
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