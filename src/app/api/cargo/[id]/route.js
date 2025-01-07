import { NextResponse } from "next/server";
import { pool } from '../../../../lib/db';

// GET - Obtener un cargo específico
export async function GET(request, { params }) {
    try {
      const [rows] = await pool.query('SELECT * FROM TbCargo WHERE Id_Cargo = ?', [params.id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Cargo no encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(rows[0]);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  

  // PUT - Actualizar un cargo
export async function PUT(request, { params }) {
    try {
      const data = await request.json();
      const { 
        Nombre_Car, 
        Nivel_Car, 
        Sueldo_Car, 
        Sueldo_USD_Car, 
        Resolucion_Car, 
        Estado_Dep 
      } = data;
  
      const [result] = await pool.query(
        'UPDATE TbCargo SET Nombre_Car = ?, Nivel_Car = ?, Sueldo_Car = ?, Sueldo_USD_Car = ?, Resolucion_Car = ?, Estado_Dep = ? WHERE Id_Cargo = ?',
        [Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep, params.id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Cargo no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Cargo actualizado correctamente' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  

  // DELETE - Eliminar un cargo
export async function DELETE(request, { params }) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
  
      // Primero eliminamos cualquier relación si existiera (ajustar según tus relaciones)
      await connection.query(
        'DELETE FROM TbEmpresaSucursal WHERE Id_Cargo = ?', // Ajusta esta consulta si hay tablas relacionadas
        [params.id]
      );
  
      // Luego eliminamos el cargo
      const [result] = await connection.query(
        'DELETE FROM TbCargo WHERE Id_Cargo = ?',
        [params.id]
      );
  
      if (result.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json(
          { error: 'Cargo no encontrado' },
          { status: 404 }
        );
      }
  
      await connection.commit();
      return NextResponse.json({ message: 'Cargo eliminado correctamente' });
  
    } catch (error) {
      await connection.rollback();
      return NextResponse.json(
        { error: 'Error al eliminar el cargo: ' + error.message },
        { status: 500 }
      );
    } finally {
      connection.release();
    }
  }
  