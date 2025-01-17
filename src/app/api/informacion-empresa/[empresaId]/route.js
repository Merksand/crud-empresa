import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// PUT - Actualizar información
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { 
      Id_Empresa,
      Logo_IE, 
      Regimen_Impositivo_IE, 
      Zona_Horaria_IE, 
      Estado_IE 
    } = data;
    const { empresaId } = params;

    // Verificar si existe la información
    const [existing] = await pool.query(
      'SELECT * FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
      [empresaId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Información no encontrada' },
        { status: 404 }
      );
    }

    // Si se está cambiando la empresa, verificar que no exista información para la nueva empresa
    if (Id_Empresa !== parseInt(empresaId)) {
      const [existingNew] = await pool.query(
        'SELECT * FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
        [Id_Empresa]
      );

      if (existingNew.length > 0) {
        return NextResponse.json(
          { error: 'Ya existe información para la empresa seleccionada' },
          { status: 400 }
        );
      }
    }

    const [result] = await pool.query(
      `UPDATE TbInformacionEmpresa 
       SET Id_Empresa = ?,
           Logo_IE = ?, 
           Regimen_Impositivo_IE = ?, 
           Zona_Horaria_IE = ?, 
           Estado_IE = ?
       WHERE Id_Empresa = ?`,
      [Id_Empresa, Logo_IE, Regimen_Impositivo_IE, Zona_Horaria_IE, Estado_IE, empresaId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se pudo actualizar la información' },
        { status: 400 }
      );
    }

    // Obtener los datos actualizados
    const [updated] = await pool.query(
      'SELECT * FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
      [Id_Empresa]
    );

    return NextResponse.json({ 
      message: 'Información actualizada correctamente',
      data: updated[0]
    });
  } catch (error) {
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar la información' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar información
export async function DELETE(request, { params }) {
  try {
    const { empresaId } = params;

    const [result] = await pool.query(
      'UPDATE TbInformacionEmpresa SET Estado_IE = ? WHERE Id_Empresa = ?',
      ['Inactivo', empresaId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Información no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Información eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminación:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar la información' },
      { status: 500 }
    );
  }
}

// GET - Obtener información específica
export async function GET(request, { params }) {
  try {
    const { empresaId } = params;

    const [rows] = await pool.query(
      'SELECT * FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
      [empresaId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Información no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener la información' },
      { status: 500 }
    );
  }
}
