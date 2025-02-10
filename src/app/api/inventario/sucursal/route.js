import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';


export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.Id_Sucursal, 
        s.Id_Empresa_Suc, 
        s.Nombre_Parametro_Suc, 
        s.Nombre_Suc, 
        s.Estado_Suc,
        e.Nombre_Emp AS Nombre_Empresa
      FROM TbInv_Sucursal s
      JOIN TbEmpresaSucursal es ON s.Id_Empresa_Suc = es.Id_Empresa_Sucursal
      JOIN TbEmpresa e ON es.Id_Empresa_ES = e.Id_Empresa
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener sucursales', error }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc, Fecha_Apertura_ES, Estado_ES } = await request.json();

    if (!Id_Empresa_Suc && !Nombre_Parametro_Suc && !Nombre_Suc && !Estado_Suc && !Fecha_Apertura_ES && !Estado_ES) {
      return NextResponse.json({ error: 'No se proporcionaron campos para actualizar' }, { status: 400 });
    }

    // Actualizar en TbInv_Sucursal
    const updateFieldsSucursal = [];
    const valuesSucursal = [];

    if (Id_Empresa_Suc) {
      updateFieldsSucursal.push('Id_Empresa_Suc = ?');
      valuesSucursal.push(Id_Empresa_Suc);
    }

    if (Nombre_Parametro_Suc) {
      updateFieldsSucursal.push('Nombre_Parametro_Suc = ?');
      valuesSucursal.push(Nombre_Parametro_Suc);
    }

    if (Nombre_Suc) {
      updateFieldsSucursal.push('Nombre_Suc = ?');
      valuesSucursal.push(Nombre_Suc);
    }

    if (Estado_Suc) {
      updateFieldsSucursal.push('Estado_Suc = ?');
      valuesSucursal.push(Estado_Suc);
    }

    valuesSucursal.push(id);

    const querySucursal = `UPDATE TbInv_Sucursal SET ${updateFieldsSucursal.join(', ')} WHERE Id_Sucursal = ?`;
    await pool.query(querySucursal, valuesSucursal);

    // Actualizar en TbEmpresaSucursal
    const updateFieldsEmpresaSucursal = [];
    const valuesEmpresaSucursal = [];

    if (Fecha_Apertura_ES) {
      updateFieldsEmpresaSucursal.push('Fecha_Apertura_ES = ?');
      valuesEmpresaSucursal.push(Fecha_Apertura_ES);
    }

    if (Estado_ES) {
      updateFieldsEmpresaSucursal.push('Estado_ES = ?');
      valuesEmpresaSucursal.push(Estado_ES);
    }

    valuesEmpresaSucursal.push(id);

    const queryEmpresaSucursal = `UPDATE TbEmpresaSucursal SET ${updateFieldsEmpresaSucursal.join(', ')} WHERE Id_Sucursal_ES = ?`;
    await pool.query(queryEmpresaSucursal, valuesEmpresaSucursal);

    return NextResponse.json({ message: 'Sucursal actualizada correctamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar la sucursal', message: error.message }, { status: 500 });
  }
}