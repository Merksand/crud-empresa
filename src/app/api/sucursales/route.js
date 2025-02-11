import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        suc.Id_Sucursal,
        suc.Id_Municipio_Suc,
        mun.Nombre_Mun AS Nombre_Municipio,
        suc.Id_Geolocalizacion_Suc,
        geo.Latitud_Geo,
        geo.Longitud_Geo,
        suc.Nombre_Parametro_Suc,
        suc.Nombre_Suc,
        suc.Estado_Suc
      FROM TbSucursal suc
      LEFT JOIN TbMunicipio mun ON suc.Id_Municipio_Suc = mun.Id_Municipio
      LEFT JOIN TbGeolocalizacion geo ON suc.Id_Geolocalizacion_Suc = geo.Id_Geolocalizacion
    WHERE suc.Estado_Suc = 'AC'`);
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
      [Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, 'AC']
    );
    
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 