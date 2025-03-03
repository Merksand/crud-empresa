import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await poolInventario.query('SELECT * FROM TbInv_Producto WHERE Estado_Pro = "AC"');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear un nuevo producto
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      Id_Categoria_Pro,
      Id_Marca_Pro,
      Id_Industria_Pro,
      Id_Codigo_Pro,
      Nombre_Pro,
      Modelo_Pro,
      Codigo_Barras_Pro,
      Descripcion_Pro,
      Unidad_medida_Pro,
      Stock_minimo_Pro,
      Stock_maximo_Pro,
      Foto_Pro,
      Atributo_Personalizados_Pro,
    } = data;

    console.log(data)
    // Validar datos obligatorios
    if (!Id_Categoria_Pro || !Id_Marca_Pro || !Id_Industria_Pro || !Nombre_Pro || !Modelo_Pro || !Unidad_medida_Pro) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [insertResult] = await poolInventario.query(
      `INSERT INTO TbInv_Producto 
       (Id_Categoria_Pro, Id_Marca_Pro, Id_Industria_Pro, Id_Codigo_Pro, Nombre_Pro, Modelo_Pro, Codigo_Barras_Pro, Descripcion_Pro, 
        Unidad_medida_Pro, Stock_minimo_Pro, Stock_maximo_Pro, Foto_Pro, Atributo_Personalizados_Pro, Estado_Pro) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "AC")`,
      [
        Id_Categoria_Pro,
        Id_Marca_Pro,
        Id_Industria_Pro,
        Id_Codigo_Pro,
        Nombre_Pro,
        Modelo_Pro,
        Codigo_Barras_Pro,
        Descripcion_Pro || null,
        Unidad_medida_Pro,
        Stock_minimo_Pro || 0,
        Stock_maximo_Pro || 0,
        Foto_Pro || null,
        Atributo_Personalizados_Pro || null,
      ]
    );

    return NextResponse.json(
      {
        message: "Producto creado exitosamente",
        data: {
          Id_Producto: insertResult.insertId,
          Id_Categoria_Pro,
          Id_Marca_Pro,
          Id_Industria_Pro,
          Id_Codigo_Pro,
          Nombre_Pro,
          Modelo_Pro,
          Codigo_Barras_Pro,
          Descripcion_Pro,
          Unidad_medida_Pro,
          Stock_minimo_Pro,
          Stock_maximo_Pro,
          Foto_Pro,
          Atributo_Personalizados_Pro,
          Estado_Pro: "AC",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST producto:", error);
    return NextResponse.json({ error: error.message || "Error al crear el producto" }, { status: 500 });
  }
}
