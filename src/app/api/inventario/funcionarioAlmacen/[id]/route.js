import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db";

/** 🔹 Obtener una asignación específica */
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const [rows] = await poolInventario.query(
      `SELECT 
        fa.*, 
        f.Nombre_Fun,
        f.Apellido_Fun,
        a.Nombre_Alm,
        a.Ubicacion_Alm
      FROM TbInv_FuncionarioAlmacen fa
      JOIN TbInv_Funcionario f ON fa.Id_Funcionario_FA = f.Id_Funcionario
      JOIN TbInv_Almacen a ON fa.Id_Almacen_FA = a.Id_Almacen
      WHERE fa.Id_FuncionarioAlmacen = ? AND fa.Estado_FA = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Asignación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener asignación:", error);
    return NextResponse.json(
      { message: "Error al obtener datos", error: error.message },
      { status: 500 }
    );
  }
}

/** 🔹 Actualizar una asignación */
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const {
      Id_Funcionario_FA,
      Id_Almacen_FA,
      Fecha_Inicio_FA,
      Fecha_Fin_FA,
      Puesto_FA,
    } = await req.json();

    // Validar campos requeridos
    if (!Id_Funcionario_FA || !Id_Almacen_FA || !Fecha_Inicio_FA || !Puesto_FA) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si existe la asignación
    const [existingAssignment] = await poolInventario.query(
      "SELECT * FROM TbInv_FuncionarioAlmacen WHERE Id_FuncionarioAlmacen = ?",
      [id]
    );

    if (existingAssignment.length === 0) {
      return NextResponse.json(
        { message: "Asignación no encontrada" },
        { status: 404 }
      );
    }

    // Actualizar la asignación
    await poolInventario.query(
      `UPDATE TbInv_FuncionarioAlmacen 
       SET Id_Funcionario_FA = ?, 
           Id_Almacen_FA = ?,
           Fecha_Inicio_FA = ?,
           Fecha_Fin_FA = ?,
           Puesto_FA = ?
       WHERE Id_FuncionarioAlmacen = ?`,
      [Id_Funcionario_FA, Id_Almacen_FA, Fecha_Inicio_FA, Fecha_Fin_FA, Puesto_FA, id]
    );

    return NextResponse.json({
      message: "Asignación actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar asignación:", error);
    return NextResponse.json(
      { message: "Error al actualizar", error: error.message },
      { status: 500 }
    );
  }
}

/** 🔹 Eliminar lógicamente una asignación */
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    // Verificar si existe la asignación
    const [existingAssignment] = await poolInventario.query(
      "SELECT * FROM TbInv_FuncionarioAlmacen WHERE Id_FuncionarioAlmacen = ? AND Estado_FA = 'AC'",
      [id]
    );

    if (existingAssignment.length === 0) {
      return NextResponse.json(
        { message: "Asignación no encontrada o ya está inactiva" },
        { status: 404 }
      );
    }

    // Realizar el borrado lógico
    await poolInventario.query(
      `UPDATE TbInv_FuncionarioAlmacen 
       SET Estado_FA = 'BA' 
       WHERE Id_FuncionarioAlmacen = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Asignación eliminada lógicamente",
    });
  } catch (error) {
    console.error("Error al eliminar asignación:", error);
    return NextResponse.json(
      { message: "Error al eliminar", error: error.message },
      { status: 500 }
    );
  }
} 