import { useState, useEffect } from "react";

export default function MovimientoInventarioForm({ movimiento, onSubmit, onClose }) {
    const [tiposMovimiento, setTiposMovimiento] = useState([]);
    const [productos, setProductos] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [metodosValoracion, setMetodosValoracion] = useState([]);
    const [inventarios, setInventarios] = useState([]);

    const [tipoMovimiento, setTipoMovimiento] = useState("");
    const [producto, setProducto] = useState("");
    const [inventario, setInventario] = useState("");
    const [almacenOrigen, setAlmacenOrigen] = useState("");
    const [almacenDestino, setAlmacenDestino] = useState("");
    const [metodoValoracion, setMetodoValoracion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechaMovimiento, setFechaMovimiento] = useState("");

    useEffect(() => {
        fetch("/api/inventario/tipoMovimiento")
            .then((res) => res.json())
            .then((data) => setTiposMovimiento(data));

        fetch("/api/inventario/producto")
            .then((res) => res.json())
            .then((data) => setProductos(data));

        fetch("/api/inventario/almacen")
            .then((res) => res.json())
            .then((data) => setAlmacenes(data));

        fetch("/api/inventario/metodoValoracion")
            .then((res) => res.json())
            .then((data) => setMetodosValoracion(data));

        fetch("/api/inventario/inventario")
            .then((res) => res.json())
            .then((data) => setInventarios(data));
    }, []);

    useEffect(() => {
        if (movimiento) {
            setTipoMovimiento(movimiento.Id_TipoMovimiento_MoI || "");
            setProducto(movimiento.Id_Producto_MoI || "");
            setInventario(movimiento.Id_Inventario_MoI || "");
            setAlmacenOrigen(movimiento.Id_AlmacenOrigen_MoI || "");
            setAlmacenDestino(movimiento.Id_AlmacenDestino_MoI || "");
            setMetodoValoracion(movimiento.Id_MetodoValoracion_MoI || "");
            setCantidad(movimiento.Cantidad_MoI || "");
            setFechaMovimiento(movimiento.FechaMovimiento_MoI ? movimiento.FechaMovimiento_MoI.split("T")[0] : "");
        }
    }, [movimiento]);

    useEffect(() => {
        if (tipoMovimiento === "1") setAlmacenOrigen("");
        if (tipoMovimiento === "2") setAlmacenDestino("");
        if (tipoMovimiento !== "3") {
            setAlmacenOrigen("");
            setAlmacenDestino("");
        }
    }, [tipoMovimiento]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipoMovimiento || !producto || !inventario || !cantidad || !metodoValoracion) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (cantidad <= 0) {
            alert("La cantidad debe ser mayor a 0.");
            return;
        }

        if (tipoMovimiento === "1" && !almacenDestino) {
            alert("Debe seleccionar un almacén de destino para la entrada.");
            return;
        }
        if (tipoMovimiento === "2" && !almacenOrigen) {
            alert("Debe seleccionar un almacén de origen para la salida.");
            return;
        }
        if (tipoMovimiento === "3" && (!almacenOrigen || !almacenDestino)) {
            alert("Debe seleccionar un almacén de origen y un almacén de destino para el traslado.");
            return;
        }
        if (tipoMovimiento === "3" && almacenOrigen === almacenDestino) {
            alert("El almacén de origen y destino no pueden ser el mismo.");
            return;
        }

        const data = {
            Id_TipoMovimiento_MoI: tipoMovimiento,
            Id_Producto_MoI: producto,
            Id_Inventario_MoI: inventario,
            Id_MetodoValoracion_MoI: metodoValoracion,
            Id_AlmacenOrigen_MoI: tipoMovimiento === "2" || tipoMovimiento === "3" ? almacenOrigen : null,
            Id_AlmacenDestino_MoI: tipoMovimiento === "1" || tipoMovimiento === "3" ? almacenDestino : null,
            Cantidad_MoI: cantidad,
            FechaMovimiento_MoI: movimiento ? fechaMovimiento : undefined,
            Estado_MoI: "AC",
        };

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Tipo de Movimiento</label>
                <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                    <option value="">Seleccione un tipo de movimiento</option>
                    {tiposMovimiento.map((tm) => (
                        <option key={tm.Id_TipoMovimiento} value={tm.Id_TipoMovimiento}>{tm.Nombre_TiM}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Producto</label>
                <select value={producto} onChange={(e) => setProducto(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                    <option value="">Seleccione un producto</option>
                    {productos.map((p) => (
                        <option key={p.Id_Producto} value={p.Id_Producto}>{p.Nombre_Pro}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Inventario</label>
                <select value={inventario} onChange={(e) => setInventario(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required disabled>
                    <option value="">Seleccione un inventario</option>
                    {inventarios.map((inv) => (
                        <option key={inv.Id_Inventario} value={inv.Id_Inventario}>
                            {`ID: ${inv.Id_Inventario} - Producto: ${inv.Nombre_Producto} - Cantidad: ${inv.Cantidad_Inv}`}
                        </option>
                    ))}
                </select>
            </div>

            {tipoMovimiento === "2" || tipoMovimiento === "3" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Almacén Origen</label>
                    <select value={almacenOrigen} onChange={(e) => setAlmacenOrigen(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                        <option value="">Seleccione un almacén de origen</option>
                        {almacenes.map((a) => (
                            <option key={a.Id_Almacen} value={a.Id_Almacen}>{a.Nombre_Alm}</option>
                        ))}
                    </select>
                </div>
            ) : null}

            {tipoMovimiento === "1" || tipoMovimiento === "3" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Almacén Destino</label>
                    <select value={almacenDestino} onChange={(e) => setAlmacenDestino(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                        <option value="">Seleccione un almacén de destino</option>
                        {almacenes.map((a) => (
                            <option key={a.Id_Almacen} value={a.Id_Almacen}>{a.Nombre_Alm}</option>
                        ))}
                    </select>
                </div>
            ) : null}

            <div>
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
            </div>

            {movimiento && (
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Movimiento</label>
                    <input type="date" value={fechaMovimiento} onChange={(e) => setFechaMovimiento(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
                </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{movimiento ? "Actualizar" : "Agregar"}</button>
            </div>
        </form>
    );
}
