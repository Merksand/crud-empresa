import { NextResponse } from "next/server";
import { poolInventario } from '../../../../../lib/db';

// GET - Obtener una moneda específica
export async function GET(request, { params }) {
    try {
        const [rows] = await poolInventario.query(
            'SELECT Id_Moneda, Codigo_Mon, Nombre_Mon, Estado_Mon FROM TbInv_Moneda WHERE Id_Moneda = ?',
            [params.id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Moneda no encontrada' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Actualizar una moneda
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const { Codigo_Mon, Nombre_Mon } = data;

        const [result] = await poolInventario.query(
            'UPDATE TbInv_Moneda SET Codigo_Mon = ?, Nombre_Mon = ? WHERE Id_Moneda = ?',
            [Codigo_Mon, Nombre_Mon, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Moneda no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Moneda actualizada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Dar de baja una moneda (eliminación lógica)
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'ID inválido' },
                { status: 400 }
            );
        }

        const [result] = await poolInventario.query(
            'UPDATE TbInv_Moneda SET Estado_Mon = ? WHERE Id_Moneda = ?',
            ['BA', id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Moneda no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Moneda dada de baja correctamente' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al dar de baja la moneda: ' + error.message },
            { status: 500 }
        );
    }
}
