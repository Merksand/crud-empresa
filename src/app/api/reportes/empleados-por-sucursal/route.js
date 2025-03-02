import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');
    const sucursalId = searchParams.get('sucursalId');

    if (!empresaId || !sucursalId) {
      return NextResponse.json({ error: 'ID de empresa o sucursal no proporcionado' }, { status: 400 });
    }

    // Verificar que la sucursal pertenece a la empresa
    const [relacion] = await pool.query(`
      SELECT * FROM TbEmpresaSucursal
      WHERE empresaId = ? AND sucursalId = ?
    `, [empresaId, sucursalId]);

    if (relacion.length === 0) {
      return NextResponse.json({ error: 'La sucursal no pertenece a la empresa seleccionada' }, { status: 400 });
    }

    // Obtener los empleados para la sucursal seleccionada
    const [empleados] = await pool.query(`
      SELECT e.idEmpleado as id, e.nombre, e.apellido, e.email, e.telefono, 
             c.idCargo as cargoId, c.nombre as cargoNombre,
             s.idSucursal as sucursalId, s.nombre as sucursalNombre
      FROM TbEmpleado e
      JOIN TbSucursal s ON e.sucursalId = s.idSucursal
      LEFT JOIN TbEmpleadoCargo ec ON e.idEmpleado = ec.empleadoId
      LEFT JOIN TbCargo c ON ec.cargoId = c.idCargo
      WHERE e.sucursalId = ?
    `, [sucursalId]);

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
    console.error('Error al obtener empleados por sucursal:', error);
    return NextResponse.json({ error: 'Error al obtener empleados' }, { status: 500 });
  }
} 