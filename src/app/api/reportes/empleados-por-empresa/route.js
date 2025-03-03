import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    if (!empresaId) {
      return NextResponse.json({ error: 'ID de empresa no proporcionado' }, { status: 400 });
    }

    // Consulta corregida con los nombres exactos de las columnas según la BD
    const [empleados] = await pool.query(`
      SELECT e.Id_Empleado, e.Nombre_Emp, e.Paterno_Emp, e.Materno_Emp, e.CI_Emp, 
             c.Id_Cargo, c.Nombre_Car as cargoNombre,
             s.Id_Sucursal, s.Nombre_Suc as sucursalNombre
      FROM TbEmpleado e
      JOIN TbSucursal s ON e.Id_Municipio_Emp = s.Id_Municipio_Suc
      JOIN TbEmpresaSucursal es ON s.Id_Sucursal = es.Id_Sucursal_ES
      LEFT JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
      LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo
      WHERE es.Id_Empresa_ES = ?
    `, [empresaId]);

    // Formatear los datos para la respuesta
    const empleadosFormateados = empleados.map(e => ({
      Id_Empleado: e.Id_Empleado,
      Nombre_Emp: e.Nombre_Emp,
      Paterno_Emp: e.Paterno_Emp,
      Materno_Emp: e.Materno_Emp,
      CI_Emp: e.CI_Emp,
      cargo: e.Id_Cargo ? {
        Id_Cargo: e.Id_Cargo,
        Nombre_Car: e.cargoNombre
      } : null,
      sucursal: {
        Id_Sucursal: e.Id_Sucursal,
        Nombre_Suc: e.sucursalNombre
      }
    }));

    return NextResponse.json(empleadosFormateados);
  } catch (error) {
    console.error('Error al obtener empleados por empresa:', error);
    return NextResponse.json({ error: 'Error al obtener empleados' }, { status: 500 });
  }
} 