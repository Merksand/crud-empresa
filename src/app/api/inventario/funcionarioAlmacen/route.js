import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

/** 🔹 Obtener todos los funcionarios asignados a almacenes */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        fa.Id_FuncionarioAlmacen,
        fa.Id_Funcionario_FA,
        fa.Id_Almacen_FA,
        fa.Fecha_Inicio_FA,
        fa.Fecha_Fin_FA,
        fa.Puesto_FA,
        fa.Estado_FA,
        f.Nombre_Fun,
        f.Apellido_Fun,
        a.Nombre_Alm,
        a.Ubicacion_Alm
      FROM TbInv_FuncionarioAlmacen fa
      JOIN TbInv_Funcionario f ON fa.Id_Funcionario_FA = f.Id_Funcionario
      JOIN TbInv_Almacen a ON fa.Id_Almacen_FA = a.Id_Almacen
      WHERE fa.Estado_FA = 'AC'
      ORDER BY fa.Fecha_Inicio_FA DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener funcionarios por almacén:", error);
    return NextResponse.json(
      { message: "Error al obtener datos", error: error.message },
      { status: 500 }
    );
  }
}

/** 🔹 Crear nueva asignación de funcionario a almacén */
export async function POST(req) {
  try {
    const {
      Id_Funcionario_FA,
      Id_Almacen_FA,
      Fecha_Inicio_FA,
      Fecha_Fin_FA,
      Puesto_FA,
      Estado_FA = "AC",
    } = await req.json();

    // Validar campos requeridos
    if (!Id_Funcionario_FA || !Id_Almacen_FA || !Fecha_Inicio_FA || !Puesto_FA) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si ya existe una asignación activa para este funcionario en este almacén
    const [existingAssignments] = await poolInventario.query(
      `SELECT * FROM TbInv_FuncionarioAlmacen 
       WHERE Id_Funcionario_FA = ? 
       AND Id_Almacen_FA = ? 
       AND Estado_FA = 'AC'
       AND (Fecha_Fin_FA IS NULL OR Fecha_Fin_FA > CURRENT_DATE())`,
      [Id_Funcionario_FA, Id_Almacen_FA]
    );

    if (existingAssignments.length > 0) {
      return NextResponse.json(
        { message: "El funcionario ya está asignado a este almacén" },
        { status: 400 }
      );
    }

    // Crear la nueva asignación
    const [result] = await poolInventario.query(
      `INSERT INTO TbInv_FuncionarioAlmacen 
       (Id_Funcionario_FA, Id_Almacen_FA, Fecha_Inicio_FA, Fecha_Fin_FA, Puesto_FA, Estado_FA) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        Id_Funcionario_FA,
        Id_Almacen_FA,
        Fecha_Inicio_FA,
        Fecha_Fin_FA,
        Puesto_FA,
        Estado_FA,
      ]
    );

    return NextResponse.json({
      message: "Asignación creada correctamente",
      id: result.insertId
    });
  } catch (error) {
    console.error("Error al crear asignación:", error);
    return NextResponse.json(
      { message: "Error al crear asignación", error: error.message },
      { status: 500 }
    );
  }
} 