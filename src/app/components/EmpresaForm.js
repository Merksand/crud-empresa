export default function EmpresaForm({ empresa, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Nombre_Emp: formData.get("nombre"),
            Sede_Emp: formData.get("sede"),
            Fecha_Fundacion_Emp: formData.get("fechaFundacion"),
            Tipo_Emp: formData.get("tipo"),
            Idioma_Emp: formData.get("idioma"),
            Estado_Emp: formData.get("estado"),
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
                    defaultValue={empresa?.Nombre_Emp}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Sede</label>
                <input
                    type="text"
                    name="sede"
                    defaultValue={empresa?.Sede_Emp}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Fecha Fundación
                </label>
                <input
                    type="date"
                    name="fechaFundacion"
                    defaultValue={empresa?.Fecha_Fundacion_Emp?.split("T")[0]}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                    name="tipo"
                    defaultValue={empresa?.Tipo_Emp || ''}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="S.A.">S.A.</option>
                    <option value="S.L.">S.L.</option>
                    <option value="Autónomo">Autónomo</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Idioma</label>
                <input
                    type="text"
                    name="idioma"
                    defaultValue={empresa?.Idioma_Emp}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={empresa?.Estado_Emp || 'Activo'}
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
                    {empresa ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
