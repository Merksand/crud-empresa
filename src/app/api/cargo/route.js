import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todos los cargos
export async function GET() {
    try {
      const [rows] = await pool.query('SELECT * FROM TbCargo');
      return NextResponse.json(rows);
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
        Estado_Dep 
      } = data;
  
      const [result] = await pool.query(
        'INSERT INTO TbCargo (Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep) VALUES (?, ?, ?, ?, ?, ?)',
        [Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep]
      );
  
      return NextResponse.json({ id: result.insertId }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  