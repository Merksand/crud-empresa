import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET - Obtener todas las informaciones
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbInformacionEmpresa');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nueva información
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Empresa,
      Logo_IE,
      Regimen_Impositivo_IE,
      Zona_Horaria_IE,
      Estado_IE,
    } = data;

    // Verificar si ya existe información para esta empresa
    const [existingRows] = await pool.query(
      "SELECT * FROM TbInformacionEmpresa WHERE Id_Empresa = ?",
      [Id_Empresa]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: "Ya existe información para esta empresa" },
        { status: 400 }
      );
    }

    // Insertar la nueva información en la tabla TbInformacionEmpresa
    const [insertResult] = await pool.query(
      `INSERT INTO TbInformacionEmpresa 
       (Id_Empresa, Logo_IE, Regimen_Impositivo_IE, Zona_Horaria_IE, Estado_IE) 
       VALUES (?, ?, ?, ?, ?)`,
      [Id_Empresa, Logo_IE, Regimen_Impositivo_IE, Zona_Horaria_IE, Estado_IE || "Activo"]
    );

    const Id_InformacionEmpresa = insertResult.insertId;

    // Actualizar la columna Id_InformacionEmpresa_Emp en TbEmpresa
    const [updateResult] = await pool.query(
      `UPDATE TbEmpresa 
       SET Id_InformacionEmpresa_Emp = ? 
       WHERE Id_Empresa = ?`,
      [Id_InformacionEmpresa, Id_Empresa]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Empresa no encontrada para actualizar la información" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Información creada correctamente y empresa actualizada",
        data: {
          Id_InformacionEmpresa,
          Id_Empresa,
          Logo_IE,
          Regimen_Impositivo_IE,
          Zona_Horaria_IE,
          Estado_IE,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST informacion-empresa:", error);
    return NextResponse.json(
      {
        error: error.message || "Error al crear la información de empresa",
      },
      { status: 500 }
    );
  }
}

