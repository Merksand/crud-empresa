import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    // Llamada al procedimiento almacenado GetEstructuraById
    const [rows] = await pool.query('CALL GetEstructuraById(?)', [params.id]);

    if (rows[0].length === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0][0]); // Extraer el primer registro del resultado
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    // Obtener los datos enviados desde el cliente
    const data = await request.json();
    const { Id_Empresa, Fecha_Creacion_Est, Resolucion_Est } = data;

    // Validar que los datos necesarios estén presentes
    if (!Id_Empresa || !Fecha_Creacion_Est || !Resolucion_Est) {
      return NextResponse.json(
        { error: "Datos incompletos para actualizar la estructura" },
        { status: 400 }
      );
    }

    // Llamada al procedimiento almacenado UpdateEstructura
    const [result] = await pool.query(
      "CALL UpdateEstructura(?, ?, ?, ?)",
      [params.id, Id_Empresa, Fecha_Creacion_Est, Resolucion_Est]
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
    const id = parseInt(params.id);

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Verificar si existen relaciones en TbArea
    const [areasRelacionadas] = await pool.query(
      'SELECT COUNT(*) AS count FROM TbArea WHERE Id_Estructura_Ar = ?',
      [id]
    );

    if (areasRelacionadas[0].count > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar la estructura porque tiene áreas asociadas.' },
        { status: 400 }
      );
    }

    // Llamar al procedimiento almacenado DeleteEstructura
    const [result] = await pool.query('CALL DeleteEstructura(?)', [id]);

    // Verificar si la estructura fue encontrada y actualizada
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Estructura no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Estructura dada de baja correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
