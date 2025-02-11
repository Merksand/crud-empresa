import { useState, useEffect } from "react";

export default function SucursalForm({ sucursal, onSubmit, onClose }) {
    const [empresasSucursales, setEmpresasSucursales] = useState([]);
    const [selectedEmpresaSucursal, setSelectedEmpresaSucursal] = useState("");

    useEffect(() => {
        fetch("/api/empresa-sucursal")
            .then((res) => res.json())
            .then((data) => setEmpresasSucursales(data));
    }, []);

    useEffect(() => {
        if (sucursal) {
            setSelectedEmpresaSucursal(sucursal.Id_Empresa_Suc || "");
        }
    }, [sucursal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Id_Empresa_Suc: selectedEmpresaSucursal,
            Nombre_Parametro_Suc: e.target.nombreParametro.value,
            Nombre_Suc: e.target.nombre.value,
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Empresa - Sucursal</label>
                <select
                    name="empresaSucursal"
                    value={selectedEmpresaSucursal}
                    onChange={(e) => setSelectedEmpresaSucursal(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione una Empresa - Sucursal</option>
                    {empresasSucursales.map((es) => (
                        <option key={es.Id_Empresa_Sucursal} value={es.Id_Empresa_Sucursal}>
                            {`${es.Nombre_Empresa} - ${es.Nombre_Sucursal}`}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Nombre del Parámetro</label>
                <input
                    type="text"
                    name="nombreParametro"
                    defaultValue={sucursal?.Nombre_Parametro_Suc || ""}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Nombre de la Sucursal</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={sucursal?.Nombre_Suc || ""}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
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
