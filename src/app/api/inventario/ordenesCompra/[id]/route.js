import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener una orden de compra específica por ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [rows] = await poolInventario.query(
      'SELECT * FROM TbInv_OrdenesCompra WHERE Id_OrdenCompra = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Orden de compra no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener la orden de compra' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar una orden de compra por ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const {
      Id_Sucursal_OdC,
      Id_Proveedor_OdC,
      Id_Moneda_Odc,
      FechaOrden_OdC,
      Monto_OdC,
      Impuestos_OdC,
      Descuento_OdC,
      Sub_Total_OdC,
      TotalPagado_OdC,
      Estado_OdC = 'AC',
    } = data;

    // Verificar si la orden de compra existe
    const [existing] = await poolInventario.query(
      'SELECT * FROM TbInv_OrdenesCompra WHERE Id_OrdenCompra = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Orden de compra no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar la orden de compra
    const [result] = await poolInventario.query(
      `UPDATE TbInv_OrdenesCompra 
       SET Id_Sucursal_OdC = ?, 
           Id_Proveedor_OdC = ?, 
           Id_Moneda_Odc = ?, 
           FechaOrden_OdC = ?, 
           Monto_OdC = ?, 
           Impuestos_OdC = ?, 
           Descuento_OdC = ?, 
           Sub_Total_OdC = ?, 
           TotalPagado_OdC = ?, 
           Estado_OdC = ?
       WHERE Id_OrdenCompra = ?`,
      [
        Id_Sucursal_OdC,
        Id_Proveedor_OdC,
        Id_Moneda_Odc,
        FechaOrden_OdC,
        Monto_OdC,
        Impuestos_OdC,
        Descuento_OdC,
        Sub_Total_OdC,
        TotalPagado_OdC,
        Estado_OdC,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se pudo actualizar la orden de compra' },
        { status: 400 }
      );
    }

    // Obtener los datos actualizados
    const [updated] = await poolInventario.query(
      'SELECT * FROM TbInv_OrdenesCompra WHERE Id_OrdenCompra = ?',
      [id]
    );

    return NextResponse.json({
      message: 'Orden de compra actualizada correctamente',
      data: updated[0],
    });
  } catch (error) {
    console.error('Error al actualizar:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar la orden de compra' },
      { status: 500 }
    );
  }
}

// DELETE - Inactivar (eliminar) una orden de compra por ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    // Se utiliza una actualización para inactivar la orden de compra (cambiando su estado a 'BA')
    const [result] = await poolInventario.query(
      'UPDATE TbInv_OrdenesCompra SET Estado_OdC = ? WHERE Id_OrdenCompra = ?',
      ['BA', id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Orden de compra no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Orden de compra eliminada correctamente (inactivada)',
    });
  } catch (error) {
    console.error('Error al eliminar:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar la orden de compra' },
      { status: 500 }
    );
  }
}
