import { useState, useEffect } from "react";

export default function MetodoValoracionForm({ metodo, onSubmit, onClose }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    // Cargar datos si está en modo edición
    useEffect(() => {
        if (metodo) {
            setNombre(metodo.Nombre_MeV || "");
            setDescripcion(metodo.Descripcion_MeV || "");
        }
    }, [metodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre) {
            alert("Por favor, ingrese un nombre para el método de valoración.");
            return;
        }
        const data = {
            Nombre_MeV: nombre,
            Descripcion_MeV: descripcion || "",
            Estado_MeV: "AC", // Estado activo por defecto
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre del Método de Valoración</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Descripción (Opcional)</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
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
                    {metodo ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
}
