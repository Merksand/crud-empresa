"use client";
import { useState } from "react";

export default function CategoriaForm({ categoria, onSubmit, onClose }) {
    const [nombreCat, setNombreCat] = useState("");
    const [descripcionCat, setDescripcionCat] = useState("");

    // Cargar datos de la categoría al editar
    useEffect(() => {
        if (categoria) {
            setNombreCat(categoria.Nombre_Cat);
            setDescripcionCat(categoria.Descripcion_Cat);
        }
    }, [categoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Nombre_Cat: nombreCat,
            Descripcion_Cat: descripcionCat,
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    value={nombreCat}
                    onChange={(e) => setNombreCat(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                    value={descripcionCat}
                    onChange={(e) => setDescripcionCat(e.target.value)}
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
                    {categoria ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}