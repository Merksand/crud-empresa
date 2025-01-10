import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Estado_Geo } = data;

    const [result] = await pool.query(
      `UPDATE TbGeolocalizacion
       SET Id_Persona_Geo = ?, Latitud_Geo = ?, Longitud_Geo = ?, Estado_Geo = ?
       WHERE Id_Geolocalizacion = ?`,
      [Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Estado_Geo, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Geolocalización no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Geolocalización actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const [result] = await pool.query(
      `DELETE FROM TbGeolocalizacion WHERE Id_Geolocalizacion = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Geolocalización no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Geolocalización eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
