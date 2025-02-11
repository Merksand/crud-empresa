import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todos los proveedores activos
export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT Id_Proveedor, Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, Estado_Prov FROM TbInv_Proveedor WHERE Estado_Prov = ?',
            ['Activo']
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Crear un nuevo proveedor
export async function POST(request) {
    try {
        const data = await request.json();
        const { Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov } = data;

        const [result] = await pool.query(
            'INSERT INTO TbInv_Proveedor (Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, Estado_Prov) VALUES (?, ?, ?, ?, ?)',
            [Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, 'Activo']
        );

        return NextResponse.json({ 
            id: result.insertId,
            message: 'Proveedor creado correctamente' 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
