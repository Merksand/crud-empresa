import { useState, useEffect } from "react";

export default function LoteProductoForm({ loteProducto, onSubmit, onClose }) {
    const [lotes, setLotes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [lote, setLote] = useState("");
    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");

    // Cargar lista de lotes y productos al iniciar
    useEffect(() => {
        fetch("/api/inventario/lote")
            .then((res) => res.json())
            .then((data) => setLotes(data))
            .catch((err) => console.error("Error al cargar lotes", err));

        fetch("/api/inventario/producto")
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((err) => console.error("Error al cargar productos", err));
    }, []);

    // Cargar datos si está en modo edición
    useEffect(() => {
        if (loteProducto) {
            setLote(loteProducto.Id_Lote_LoP || "");
            setProducto(loteProducto.Id_Producto_LoP || "");
            setCantidad(loteProducto.Cantidad_LoP || "");
        }
    }, [loteProducto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!lote || !producto || !cantidad) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        const data = {
            Id_Lote_LoP: lote,
            Id_Producto_LoP: producto,
            Cantidad_LoP: cantidad,
            Estado_LoP: "AC", // Estado activo por defecto
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para seleccionar el lote */}
            <div>
                <label className="block text-sm font-medium mb-1">Lote</label>
                <select
                    value={lote}
                    onChange={(e) => setLote(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un lote</option>
                    {lotes.map((l) => (
                        <option key={l.Id_Lote} value={l.Id_Lote}>
                            {l.NroLote_Lot}
                        </option>
                    ))}
                </select>
            </div>

            {/* Campo para seleccionar el producto */}
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

            {/* Campo para la cantidad */}
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

            {/* Botones para cancelar o agregar/actualizar */}
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
                    {loteProducto ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
}
