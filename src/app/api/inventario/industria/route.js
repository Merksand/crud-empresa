import { NextResponse } from 'next/server';
import {pool} from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbInv_Industria');
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Dato no encontrado' },
        { status: 404 });
    }
  
    return NextResponse.json(rows);
    
  } catch (error) {
    console.error(error);
  }
}
