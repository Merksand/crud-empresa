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
    const [fechaMovimiento, setFechaMovimiento] = useState("");

    useEffect(() => {
        fetch("/api/inventario/tipoMovimiento")
            .then((res) => res.json())
            .then(setTiposMovimiento);

        fetch("/api/inventario/categoria")
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
        if (movimiento) {
            setTipoMovimiento(movimiento.Id_TipoMovimiento_MoI || "");
            setCategoria(movimiento.Id_Categoria_Pro || "");
            setProducto(movimiento.Id_Producto_MoI || "");
            setAlmacenOrigen(movimiento.Id_AlmacenOrigen_MoI || "");
            setAlmacenDestino(movimiento.Id_AlmacenDestino_MoI || "");
            setMetodoValoracion(movimiento.Id_MetodoValoracion_MoI || "");
            setCantidad(movimiento.Cantidad_MoI || "");
            setFechaMovimiento(movimiento.FechaMovimiento_MoI ? movimiento.FechaMovimiento_MoI.split("T")[0] : "");
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
            Id_AlmacenOrigen_MoI: almacenOrigen || null,
            Id_AlmacenDestino_MoI: almacenDestino || null,
            Cantidad_MoI: cantidad,
            FechaMovimiento_MoI: movimiento ? fechaMovimiento : undefined,
            Estado_MoI: "AC",
        };

        console.log("🚀 Datos enviados al backend:", data);
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
