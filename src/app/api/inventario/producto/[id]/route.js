import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener un producto específico por ID
export async function GET(request, { params }) {
  try {
    const { productoId } = params;

    const [rows] = await poolInventario.query(
      'SELECT * FROM TbInv_Producto WHERE Id_Producto = ?',
      [productoId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}


// PUT - Actualizar un producto por ID
export async function PUT(request, { params }) {
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
      Estado_Pro = 'AC',  
    } = data;
    const { id } = params;


    // Verificar si el producto existe
    const [existing] = await poolInventario.query(
      'SELECT * FROM TbInv_Producto WHERE Id_Producto = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el producto en la base de datos
    const [result] = await poolInventario.query(
      `UPDATE TbInv_Producto 
       SET Id_Categoria_Pro = ?, 
           Id_Marca_Pro = ?, 
           Id_Industria_Pro = ?,
           Id_Codigo_Pro = ?, 
           Nombre_Pro = ?, 
           Modelo_Pro = ?, 
           Codigo_Barras_Pro = ?,
           Descripcion_Pro = ?, 
           Unidad_medida_Pro = ?, 
           Stock_minimo_Pro = ?, 
           Stock_maximo_Pro = ?, 
           Foto_Pro = ?, 
           Atributo_Personalizados_Pro = ?, 
           Estado_Pro = ?
       WHERE Id_Producto = ?`,
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
        Estado_Pro || 'AC', 
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se pudo actualizar el producto' },
        { status: 400 }
      );
    }

    // Obtener los datos actualizados
    const [updated] = await poolInventario.query(
      'SELECT * FROM TbInv_Producto WHERE Id_Producto = ?',
      [id]
    );

    return NextResponse.json({
      message: 'Producto actualizado correctamente',
      data: updated[0],
    });
  } catch (error) {
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const [result] = await poolInventario.query(
      'UPDATE TbInv_Producto SET Estado_Pro = ? WHERE Id_Producto = ?',
      ['BA',id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Producto eliminado correctamente (inactivado)' });
  } catch (error) {
    console.error('Error en eliminación:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
}