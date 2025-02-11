import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todas las marcas activas
export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT Id_Marca, Nombre_Mar, Estado_Mar FROM TbInv_Marca WHERE Estado_Mar = ?',
            ['Activo']
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// POST - Crear una nueva marca
export async function POST(request) {
    try {
        const data = await request.json();
        const { Nombre_Mar } = data;

        const [result] = await pool.query(
            'INSERT INTO TbInv_Marca (Nombre_Mar, Estado_Mar) VALUES (?, ?)',
            [Nombre_Mar, 'Activo']
        );

        return NextResponse.json({ 
            id: result.insertId,
            message: 'Marca creada correctamente' 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}