import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await poolInventario.query(`
      SELECT 
        o.*,
        s.Nombre_Suc AS Nombre_Sucursal,
        p.Nombre_Prov AS Nombre_Proveedor,
        m.Nombre_Mon AS Nombre_Moneda
      FROM TbInv_ordenescompra o
      LEFT JOIN TbInv_Sucursal s ON o.Id_Sucursal_OdC = s.Id_Sucursal
      LEFT JOIN TbInv_Proveedor p ON o.Id_Proveedor_OdC = p.Id_Proveedor
      LEFT JOIN TbInv_Moneda m ON o.Id_Moneda_Odc = m.Id_Moneda
      WHERE o.Estado_ODC = "AC"
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener las órdenes de compra:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear una nueva orden de compra
export async function POST(request) {
  try {
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
      Estado_OdC = 'AC'
    } = data;

    // Validación de campos obligatorios
    if (!Id_Sucursal_OdC || !Id_Proveedor_OdC || !Id_Moneda_Odc || !FechaOrden_OdC || !Monto_OdC || !Impuestos_OdC || !Descuento_OdC || !Sub_Total_OdC || !TotalPagado_OdC) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [insertResult] = await poolInventario.query(
      `INSERT INTO TbInv_OrdenesCompra 
       (Id_Sucursal_OdC, Id_Proveedor_OdC, Id_Moneda_Odc, FechaOrden_OdC, Monto_OdC, Impuestos_OdC, Descuento_OdC, Sub_Total_OdC, TotalPagado_OdC, Estado_OdC) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "AC")`,
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
        Estado_OdC
      ]
    );

    return NextResponse.json(
      {
        message: "Orden de compra creada exitosamente",
        data: {
          Id_OrdenCompra: insertResult.insertId,
          Id_Sucursal_OdC,
          Id_Proveedor_OdC,
          Id_Moneda_Odc,
          FechaOrden_OdC,
          Monto_OdC,
          Impuestos_OdC,
          Descuento_OdC,
          Sub_Total_OdC,
          TotalPagado_OdC,
          Estado_OdC
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST orden de compra:", error);
    return NextResponse.json({ error: error.message || "Error al crear la orden de compra" }, { status: 500 });
  }
}
