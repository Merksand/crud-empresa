export default function LoteForm({ lote, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            NroLote_Lot: formData.get("nroLote"),
            Descripcion_Lot: formData.get("descripcion"),
            CodigoBarras_Lot: formData.get("codigoBarras"),
            FechaVencimiento_Lot: formData.get("fechaVencimiento"),
            Estado_Lot: "AC", // El estado siempre será "AC" al crear
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white shadow dark:bg-gray-800">
            {/* Campo para el número de lote */}
            <div>
                <label className="block text-sm font-medium mb-1">Número de Lote</label>
                <input
                    type="number"
                    name="nroLote"
                    defaultValue={lote?.NroLote_Lot}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para la descripción del lote */}
            <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                    type="text"
                    name="descripcion"
                    defaultValue={lote?.Descripcion_Lot}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para el código de barras */}
            <div>
                <label className="block text-sm font-medium mb-1">Código de Barras</label>
                <input
                    type="text"
                    name="codigoBarras"
                    defaultValue={lote?.CodigoBarras_Lot}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            {/* Campo para la fecha de vencimiento */}
            <div>
                <label className="block text-sm font-medium mb-1">Fecha de Vencimiento</label>
                <input
                    type="date"
                    name="fechaVencimiento"
                    defaultValue={lote?.FechaVencimiento_Lot?.split("T")[0]}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Botones para cancelar o guardar */}
            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {lote ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
