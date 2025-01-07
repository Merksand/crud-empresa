import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEstructura WHERE Id_Estructura = ?', [params.id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Obtener los datos enviados desde el cliente
    const data = await request.json();
    const { Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est } = data;

    // Validar que los datos necesarios estén presentes
    if (!Id_Empresa || !Fecha_Creacion_Est || !Resolucion_Est || !Estado_Est) {
      return NextResponse.json(
        { error: "Datos incompletos para actualizar la estructura" },
        { status: 400 }
      );
    }

    // Realizar la consulta de actualización
    const [result] = await pool.query(
      "UPDATE TbEstructura SET Id_Empresa = ?, Fecha_Creacion_Est = ?, Resolucion_Est = ?, Estado_Est = ? WHERE Id_Estructura = ?",
      [Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est, params.id]
    );

    // Verificar si la estructura fue encontrada
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Estructura no encontrada" },
        { status: 404 }
      );
    }

    // Responder con un mensaje de éxito
    return NextResponse.json({
      message: "Estructura actualizada correctamente",
    });
  } catch (error) {
    // Manejar errores inesperados
    return NextResponse.json(
      { error: error.message || "Error en el servidor" },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try { 
    const [result] = await pool.query('DELETE FROM TbEstructura WHERE Id_Estructura = ?', [params.id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Estructura eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}