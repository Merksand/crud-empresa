import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

// GET - Obtener una empresa específica
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpresa WHERE Id_Empresa = ?', [params.id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar una empresa
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp } = data;
    
    const [result] = await pool.query(
      'UPDATE TbEmpresa SET Nombre_Emp = ?, Sede_Emp = ?, Fecha_Fundacion_Emp = ?, Tipo_Emp = ?, Idioma_Emp = ?, Estado_Emp = ? WHERE Id_Empresa = ?',
      [Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp, params.id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Empresa actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Eliminar una empresa
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID de empresa inválido' },
        { status: 400 }
      );
    }

    // Verificar si hay relaciones en TbEmpresaSucursal
    const [relaciones] = await pool.query(
      'SELECT COUNT(*) as count FROM TbEmpresaSucursal WHERE Id_Empresa = ?',
      [id]
    );

    if (relaciones[0].count > 0) {
      return NextResponse.json(
        { message: 'No se puede eliminar la empresa porque tiene sucursales asociadas' },
        { status: 400 }
      );
    }

    // Verificar si hay relaciones en TbInformacionEmpresa
    const [infoEmpresas] = await pool.query(
      'SELECT COUNT(*) as count FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
      [id]
    );

    if (infoEmpresas[0].count > 0) {
      return NextResponse.json(
        { message: 'No se puede eliminar la empresa porque tiene información asociada' },
        { status: 400 }
      );
    }

    // Si no hay relaciones, intentar eliminar la empresa
    const [result] = await pool.query(
      'DELETE FROM TbEmpresa WHERE Id_Empresa = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Empresa no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Empresa eliminada correctamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en DELETE /api/empresas/[id]:', error);
    return NextResponse.json(
      { message: 'Error al eliminar la empresa: ' + error.message },
      { status: 500 }
    );
  }
} 

