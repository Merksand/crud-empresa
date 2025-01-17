import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Consulta para obtener empresas, áreas y dependencias
    const [rows] = await pool.query(`
      SELECT 
        emp.Id_Empresa,
        emp.Nombre_Emp,
        a.Id_Area,
        a.Nombre_Are,
        a.Nivel_Are,
        a.Estado_Are,
        a.Resolucion_Are,
        d.Id_Area_Padre_Dep,
        d.Id_Area_Hijo_Dep
      FROM 
        TbEmpresa emp
      LEFT JOIN TbEstructura e ON emp.Id_Empresa = e.Id_Empresa
      LEFT JOIN TbArea a ON e.Id_Estructura = a.Id_Estructura_Ar
      LEFT JOIN TbDependencia d ON a.Id_Area = d.Id_Area_Hijo_Dep
    `);

    // Crear un mapa de empresas y áreas
    const empresaMap = {};
    const areaMap = {};

    rows.forEach((row) => {
      // Mapear las empresas
      if (!empresaMap[row.Id_Empresa]) {
        empresaMap[row.Id_Empresa] = {
          Id_Empresa: row.Id_Empresa,
          Nombre_Emp: row.Nombre_Emp,
          children: [],
        };
      }

      // Mapear las áreas
      if (row.Id_Area) {
        areaMap[row.Id_Area] = {
          Id_Area: row.Id_Area,
          Nombre_Are: row.Nombre_Are,
          Nivel_Are: row.Nivel_Are,
          Estado_Are: row.Estado_Are,
          Resolucion_Are: row.Resolucion_Are,
          children: [],
        };
      }
    });

    // Construir la jerarquía de áreas
    rows.forEach((row) => {
      if (row.Id_Area_Padre_Dep && areaMap[row.Id_Area_Padre_Dep]) {
        areaMap[row.Id_Area_Padre_Dep].children.push(areaMap[row.Id_Area]);
      } else if (row.Id_Area) {
        empresaMap[row.Id_Empresa].children.push(areaMap[row.Id_Area]);
      }
    });

    // Convertir el mapa de empresas a un array
    const tree = Object.values(empresaMap);

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error al construir el árbol:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
