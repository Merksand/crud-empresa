// src/app/api/sucursal/[id]/route.js

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [sucursal] = await pool.query(
      `SELECT s.*, es.Id_Empresa_ES, e.Nombre_Emp AS Nombre_Empresa, su.Nombre_Suc AS Nombre_Sucursal
       FROM TbInv_Sucursal s
       JOIN TbEmpresaSucursal es ON s.Id_Empresa_Suc = es.Id_Empresa_Sucursal
       JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
       JOIN TbSucursal su ON es.Id_Sucursal_ES = su.Id_Sucursal
       WHERE s.Id_Sucursal = ? AND s.Estado_Suc = 'AC'`,
      [id]
    );
    return NextResponse.json(sucursal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc } = await req.json();
  try {
    await pool.query(
      `UPDATE TbInv_Sucursal SET Id_Empresa_Suc = ?, Nombre_Parametro_Suc = ?, Nombre_Suc = ? WHERE Id_Sucursal = ?`,
      [Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, id]
    );
    return NextResponse.json({ message: "Sucursal actualizada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await pool.query(
      `UPDATE TbInv_Sucursal SET Estado_Suc = 'BA' WHERE Id_Sucursal = ?`,
      [id]
    );
    return NextResponse.json({ message: "Sucursal eliminada lógicamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 
