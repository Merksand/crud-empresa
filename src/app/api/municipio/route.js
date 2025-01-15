import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todos los municipios

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provinciaId = searchParams.get('provincia');

    if (!provinciaId) {
      return NextResponse.json({ error: 'ID de la provincia requerido' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT Id_Municipio, Nombre_Mun FROM TbMunicipio WHERE Id_Provincia_Mun = ?',
      [provinciaId]
    );

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
        Estado_Mun || 'Activo',
      ]
    );

    return NextResponse.json(
      {
        message: 'Municipio creado correctamente',
        data: {
          Id_Provincia_Mun,
          Nombre_Mun,
          Estado_Mun: Estado_Mun || 'Activo',
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
