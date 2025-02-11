import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las empresas
export async function GET() {
  try {
    const query = `
      SELECT 
        e.Id_Empresa,
        e.Nombre_Emp,
        e.Sede_Emp,
        m.Nombre_Mun AS Municipio,
        p.Nombre_Pro AS Provincia,
        d.Nombre_Dep AS Departamento,
        pa.Nombre_Pai AS Pais,
        e.Fecha_Fundacion_Emp,
        e.Tipo_Emp,
        e.Idioma_Emp,
        e.Estado_Emp
      FROM TbEmpresa e
      LEFT JOIN TbMunicipio m ON e.Sede_Emp = m.Id_Municipio
      LEFT JOIN TbProvincia p ON m.Id_Provincia_Mun = p.Id_Provincia
      LEFT JOIN TbDepartamento d ON p.Id_Departamento_Pro = d.Id_Departamento
      LEFT JOIN TbPais pa ON d.Id_Pais_Dep = pa.Id_Pais
    `;

    const [rows] = await pool.query(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return NextResponse.json(
      { message: 'Error al obtener las empresas: ' + error.message },
      { status: 500 }
    );
  }
}


// POST - Crear una nueva empresa

export async function POST(request) {
  try {
    const data = await request.json();

    // Valores predeterminados
    const estado = 'AC';
    const idioma = data.Idioma_Emp || 'Spanish'; // Si no se envía un idioma, usa "Spanish"

    // Verificar datos obligatorios
    if (!data.Nombre_Emp || !data.Sede_Emp || !data.Fecha_Fundacion_Emp || !data.Tipo_Emp) {
      return NextResponse.json(
        { message: 'Datos incompletos para crear la empresa' },
        { status: 400 }
      );
    }

    // Insertar la empresa
    const [result] = await pool.query(
      `
      INSERT INTO TbEmpresa (Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [data.Nombre_Emp, data.Sede_Emp, data.Fecha_Fundacion_Emp, data.Tipo_Emp, idioma, estado]
    );

    return NextResponse.json(
      { message: 'Empresa creada correctamente', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear la empresa:', error);
    return NextResponse.json(
      { message: 'Error al crear la empresa: ' + error.message },
      { status: 500 }
    );
  }
}