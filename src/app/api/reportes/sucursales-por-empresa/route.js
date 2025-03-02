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

    // Obtener las sucursales para la empresa seleccionada
    const [sucursales] = await pool.query(
      `
   SELECT 
    s.Id_Sucursal AS id, 
    s.Nombre_Suc AS nombre, 
    
    m.Id_Municipio AS municipioId, 
    m.Nombre_Mun AS municipioNombre

FROM TbSucursal s
JOIN TbEmpresaSucursal es ON s.Id_Sucursal = es.Id_Sucursal_ES
LEFT JOIN TbMunicipio m ON s.Id_Municipio_Suc = m.Id_Municipio
WHERE es.Id_Empresa_ES = ?

    `,
      [empresaId]
    );

    // Formatear los datos para incluir el objeto municipio
    const sucursalesFormateadas = sucursales.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      direccion: s.direccion,
      telefono: s.telefono,
      municipio: s.municipioId
        ? {
            id: s.municipioId,
            nombre: s.municipioNombre,
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
