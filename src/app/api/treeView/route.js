import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Consulta para obtener áreas jerárquicas con dependencias, estructuras y empresas
    const [rows] = await pool.query(`
      SELECT 
        a.Id_Area, 
        a.Nombre_Are, 
        a.Nivel_Are, 
        a.Estado_Are, 
        d.Id_Area_Padre_Dep, 
        d.Id_Area_Hijo_Dep,
        e.Resolucion_Est,
        emp.Nombre_Emp
      FROM 
        TbArea a
      LEFT JOIN TbDependencia d ON a.Id_Area = d.Id_Area_Hijo_Dep
      LEFT JOIN TbEstructura e ON a.Id_Estructura_Ar = e.Id_Estructura
      LEFT JOIN TbEmpresa emp ON e.Id_Empresa = emp.Id_Empresa
    `);

    // Construir el mapa de áreas
    const areaMap = {};
    rows.forEach((area) => {
      areaMap[area.Id_Area] = { 
        Id_Area: area.Id_Area,
        Nombre_Are: area.Nombre_Are,
        Nivel_Are: area.Nivel_Are,
        Estado_Are: area.Estado_Are,
        Nombre_Emp: area.Nombre_Emp || "Sin Empresa", // Asegurar valor predeterminado
        Resolucion_Est: area.Resolucion_Est || "Sin Resolución", // Asegurar valor predeterminado
        children: [] // Asegurar existencia de `children`
      };
    });

    // Crear la jerarquía
    const tree = [];
    rows.forEach((area) => {
      if (area.Id_Area_Padre_Dep) {
        if (areaMap[area.Id_Area_Padre_Dep]) {
          areaMap[area.Id_Area_Padre_Dep].children.push(areaMap[area.Id_Area]);
        }
      } else {
        tree.push(areaMap[area.Id_Area]);
      }
    });

    // Ordenar nodos jerárquicos por Nivel_Are (opcional)
    const sortTree = (nodes) => {
      nodes.sort((a, b) => a.Nivel_Are - b.Nivel_Are);
      nodes.forEach((node) => {
        if (node.children.length > 0) {
          sortTree(node.children);
        }
      });
    };
    sortTree(tree);

    // Responder con la jerarquía
    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error al construir el árbol jerárquico:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// POST - Crear nueva área
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      Id_Estructura_Ar,
      Fecha_Creacion_Ar,
      Nombre_Are,
      Resolucion_Are,
      Estado_Are
    } = data;

    const [result] = await pool.query(
      'INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are) VALUES (?, ?, ?, ?, ?)',
      [Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are]
    );

    return NextResponse.json({ 
      message: 'Área creada correctamente',
      id: result.insertId 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
