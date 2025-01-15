export default function CargoForm({ cargo, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Nombre_Car: formData.get("nombre"),
            Nivel_Car: parseInt(formData.get("nivel")),
            Sueldo_Car: parseFloat(formData.get("sueldo_local")),
            Sueldo_USD_Car: parseFloat(formData.get("sueldo_usd")),
            Resolucion_Car: formData.get("resolucion"),
           // Estado_Dep: formData.get("estado"),
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
                    defaultValue={cargo?.Nombre_Car}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Nivel</label>
                <input
                    type="number"
                    name="nivel"
                    defaultValue={cargo?.Nivel_Car}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Sueldo Local</label>
                <input
                    type="number"
                    name="sueldo_local"
                    step="0.01"
                    defaultValue={cargo?.Sueldo_Car}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Sueldo USD</label>
                <input
                    type="number"
                    name="sueldo_usd"
                    step="0.01"
                    defaultValue={cargo?.Sueldo_USD_Car}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Resolución</label>
                <input
                    type="text"
                    name="resolucion"
                    defaultValue={cargo?.Resolucion_Car}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

         {/*   <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={cargo?.Estado_Dep || "Activo"}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>*/}

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
                    {cargo ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
