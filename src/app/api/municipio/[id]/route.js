// GET - Obtener información específica del municipio
export async function GET(request, { params }) {
    try {
      const { municipioId } = params;
  
      const [rows] = await pool.query(
        'SELECT * FROM TbMunicipio WHERE Id_Municipio = ?',
        [municipioId]
      );
  
      if (rows.length === 0) {
        return NextResponse.json(
          { error: 'Municipio no encontrado' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(rows[0]);
    } catch (error) {
      return NextResponse.json(
        { error: error.message || 'Error al obtener el municipio' },
        { status: 500 }
      );
    }
  }
  