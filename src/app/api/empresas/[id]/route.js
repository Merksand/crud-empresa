import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener una empresa específica

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de empresa inválido' },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      `
      SELECT 
        e.Id_Empresa, 
        e.Nombre_Emp, 
        e.Sede_Emp, 
        e.Fecha_Fundacion_Emp, 
        e.Tipo_Emp, 
        e.Idioma_Emp, 
        e.Estado_Emp,
        m.Nombre_Mun AS Nombre_Municipio,
        p.Nombre_Pro AS Nombre_Provincia,
        d.Nombre_Dep AS Nombre_Departamento,
        pa.Nombre_Pai AS Nombre_Pais
      FROM 
        TbEmpresa e
      LEFT JOIN TbMunicipio m ON e.Sede_Emp = m.Id_Municipio
      LEFT JOIN TbProvincia p ON m.Id_Provincia_Mun = p.Id_Provincia
      LEFT JOIN TbDepartamento d ON p.Id_Departamento_Pro = d.Id_Departamento
      LEFT JOIN TbPais pa ON d.Id_Pais_Dep = pa.Id_Pais
      WHERE e.Id_Empresa = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Empresa no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]); // Devuelve solo el primer resultado
  } catch (error) {
    console.error('Error en GET /api/empresas/[id]:', error);
    return NextResponse.json(
      { error: 'Error al obtener la empresa: ' + error.message },
      { status: 500 }
    );
  }
}


// PUT - Actualizar una empresa
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp } = data;

    // Obtener el Id_Pais a partir del Id_Municipio proporcionado en Sede_Emp
    const [paisResult] = await pool.query(
      `SELECT pa.Id_Pais 
       FROM TbMunicipio m
       JOIN TbProvincia p ON m.Id_Provincia_Mun = p.Id_Provincia
       JOIN TbDepartamento d ON p.Id_Departamento_Pro = d.Id_Departamento
       JOIN TbPais pa ON d.Id_Pais_Dep = pa.Id_Pais
       WHERE m.Id_Municipio = ?`,
      [Sede_Emp]
    );

    if (paisResult.length === 0) {
      return NextResponse.json({ error: 'País no encontrado para el municipio proporcionado' }, { status: 404 });
    }

    const Id_Pais = paisResult[0].Id_Pais;

    // Actualizar la empresa en TbEmpresa
    const [empresaResult] = await pool.query(
      'UPDATE TbEmpresa SET Nombre_Emp = ?, Sede_Emp = ?, Fecha_Fundacion_Emp = ?, Tipo_Emp = ?, Idioma_Emp = ? WHERE Id_Empresa = ?',
      [Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, params.id]
    );

    if (empresaResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }

    // Verificar si ya existe una relación en TbEmpresaPais
    const [relacionExistente] = await pool.query(
      'SELECT * FROM TbEmpresaPais WHERE Id_Empresa_EP = ? AND Id_Pais_EP = ?',
      [params.id, Id_Pais]
    );

    if (relacionExistente.length === 0) {
      // Si no existe relación, crearla
      await pool.query(
        'INSERT INTO TbEmpresaPais (Id_Empresa_EP, Id_Pais_EP, Fecha_Inicio_EP, Estado_EC) VALUES (?, ?, ?, ?)',
        [params.id, Id_Pais, new Date(), 'Activo']
      );
    } else {
      // Si existe, actualizarla
      await pool.query(
        'UPDATE TbEmpresaPais SET Fecha_Inicio_EP = ?, Estado_EC = ? WHERE Id_Empresa_EP = ? AND Id_Pais_EP = ?',
        [new Date(), 'Activo', params.id, Id_Pais]
      );
    }

    return NextResponse.json({ message: 'Empresa actualizada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'ID de empresa inválido' },
        { status: 400 }
      );
    }

    // Verificar relaciones en TbEmpresaSucursal
    const [relacionesSucursal] = await pool.query(
      'SELECT COUNT(*) as count FROM TbEmpresaSucursal WHERE Id_Empresa_ES = ?',
      [id]
    );

    if (relacionesSucursal[0].count > 0) {
      return NextResponse.json(
        { message: 'No se puede eliminar la empresa porque tiene sucursales asociadas.' },
        { status: 400 }
      );
    }

    // Verificar relaciones en TbEstructura
    const [relacionesEstructura] = await pool.query(
      'SELECT COUNT(*) as count FROM TbEstructura WHERE Id_Empresa = ?',
      [id]
    );

    if (relacionesEstructura[0].count > 0) {
      return NextResponse.json(
        { message: 'No se puede eliminar la empresa porque tiene estructuras asociadas.' },
        { status: 400 }
      );
    }

    // Verificar relaciones en TbInformacionEmpresa
    const [relacionesInformacion] = await pool.query(
      'SELECT COUNT(*) as count FROM TbInformacionEmpresa WHERE Id_Empresa = ?',
      [id]
    );

    if (relacionesInformacion[0].count > 0) {
      return NextResponse.json(
        { message: 'No se puede eliminar la empresa porque tiene información asociada.' },
        { status: 400 }
      );
    }

    // Intentar eliminar la empresa
    const [result] = await pool.query(
      'DELETE FROM TbEmpresa WHERE Id_Empresa = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Empresa no encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Empresa eliminada correctamente.' },
      { status: 200 }
    );

  } catch (error) {
    // console.error('Error en DELETE /api/empresas/[id]:', error);
    return NextResponse.json(
      { message: 'Error al eliminar la empresa: ' + error.message },
      { status: 500 }
    );
  }
}
