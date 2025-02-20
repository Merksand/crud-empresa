export default function MonedaForm({ moneda, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Codigo_Mon: formData.get("codigo"),
            Nombre_Mon: formData.get("nombre")
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para el código de la moneda */}
            <div>
                <label className="block text-sm font-medium mb-1">Código</label>
                <input
                    type="text"
                    name="codigo"
                    defaultValue={moneda?.Codigo_Mon}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    maxLength="3"
                    required
                />
            </div>

            {/* Campo para el nombre de la moneda */}
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={moneda?.Nombre_Mon}
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
                    {moneda ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
