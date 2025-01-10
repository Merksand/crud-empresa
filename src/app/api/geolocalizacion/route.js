import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        geo.Id_Geolocalizacion,
        geo.Id_Persona_Geo,
        per.Nombre_Per,
        per.Paterno_Per,
        geo.Latitud_Geo,
        geo.Longitud_Geo,
        geo.Estado_Geo
      FROM TbGeolocalizacion geo
      LEFT JOIN TbPersona per ON geo.Id_Persona_Geo = per.Id_Persona
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    const data = await request.json();
    const { Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Estado_Geo } = data;

    const [result] = await pool.query(
      `INSERT INTO TbGeolocalizacion (Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Estado_Geo)
       VALUES (?, ?, ?, ?)`,
      [Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Estado_Geo]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
