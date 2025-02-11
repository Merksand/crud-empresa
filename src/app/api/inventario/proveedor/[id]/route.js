import { NextResponse } from "next/server";
import { pool } from '@/lib/db';

// GET - Obtener un proveedor específico
export async function GET(request, { params }) {
    try {
        const [rows] = await pool.query(
            'SELECT Id_Proveedor, Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, Estado_Prov FROM TbInv_Proveedor WHERE Id_Proveedor = ?',
            [params.id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Actualizar proveedor
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const { Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, Estado_Prov } = data;

        const [result] = await pool.query(
            'UPDATE TbInv_Proveedor SET Nombre_Prov = ?, Direccion_Prov = ?, Telefono_Prov = ?, Correo_Prov = ? WHERE Id_Proveedor = ?',
            [Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Dar de baja un proveedor
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }

        const [result] = await pool.query(
            'UPDATE TbInv_Proveedor SET Estado_Prov = ? WHERE Id_Proveedor = ?',
            ['Inactivo', id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Proveedor dado de baja correctamente' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al dar de baja el proveedor: ' + error.message }, { status: 500 });
    }
}
