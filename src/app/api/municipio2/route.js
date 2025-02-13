import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todos los municipios
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbMunicipio order by Nombre_Mun');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear un nuevo municipio
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Provincia_Mun,
      Nombre_Mun,
      Estado_Mun,
    } = data;

    // Verificar si ya existe un municipio con el mismo nombre en la misma provincia
    const [existingRows] = await pool.query(
      'SELECT * FROM TbMunicipio WHERE Nombre_Mun = ? AND Id_Provincia_Mun = ?',
      [Nombre_Mun, Id_Provincia_Mun]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Ya existe un municipio con este nombre en la misma provincia' },
        { status: 400 }
      );
    }

    // Insertar el nuevo municipio
    const [result] = await pool.query(
      `INSERT INTO TbMunicipio 
       (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) 
       VALUES (?, ?, ?)`,
      [
        Id_Provincia_Mun,
        Nombre_Mun,
        Estado_Mun || 'AC',
      ]
    );

    return NextResponse.json(
      {
        message: 'Municipio creado correctamente',
        data: {
          Id_Provincia_Mun,
          Nombre_Mun,
          Estado_Mun: Estado_Mun || 'AC',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST municipio:', error);
    return NextResponse.json(
      {
        error: error.message || 'Error al crear el municipio',
      },
      { status: 500 }
    );
  }
}
