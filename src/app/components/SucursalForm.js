export default function SucursalForm({ sucursal, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Id_Municipio_Suc: parseInt(formData.get("municipio")),
            Id_Geolocalizacion_Suc: parseInt(formData.get("geolocalizacion")),
            Nombre_Parametro_Suc: formData.get("parametro"),
            Nombre_Suc: formData.get("nombre"),
            Estado_Suc: formData.get("estado"),
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={sucursal?.Nombre_Suc}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    ID Municipio
                </label>
                <input
                    type="number"
                    name="municipio"
                    defaultValue={sucursal?.Id_Municipio_Suc}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    ID Geolocalización
                </label>
                <input
                    type="number"
                    name="geolocalizacion"
                    defaultValue={sucursal?.Id_Geolocalizacion_Suc}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Nombre Parámetro
                </label>
                <input
                    type="text"
                    name="parametro"
                    defaultValue={sucursal?.Nombre_Parametro_Suc}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={sucursal?.Estado_Suc || "Activo"}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>

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
                    {sucursal ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
