import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las empresas
export async function GET() {
  try {
    // Consulta corregida con los nombres exactos de las columnas según la BD
    const [empresas] = await pool.query(`
      SELECT Id_Empresa, Nombre_Emp 
      FROM TbEmpresa 
      ORDER BY Nombre_Emp
    `);
    return NextResponse.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return NextResponse.json({ error: 'Error al obtener empresas' }, { status: 500 });
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