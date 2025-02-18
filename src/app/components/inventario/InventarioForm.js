import { useState, useEffect } from "react";

export default function InventarioForm({ inventario, onSubmit, onClose }) {
    const [productos, setProductos] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [producto, setProducto] = useState("");
    const [almacen, setAlmacen] = useState("");
    const [cantidad, setCantidad] = useState("");

    // Cargar lista de productos y almacenes al iniciar
    useEffect(() => {
        fetch("/api/inventario/producto")
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((err) => console.error("Error al cargar productos", err));

        fetch("/api/inventario/almacen")
            .then((res) => res.json())
            .then((data) => setAlmacenes(data))
            .catch((err) => console.error("Error al cargar almacenes", err));
    }, []);

    // Cargar datos si está en modo edición
    useEffect(() => {
        if (inventario) {
            setProducto(inventario.Id_Producto_Inv || "");
            setAlmacen(inventario.Id_Almacen_Inv || "");
            setCantidad(inventario.Cantidad_Inv || "");
        }
    }, [inventario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!producto || !almacen || !cantidad) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        const data = {
            Id_Producto_Inv: producto,
            Id_Almacen_Inv: almacen,
            Cantidad_Inv: cantidad,
            Estado_Inv: "AC", // Estado activo por defecto
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Producto</label>
                <select
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un producto</option>
                    {productos.map((p) => (
                        <option key={p.Id_Producto} value={p.Id_Producto}>
                            {p.Nombre_Pro}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Almacén</label>
                <select
                    value={almacen}
                    onChange={(e) => setAlmacen(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un almacén</option>
                    {almacenes.map((a) => (
                        <option key={a.Id_Almacen} value={a.Id_Almacen}>
                            {a.Nombre_Alm}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
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
                    {inventario ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
}
