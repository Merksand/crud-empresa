import { useState, useEffect } from "react";

export default function TipoMovimientoForm({ movimiento, onSubmit, onClose }) {
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");

    // Cargar datos si está en modo edición
    useEffect(() => {
        if (movimiento) {
            setNombre(movimiento.Nombre_TiM || "");
            setCodigo(movimiento.Codigo_TiM || "");
        }
    }, [movimiento]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre) {
            alert("Por favor, ingrese un nombre para el tipo de movimiento.");
            return;
        }
        const data = {
            Nombre_TiM: nombre,
            Codigo_TiM: codigo || null,
            Estado_TiM: "AC", // Estado activo por defecto
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre del Tipo de Movimiento</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Código (Opcional)</label>
                <input
                    type="number"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
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
                    {movimiento ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
}
