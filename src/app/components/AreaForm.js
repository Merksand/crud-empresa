export default function AreaForm({ area, onSubmit, onClose, estructuras = [] }) {
    console.log("Estructuras recibidas: ", estructuras); // Agrega este console.log para verificar los datos

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const fechaCreacion = formData.get("fechaCreacion");
        const fechaFormateada = fechaCreacion
            ? new Date(fechaCreacion).toISOString().split("T")[0]
            : null;

        const data = {
            Nombre_Are: formData.get("nombre"),
            Resolucion_Are: formData.get("resolucion"),
            Fecha_Creacion_Ar: fechaFormateada,
            Nivel_Are:formData.get("nivel"),
            Estado_Are: formData.get("estado"),
            Id_Estructura_Ar: formData.get("estructura"), // Captura la estructura seleccionada
        };

        console.log("data de areaForm ", data);

        if (!data.Fecha_Creacion_Ar) {
            console.error("Error: Fecha de creación no válida.");
            return;
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para seleccionar la estructura */}
            <div>
                <label className="block text-sm font-medium mb-1">Estructura</label>
                <select
                    name="estructura"
                    defaultValue={area?.Id_Estructura_Ar || ""}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>
                        Seleccione una estructura
                    </option>
                    {estructuras.map((estructura) => (
                        <option key={estructura.Id_Estructura} value={estructura.Id_Estructura}>
                            {estructura.Resolucion_Est || `Estructura ${estructura.Id_Estructura}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Campo para el nombre */}
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={area?.Nombre_Are}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para la resolución */}
            <div>
                <label className="block text-sm font-medium mb-1">Resolución</label>
                <input
                    type="text"
                    name="resolucion"
                    defaultValue={area?.Resolucion_Are}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para la fecha de creación */}
            <div>
                <label className="block text-sm font-medium mb-1">Fecha de Creación</label>
                <input
                    type="date"
                    name="fechaCreacion"
                    defaultValue={area?.Fecha_Creacion_Ar?.split("T")[0]}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Nivel</label>
                <input
                    type="number"
                    name="nivel"
                    defaultValue={area?.Nivel_Are || 1} // Nivel predeterminado
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    min="1"
                    required
                />
            </div>

            {/*<div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={area?.Estado_Are || "Activo"}
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
                    {area ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}