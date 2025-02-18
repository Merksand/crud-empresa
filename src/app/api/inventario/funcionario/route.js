import { NextResponse } from "next/server";
import { poolInventario } from "@/lib/db"; // Usamos la BD correcta

/** 🔹 Obtener todos los funcionarios */
export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        Id_Funcionario, Nombre_Fun, Apellido_Fun, Cargo_Funcionario, 
        Documento_Fun, Telefono_Fun, Correo_Fun, Estado_Fun
      FROM Bd_INVENTARIO_12022025_2.TbInv_Funcionario
      WHERE Estado_Fun = 'AC'
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener funcionarios:", error);
    return NextResponse.json(
      { message: "Error al obtener funcionarios", error },
      { status: 500 }
    );
  }
}

/** 🔹 Crear un nuevo funcionario */
export async function POST(req) {
  try {
    const {
      Nombre_Fun,
      Apellido_Fun,
      Cargo_Funcionario,
      Documento_Fun,
      Telefono_Fun,
      Correo_Fun,
      Estado_Fun = "AC",
    } = await req.json();

    if (!Nombre_Fun || !Apellido_Fun || !Cargo_Funcionario || !Documento_Fun) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await poolInventario.query(
      `INSERT INTO Bd_INVENTARIO_12022025_2.TbInv_Funcionario 
       (Nombre_Fun, Apellido_Fun, Cargo_Funcionario, Documento_Fun, Telefono_Fun, Correo_Fun, Estado_Fun) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        Nombre_Fun,
        Apellido_Fun,
        Cargo_Funcionario,
        Documento_Fun,
        Telefono_Fun,
        Correo_Fun,
        Estado_Fun,
      ]
    );

    return NextResponse.json({ message: "Funcionario creado correctamente" });
  } catch (error) {
    console.error("Error al crear funcionario:", error);
    return NextResponse.json(
      { message: "Error al crear funcionario", error: error.message },
      { status: 500 }
    );
  }
}
