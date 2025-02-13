import { NextResponse } from "next/server";
import { pool } from '../../../../../lib/db';

// GET - Obtener una marca específica
export async function GET(request, { params }) {
    try {
        const [rows] = await pool.query(
            'SELECT Id_Marca, Nombre_Mar, Estado_Mar FROM TbInv_Marca WHERE Id_Marca = ?',
            [params.id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Marca no encontrada' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Actualizar marca
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const { Nombre_Mar } = data;

        const [result] = await pool.query(
            'UPDATE TbInv_Marca SET Nombre_Mar = ? WHERE Id_Marca = ?',
            [Nombre_Mar, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Marca no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Marca actualizada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Dar de baja una marca
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'ID inválido' },
                { status: 400 }
            );
        }

        // Aquí puedes agregar la verificación de relaciones si es necesario
        // Por ejemplo, si tienes una tabla que relacione productos con marcas:
        /*
        const [relaciones] = await pool.query(
            'SELECT COUNT(*) AS count FROM TbInv_Productos WHERE Id_Marca = ?',
            [id]
        );

        if (relaciones[0].count > 0) {
            return NextResponse.json(
                { error: 'No se puede eliminar la marca porque tiene productos asociados.' },
                { status: 400 }
            );
        }
        */

        const [result] = await pool.query(
            'UPDATE TbInv_Marca SET Estado_Mar = ? WHERE Id_Marca = ?',
            ['Inactivo', id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Marca no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Marca dada de baja correctamente' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al dar de baja la marca: ' + error.message },
            { status: 500 }
        );
    }
}