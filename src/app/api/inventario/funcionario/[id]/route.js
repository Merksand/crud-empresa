import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // BD correcta

/** 🔹 Obtener un funcionario por ID */
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await poolInventario.query(
      `SELECT Id_Funcionario, Nombre_Fun, Apellido_Fun, Cargo_Funcionario, 
              Documento_Fun, Telefono_Fun, Correo_Fun, Estado_Fun
       FROM TbInv_Funcionario
       WHERE Id_Funcionario = ? AND Estado_Fun = 'AC'`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Funcionario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener funcionario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Actualizar un funcionario */
export async function PUT(req, { params }) {
  const { id } = params;

  console.log("ID FUN: ", id)
  const { Nombre_Fun, Apellido_Fun, Cargo_Funcionario, Documento_Fun, Telefono_Fun, Correo_Fun } =
    await req.json();

  try {
    await poolInventario.query(
      `UPDATE TbInv_Funcionario 
       SET Nombre_Fun = ?, Apellido_Fun = ?, Cargo_Funcionario = ?, 
           Documento_Fun = ?, Telefono_Fun = ?, Correo_Fun = ?
       WHERE Id_Funcionario = ?`,
      [Nombre_Fun, Apellido_Fun, Cargo_Funcionario, Documento_Fun, Telefono_Fun, Correo_Fun, id]
    );

    return NextResponse.json({ message: "Funcionario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar funcionario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** 🔹 Eliminar lógicamente un funcionario */
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await poolInventario.query(
      `UPDATE TbInv_Funcionario 
       SET Estado_Fun = 'BA' 
       WHERE Id_Funcionario = ?`,
      [id]
    );

    return NextResponse.json({ message: "Funcionario eliminado lógicamente" });
  } catch (error) {
    console.error("Error al eliminar funcionario:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
