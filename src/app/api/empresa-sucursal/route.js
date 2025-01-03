import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Obtener todas las relaciones
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpresaSucursal');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nueva relación
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      Id_Empresa, 
      Id_Sucursal, 
      Fecha_Apertura_ES, 
      Fecha_Cierre_ES, 
      Estado_ES 
    } = data;
    
    // Verificar si la relación ya existe
    const [existingRows] = await pool.query(
      'SELECT * FROM TbEmpresaSucursal WHERE Id_Empresa = ? AND Id_Sucursal = ?',
      [Id_Empresa, Id_Sucursal]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Esta relación empresa-sucursal ya existe' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'INSERT INTO TbEmpresaSucursal (Id_Empresa, Id_Sucursal, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES) VALUES (?, ?, ?, ?, ?)',
      [Id_Empresa, Id_Sucursal, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES || 'Activo']
    );
    
    if (result.affectedRows === 0) {
      throw new Error('No se pudo crear la relación');
    }

    return NextResponse.json({ 
      message: 'Relación creada correctamente',
      data: { Id_Empresa, Id_Sucursal, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES }
    }, { status: 201 });
  } catch (error) {
    console.error('Error en POST empresa-sucursal:', error);
    return NextResponse.json({ 
      error: error.message || 'Error al crear la relación empresa-sucursal'
    }, { status: 500 });
  }
} 