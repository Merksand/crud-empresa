import { useState, useEffect } from "react";

export default function MovimientoInventarioForm({ movimiento, onSubmit, onClose }) {
    const [tiposMovimiento, setTiposMovimiento] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [metodosValoracion, setMetodosValoracion] = useState([]);

    const [tipoMovimiento, setTipoMovimiento] = useState("");
    const [categoria, setCategoria] = useState("");
    const [producto, setProducto] = useState("");
    const [almacenOrigen, setAlmacenOrigen] = useState("");
    const [almacenDestino, setAlmacenDestino] = useState("");
    const [metodoValoracion, setMetodoValoracion] = useState("");
    const [cantidad, setCantidad] = useState("");

    const [almacenesDisponibles, setAlmacenesDisponibles] = useState([]);
    // const [fechaMovimiento, setFechaMovimiento] = useState("");


    // 🔹 Campos exclusivos para devoluciones
    const [motivo, setMotivo] = useState("");
    const [autorizacion, setAutorizacion] = useState("");

    // 🔹 Campos exclusivos para bajas
    const [motivo2, setMotivo2] = useState("");
    const [autorizacion2, setAutorizacion2] = useState("");

    // 🔹 Campos exclusivos para Ajustes
    const [motivo3, setMotivo3] = useState("");

const [categoriasConSalida, setCategoriasConSalida] = useState([]);

    useEffect(() => {
        fetch("/api/inventario/movimientoInventario/categoriasConSalida")
            .then((res) => res.json())
            .then(setCategoriasConSalida)
            .catch((error) => console.error("Error al cargar categorías con salida:", error));
    }, []);



    const [productosConSalida, setProductosConSalida] = useState([]);

    useEffect(() => {
        if (categoria) {
            fetch(`/api/inventario/movimientoInventario/productosConSalida?categoria=${categoria}`)
                .then((res) => res.json())
                .then(setProductosConSalida)
                .catch((error) => console.error("Error al cargar productos con salida:", error));
        } else {
            setProductosConSalida([]);
        }
    }, [categoria]);



    useEffect(() => {
        fetch("/api/inventario/tipoMovimiento")
            .then((res) => res.json())
            .then(setTiposMovimiento);

        fetch("/api/inventario/categoriasFuncionales")
            .then((res) => res.json())
            .then(setCategorias);

        fetch("/api/inventario/producto")
            .then((res) => res.json())
            .then(setProductos);

        fetch("/api/inventario/almacen")
            .then((res) => res.json())
            .then(setAlmacenes);

        fetch("/api/inventario/metodoValoracion")
            .then((res) => res.json())
            .then(setMetodosValoracion);
    }, []);

    useEffect(() => {
        if (producto) {
            fetch(`/api/inventario/movimientoInventario/almacenesPorProducto?idProducto=${producto}`)
                .then((res) => res.json())
                .then(setAlmacenesDisponibles)
                .catch((error) => console.error("Error al cargar almacenes con stock:", error));
        } else {
            setAlmacenesDisponibles([]);
        }
    }, [producto]);

    useEffect(() => {
        if (movimiento) {
            setTipoMovimiento(movimiento.Id_TipoMovimiento_MoI || "");
            setCategoria(movimiento.Id_Categoria_Pro || "");
            setProducto(movimiento.Id_Producto_MoI || "");
            setAlmacenOrigen(movimiento.Id_AlmacenOrigen_MoI || "");
            setAlmacenDestino(movimiento.Id_AlmacenDestino_MoI || "");
            setMetodoValoracion(movimiento.Id_MetodoValoracion_MoI || "");
            setCantidad(movimiento.Cantidad_MoI || "");
            // setFechaMovimiento(movimiento.FechaMovimiento_MoI ? movimiento.FechaMovimiento_MoI.split("T")[0] : "");
            setMotivo(movimiento.Motivo_Dev || "");
            setAutorizacion(movimiento.Autorizacion_Dev || "");
            setMotivo2(movimiento.Motivo_Baj || "");
            setAutorizacion2(movimiento.Autorizacion_Baj || "");
            setMotivo3(movimiento.Motivo_Aju || "");
        }
    }, [movimiento]);

    useEffect(() => {
        setProductosFiltrados(
            categoria ? productos.filter(p => p.Id_Categoria_Pro === Number(categoria)) : []
        );
    }, [categoria, productos]);

    useEffect(() => {
        if (!movimiento) {
            if (tipoMovimiento === "1") setAlmacenOrigen("");
            if (tipoMovimiento === "2") setAlmacenDestino("");
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

        if (tipoMovimiento === "1" && !almacenOrigen) {
            alert("Debe seleccionar un almacén de origen para la salida.");
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
            Id_TipoMovimiento_MoI: Number(tipoMovimiento),
            Id_Producto_MoI: Number(producto),
            Id_MetodoValoracion_MoI: Number(metodoValoracion),
            Id_AlmacenOrigen_MoI: almacenOrigen ? Number(almacenOrigen) : null,
            Id_AlmacenDestino_MoI: almacenDestino ? Number(almacenDestino) : null,
            Cantidad_MoI: Number(cantidad),
            // FechaMovimiento_MoI: movimiento ? fechaMovimiento : undefined,
            Estado_MoI: "AC",
            ...(tipoMovimiento === "4" ? { Motivo_Dev: motivo, Autorizacion_Dev: autorizacion } : {}),
            ...(tipoMovimiento === "7" ? { Motivo_Baj: motivo2, Autorizacion_Baj: autorizacion2 } : {}),
            ...(tipoMovimiento === "5" ? { Motivo_Aju: motivo3} : {}),
            ...(tipoMovimiento === "6" ? { Motivo_Aju: motivo3} : {}),
        };

        console.log("🚀 Datos enviados al backend:", data);
        console.log(typeof data.Cantidad_MoI)
        onSubmit(data);
    };
    console.log("🚀 Almacenes destino disponibles:", almacenDestino);
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

            {tipoMovimiento === "1" || tipoMovimiento === "2" || tipoMovimiento === "3" || tipoMovimiento === "7" || tipoMovimiento === "5" || tipoMovimiento === "6" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700">
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.Id_Categoria} value={cat.Id_Categoria}>
                                {cat.Nombre_Cat}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null}

            {tipoMovimiento === "4" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                        disabled={categoriasConSalida.length === 0}
                    >
                        {categoriasConSalida.length === 0 ? (
                            <option value="">⚠️ No hay categorías con salida previa</option>
                        ) : (
                            <>
                                <option value="">Seleccione una categoría</option>
                                {categoriasConSalida.map((c) => (
                                    <option key={c.Id_Categoria} value={c.Id_Categoria}>
                                        {c.Nombre_Cat}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            ) : null}


            {tipoMovimiento === "4"?  (
                <div>
                    <label className="block text-sm font-medium mb-1">Producto</label>
                    <select
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                        disabled={productosConSalida.length === 0}
                    >
                        {productosConSalida.length === 0 ? (
                            <option value="">⚠️ No hay productos con salida previa</option>
                        ) : (
                            <>
                                <option value="">Seleccione un producto</option>
                                {productosConSalida.map((p) => (
                                    <option key={p.Id_Producto} value={p.Id_Producto}>
                                        {p.Nombre_Pro}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            ) : null}


            {tipoMovimiento === "1" || tipoMovimiento === "2" || tipoMovimiento === "3" || tipoMovimiento === "7" || tipoMovimiento === "5" || tipoMovimiento === "6" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Producto</label>
                    <select value={producto} onChange={(e) => setProducto(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                        <option value="">Seleccione un producto</option>
                        {productosFiltrados.map((p) => (
                            <option key={p.Id_Producto} value={p.Id_Producto}>
                                {p.Nombre_Pro}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null}


            {/* {tipoMovimiento === "1" || tipoMovimiento === "2" || tipoMovimiento === "3" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Almacén Origen</label>
                    <select value={almacenOrigen} onChange={(e) => setAlmacenOrigen(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required>
                        <option value="">Seleccione un almacén de origen</option>
                        {almacenes.map((a) => (
                            <option key={a.Id_Almacen} value={a.Id_Almacen}>{a.Nombre_Alm}</option>
                        ))}
                    </select>
                </div>
            ) : null} */}

            {tipoMovimiento === "1" || tipoMovimiento === "2" || tipoMovimiento === "3" || tipoMovimiento === "4" || tipoMovimiento === "7" || tipoMovimiento === "5" || tipoMovimiento === "6" ? (
                <div>
                    <label className="block text-sm font-medium mb-1">Almacén Origen</label>
                    <select
                        value={almacenOrigen}
                        onChange={(e) => setAlmacenOrigen(e.target.value)}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                        disabled={almacenesDisponibles.length === 0}
                    >
                        {almacenesDisponibles.length === 0 ? (
                            <option value="">⚠️ No hay almacenes con stock disponible</option>
                        ) : (
                            <>
                                <option value="">Seleccione un almacén de origen</option>
                                {almacenesDisponibles.map((a) => (
                                    <option key={a.Id_Almacen} value={a.Id_Almacen}>
                                        {a.Nombre_Alm} (Stock: {a.Cantidad_Inv})
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            ) : null}


            {tipoMovimiento === "3" ? (
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


            {/* Inputs adicionales para devolución */}
            {tipoMovimiento === "4" && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Motivo de Devolución</label>
                        <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Autorización</label>
                        <input type="text" value={autorizacion} onChange={(e) => setAutorizacion(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
                    </div>
                </>
            )}




            {/* Inputs adicionales para bajas */}
            {tipoMovimiento === "7" && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Motivo de Baja</label>
                        <textarea value={motivo2} onChange={(e) => setMotivo2(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Autorización</label>
                        <input type="text" value={autorizacion2} onChange={(e) => setAutorizacion2(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
                    </div>
                </>
            )}

            {/* Inputs adicionales para Ajustes */}
            {tipoMovimiento === "5" || tipoMovimiento === "6" && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Motivo de Ajuste</label>
                        <textarea value={motivo3} onChange={(e) => setMotivo3(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" required />
                    </div>
                </>
            )}



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
                <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700" min="1" required />
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{movimiento ? "Actualizar" : "Agregar"}</button>
            </div>
        </form>
    );
}
