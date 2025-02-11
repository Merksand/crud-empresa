export default function MarcaForm({ marca, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Nombre_Mar: formData.get("nombre"),
            Estado_Mar: formData.get("estado"),
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para el nombre de la marca */}
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={marca?.Nombre_Mar}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para el estado de la marca */}
            <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={marca?.Estado_Mar || "Activo"}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
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
                    {marca ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}