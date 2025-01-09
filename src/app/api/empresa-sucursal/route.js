import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
// GET - Obtener todas las relaciones de TbEmpresaSucursal
export async function GET() {
  try {
    // Realizar la consulta para obtener todas las relaciones
    const [rows] = await pool.query(`
      SELECT 
        es.Id_Empresa_Sucursal,
        es.Id_Empresa_ES,
        es.Id_Sucursal_ES,
        es.Fecha_Apertura_ES,
        es.Fecha_Cierre_ES,
        es.Estado_ES,
        e.Nombre_Emp AS Nombre_Empresa,
        s.Nombre_Suc AS Nombre_Sucursal
      FROM TbEmpresaSucursal es
      LEFT JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
      LEFT JOIN TbSucursal s ON es.Id_Sucursal_ES = s.Id_Sucursal
    `);

    // Si no hay datos, devolver un mensaje claro
    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'No se encontraron relaciones en TbEmpresaSucursal' },
        { status: 404 }
      );
    }

    // Devolver los datos obtenidos
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error en GET /api/empresaSucursal:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener las relaciones' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva relación
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      Id_Empresa_ES, 
      Id_Sucursal_ES, 
      Fecha_Apertura_ES, 
      Fecha_Cierre_ES, 
      Estado_ES 
    } = data;
    
    // Verificar si la relación ya existe
    const [existingRows] = await pool.query(
      'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ? AND Id_Sucursal_ES = ?',
      [Id_Empresa_ES, Id_Sucursal_ES]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Esta relación empresa-sucursal ya existe' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'INSERT INTO TbEmpresaSucursal (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES) VALUES (?, ?, ?, ?, ?)',
      [Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES || 'Activo']
    );
    
    if (result.affectedRows === 0) {
      throw new Error('No se pudo crear la relación');
    }

    return NextResponse.json({ 
      message: 'Relación creada correctamente',
      data: { Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES }
    }, { status: 201 });
  } catch (error) {
    console.error('Error en POST empresa-sucursal:', error);
    return NextResponse.json({ 
      error: error.message || 'Error al crear la relación empresa-sucursal'
    }, { status: 500 });
  }
} 