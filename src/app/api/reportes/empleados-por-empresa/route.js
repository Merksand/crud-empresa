import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    if (!empresaId) {
      return NextResponse.json({ error: 'ID de empresa no proporcionado' }, { status: 400 });
    }

    // Obtener los empleados para la empresa seleccionada
    const [empleados] = await pool.query(`
      SELECT 
    e.Id_Empleado AS id, 
    e.Nombre_Emp AS nombre, 
    e.Paterno_Emp AS apellido, 
    e.CI_Emp AS email,   
    e.Direccion_Emp AS telefono, 
    
    c.Id_Cargo AS cargoId, 
    c.Nombre_Car AS cargoNombre,
    
    s.Id_Sucursal AS sucursalId, 
    s.Nombre_Suc AS sucursalNombre

FROM TbEmpleado e
JOIN TbEmpresaSucursal es ON e.Id_Municipio_Emp = es.Id_Sucursal_ES
JOIN TbSucursal s ON es.Id_Sucursal_ES = s.Id_Sucursal
LEFT JOIN TbEmpleadoCargo ec ON e.Id_Empleado = ec.Id_Empleado_EC
LEFT JOIN TbCargo c ON ec.Id_Cargo_EC = c.Id_Cargo

WHERE es.Id_Empresa_ES = ?
    `, [empresaId]);

    // Formatear los datos para incluir los objetos cargo y sucursal
    const empleadosFormateados = empleados.map(e => ({
      id: e.id,
      nombre: e.nombre,
      apellido: e.apellido,
      email: e.email,
      telefono: e.telefono,
      cargo: e.cargoId ? {
        id: e.cargoId,
        nombre: e.cargoNombre
      } : null,
      sucursal: {
        id: e.sucursalId,
        nombre: e.sucursalNombre
      }
    }));

    return NextResponse.json(empleadosFormateados);
  } catch (error) {
    console.error('Error al obtener empleados por empresa:', error);
    return NextResponse.json({ error: 'Error al obtener empleados' }, { status: 500 });
  }
} 