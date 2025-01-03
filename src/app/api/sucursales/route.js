import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Obtener todas las sucursales
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbSucursal');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nueva sucursal
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      Id_Municipio_Suc, 
      Id_Geolocalizacion_Suc, 
      Nombre_Parametro_Suc, 
      Nombre_Suc, 
      Estado_Suc 
    } = data;
    
    const [result] = await pool.query(
      'INSERT INTO TbSucursal (Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc) VALUES (?, ?, ?, ?, ?)',
      [Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc]
    );
    
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 