import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get("empresaId");

    if (!empresaId) {
      return NextResponse.json(
        { error: "ID de empresa no proporcionado" },
        { status: 400 }
      );
    }

    // Consulta corregida con los nombres exactos de las columnas según la BD
    const [sucursales] = await pool.query(
      `
   SELECT s.Id_Sucursal, s.Nombre_Suc, s.Estado_Suc, 
          m.Id_Municipio, m.Nombre_Mun as municipioNombre
   FROM TbSucursal s
   JOIN TbEmpresaSucursal es ON s.Id_Sucursal = es.Id_Sucursal_ES
   LEFT JOIN TbMunicipio m ON s.Id_Municipio_Suc = m.Id_Municipio
   WHERE es.Id_Empresa_ES = ?

    `,
      [empresaId]
    );

    // Formatear los datos para la respuesta
    const sucursalesFormateadas = sucursales.map((s) => ({
      Id_Sucursal: s.Id_Sucursal,
      Nombre_Suc: s.Nombre_Suc,
      Estado_Suc: s.Estado_Suc,
      municipio: s.Id_Municipio
        ? {
            Id_Municipio: s.Id_Municipio,
            Nombre_Mun: s.municipioNombre,
          }
        : null,
    }));

    return NextResponse.json(sucursalesFormateadas);
  } catch (error) {
    console.error("Error al obtener sucursales por empresa:", error);
    return NextResponse.json(
      { error: "Error al obtener sucursales" },
      { status: 500 }
    );
  }
}
