import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todos los empleados
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbEmpleado');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear un nuevo empleado
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Municipio_Emp,
      CI_Emp,
      Nombre_Emp,
      Paterno_Emp,
      Materno_Emp,
      Sexo_Emp,
      Direccion_Emp,
      Estado_Civil_Emp,
      FDN_Emp,
      Estado_Emp,
    } = data;
    /////VERIFICAR

    // Verificar si ya existe un empleado con el mismo CI
    const [existingRows] = await pool.query(
      'SELECT * FROM TbEmpleado WHERE CI_Emp = ?',
      [CI_Emp]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Ya existe un empleado con este CI' },
        { status: 400 }
      );
    }

    // Insertar el nuevo empleado
    const [result] = await pool.query(
      `INSERT INTO TbEmpleado 
       (Id_Municipio_Emp, CI_Emp, Nombre_Emp, Paterno_Emp, Materno_Emp, Sexo_Emp, Direccion_Emp, Estado_Civil_Emp, FDN_Emp, Estado_Emp) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Id_Municipio_Emp,
        CI_Emp,
        Nombre_Emp,
        Paterno_Emp,
        Materno_Emp,
        Sexo_Emp,
        Direccion_Emp,
        Estado_Civil_Emp,
        FDN_Emp,
        Estado_Emp || 'Activo',
      ]
    );

    return NextResponse.json(
      {
        message: 'Empleado creado correctamente',
        data: {
          Id_Municipio_Emp,
          CI_Emp,
          Nombre_Emp,
          Paterno_Emp,
          Materno_Emp,
          Sexo_Emp,
          Direccion_Emp,
          Estado_Civil_Emp,
          FDN_Emp,
          Estado_Emp: Estado_Emp || 'Activo',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST empleado:', error);
    return NextResponse.json(
      {
        error: error.message || 'Error al crear el empleado',
      },
      { status: 500 }
    );
  }
}
