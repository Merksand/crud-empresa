import { useState, useEffect } from "react";

export default function TipoMovimientoForm({ movimiento, onSubmit, onClose }) {
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [colorSeleccionado, setColorSeleccionado] = useState();

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

    const coloresDisponibles = [
        { nombre: "Verde", color: "#28a745" },
        { nombre: "Rojo", color: "#dc3545" },
        { nombre: "Azul", color: "#007bff" },
        { nombre: "Amarillo", color: "#ffc107" },
        { nombre: "Morado", color: "#6f42c1" },
        { nombre: "Naranja", color: "#fd7e14" },
        { nombre: "Gris", color: "#6c757d" },
        { nombre: "Cian", color: "#17a2b8" },
        { nombre: "Rosa", color: "#e83e8c" }
    ];


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color del Tipo de Movimiento
                </label>
                <div className="relative">
                    <select
                        name="Color_TiM"
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                        className="block appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg text-gray-700 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                    >
                        <option value="">Seleccione un color</option>
                        {coloresDisponibles.map((color, index) => (
                            <option
                                key={index}
                                value={color.color}
                                style={{ backgroundColor: color.color }}
                            >
                                {color.nombre}
                            </option>
                        ))}
                    </select>
                    {/* Ícono de flecha */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
                        </svg>
                    </div>
                </div>

                {/* Vista previa del color seleccionado */}
                {colorSeleccionado && (
                    <div
                        className="w-10 h-10 mt-4 border-2 border-gray-300 rounded-full"
                        style={{ backgroundColor: colorSeleccionado }}
                    />
                )}
            </div>

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
