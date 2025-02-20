import { NextResponse } from "next/server";
import { poolInventario } from '../../../../../lib/db';

// GET - Obtener un lote específico
export async function GET(request, { params }) {
    try {
        const [rows] = await poolInventario.query(
            'SELECT Id_Lote, NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, Estado_Lot FROM TbInv_Lote WHERE Id_Lote = ?',
            [params.id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Lote no encontrado' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Actualizar un lote
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const { NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot } = data;

        const [result] = await poolInventario.query(
            'UPDATE TbInv_Lote SET NroLote_Lot = ?, Descripcion_Lot = ?, CodigoBarras_Lot = ?, FechaVencimiento_Lot = ? WHERE Id_Lote = ?',
            [NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Lote no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Lote actualizado correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Dar de baja un lote (cambio lógico de estado)
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
            'UPDATE TbInv_Lote SET Estado_Lot = ? WHERE Id_Lote = ?',
            ['BA', id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Lote no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Lote dado de baja correctamente' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al dar de baja el lote: ' + error.message },
            { status: 500 }
        );
    }
}
