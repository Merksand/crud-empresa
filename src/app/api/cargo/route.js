import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('CALL GetActiveCargos()');
        return NextResponse.json(rows[0]);  
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// POST - Crear un nuevo cargo
export async function POST(request) {
  try {
      const data = await request.json();
      const { 
          Nombre_Car, 
          Nivel_Car, 
          Sueldo_Car, 
          Sueldo_USD_Car, 
          Resolucion_Car,
      } = data;

      // Llamada al procedimiento almacenado
      const [result] = await pool.query(
          'CALL InsertCargo(?, ?, ?, ?, ?)',
          [Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car]
      );

      const insertId = result[0]?.[0]?.insertId;

      return NextResponse.json({ id: insertId }, { status: 201 });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

