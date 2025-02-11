export default function ProveedorForm({ proveedor, onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Nombre_Prov: formData.get("nombre"),
            Direccion_Prov: formData.get("direccion"),
            Telefono_Prov: formData.get("telefono"),
            Correo_Prov: formData.get("correo"),
            Estado_Prov: formData.get("estado"),
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para el nombre del proveedor */}
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={proveedor?.Nombre_Prov}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para la dirección del proveedor */}
            <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                    type="text"
                    name="direccion"
                    defaultValue={proveedor?.Direccion_Prov}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            {/* Campo para el teléfono del proveedor */}
            <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                    type="text"
                    name="telefono"
                    defaultValue={proveedor?.Telefono_Prov}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            {/* Campo para el correo del proveedor */}
            <div>
                <label className="block text-sm font-medium mb-1">Correo</label>
                <input
                    type="email"
                    name="correo"
                    defaultValue={proveedor?.Correo_Prov}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            {/* Campo para el estado del proveedor 
            <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                    name="estado"
                    defaultValue={proveedor?.Estado_Prov || "Activo"}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            */}
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
                    {proveedor ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
