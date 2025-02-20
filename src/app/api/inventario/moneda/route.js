import { NextResponse } from 'next/server';
import { poolInventario } from '@/lib/db';

// GET - Obtener todas las monedas activas
export async function GET() {
    try {
        const [rows] = await poolInventario.query(
            'SELECT Id_Moneda, Codigo_Mon, Nombre_Mon, Estado_Mon FROM TbInv_Moneda WHERE Estado_Mon = ?',
            ['AC']
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Crear una nueva moneda
export async function POST(request) {
    try {
        const data = await request.json();
        const { Codigo_Mon, Nombre_Mon } = data;

        const [result] = await poolInventario.query(
            'INSERT INTO TbInv_Moneda (Codigo_Mon, Nombre_Mon, Estado_Mon) VALUES (?, ?, ?)',
            [Codigo_Mon, Nombre_Mon, 'AC']
        );

        return NextResponse.json({ 
            id: result.insertId,
            message: 'Moneda creada correctamente' 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
