import { useState, useEffect } from "react";

export default function CategoriaForm({ categoria, categoriasPadre, onSubmit, onClose }) {
    const [nombreCat, setNombreCat] = useState("");
    const [categoriaPadre, setCategoriaPadre] = useState("");

    useEffect(() => {
        if (categoria) {
            setNombreCat(categoria.Nombre_Cat);
            setCategoriaPadre(categoria.Id_Categoria_Padre_Cat || "");
        }
    }, [categoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Nombre_Cat: nombreCat,
            Id_Categoria_Padre_Cat: categoriaPadre === "" ? null : categoriaPadre,
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
                <label className="block text-sm font-medium mb-1">Categoría Padre</label>
                <select
                    value={categoriaPadre}
                    onChange={(e) => setCategoriaPadre(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                >
                    <option value="">Ninguna</option>
                    {categoriasPadre.map((cat) => (
                        <option key={cat.Id_Categoria} value={cat.Id_Categoria}>
                            {cat.Nombre_Cat}
                        </option>
                    ))}
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
                    {categoria ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
