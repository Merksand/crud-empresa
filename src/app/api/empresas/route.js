import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todas las empresas
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM tbempresa');
    
    // Asegurarnos de que siempre devolvemos un array
    const empresas = Array.isArray(rows) ? rows : [];
    
    return NextResponse.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return NextResponse.json(
      { message: 'Error al obtener las empresas' },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva empresa
export async function POST(request) {
  try {
    const data = await request.json();
    
    const [result] = await pool.query(
      'INSERT INTO tbempresa (nombre_empresa, direccion_empresa, telefono_empresa, correo_empresa, estado_empresa) VALUES (?, ?, ?, ?, ?)',
      [data.nombre, data.direccion, data.telefono, data.correo, data.estado]
    );

    return NextResponse.json(
      { message: 'Empresa creada correctamente', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear la empresa' },
      { status: 500 }
    );
  }
} 