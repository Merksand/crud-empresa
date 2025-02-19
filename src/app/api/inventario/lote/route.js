import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener todos los lotes activos
export async function GET() {
    try {
        const [rows] = await poolInventario.query(
            'SELECT Id_Lote, NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, Estado_Lot FROM TbInv_Lote WHERE Estado_Lot = ?',
            ['AC']
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Crear un nuevo lote
export async function POST(request) {
    try {
        const data = await request.json();
        const { NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot } = data;

        const [result] = await poolInventario.query(
            'INSERT INTO TbInv_Lote (NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, Estado_Lot) VALUES (?, ?, ?, ?, ?)',
            [NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, 'AC']
        );

        return NextResponse.json({ 
            id: result.insertId,
            message: 'Lote creado correctamente' 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
