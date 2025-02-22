import { useState, useEffect } from "react";

export default function MovimientoInventarioForm({ movimiento, onSubmit, onClose }) {
    const [tiposMovimiento, setTiposMovimiento] = useState([]);
    const [productos, setProductos] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [metodosValoracion, setMetodosValoracion] = useState([]);

    const [tipoMovimiento, setTipoMovimiento] = useState("");
    const [producto, setProducto] = useState("");
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
    }, []);

    useEffect(() => {
        if (movimiento) {
            setTipoMovimiento(movimiento.Id_TipoMovimiento_MoI || "");
            setProducto(movimiento.Id_Producto_MoI || "");
            setAlmacenOrigen(movimiento.Id_AlmacenOrigen_MoI || "");
            setAlmacenDestino(movimiento.Id_AlmacenDestino_MoI || "");
            setMetodoValoracion(movimiento.Id_MetodoValoracion_MoI || "");
            setCantidad(movimiento.Cantidad_MoI || "");
            setFechaMovimiento(movimiento.FechaMovimiento_MoI ? movimiento.FechaMovimiento_MoI.split("T")[0] : "");
        }
    }, [movimiento]);

    useEffect(() => {
        if (!movimiento) {  // Solo se ejecuta si es un nuevo movimiento
            if (tipoMovimiento === "1") setAlmacenOrigen(""); // Entrada
            if (tipoMovimiento === "2") setAlmacenDestino(""); // Salida
            if (tipoMovimiento !== "3") {
                setAlmacenOrigen("");
                setAlmacenDestino("");
            }
        }
    }, [tipoMovimiento, movimiento]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipoMovimiento || !producto || !cantidad || !metodoValoracion) {
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
            Id_MetodoValoracion_MoI: metodoValoracion,
            Id_AlmacenOrigen_MoI: almacenOrigen,
            Id_AlmacenDestino_MoI: almacenDestino,
            Cantidad_MoI: cantidad,
            FechaMovimiento_MoI: movimiento ? fechaMovimiento : undefined,
            Estado_MoI: "AC",
        };


        console.log("🚀 Datos enviados al backend:", data);  // <-- Revisa la consola para asegurarte de que los valores no sean `null`
        console.log("ALAMCEN  ORIGEN:", almacenOrigen)
        console.log("ALAMCEN DESTINO:", almacenDestino)
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
                    {productos.map((p) => {
                        // console.log("Producto: ", p)
                        return (
                            <option key={p.Id_Producto} value={p.Id_Producto}>{p.Nombre_Pro}</option>
                        )
                    })}
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
                <label className="block text-sm font-medium mb-1">Método de Valoración</label>
                <select value={metodoValoracion} onChange={(e) => setMetodoValoracion(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                    <option value="">Seleccione un método de valoración</option>
                    {metodosValoracion.map((mv) => (
                        <option key={mv.Id_MetodoValoracion} value={mv.Id_MetodoValoracion}>{mv.Nombre_MeV}</option>
                    ))}
                </select>
            </div>

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
