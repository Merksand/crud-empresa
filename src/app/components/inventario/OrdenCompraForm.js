import { useState, useEffect } from "react";

export default function OrdenCompraForm({ ordenCompra, onSubmit, onClose }) {
    const [sucursales, setSucursales] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [monedas, setMonedas] = useState([]);
    const [formData, setFormData] = useState({
        Id_Sucursal_OdC: "",
        Id_Proveedor_OdC: "",
        Id_Moneda_Odc: "",
        FechaOrden_OdC: "",
        Monto_OdC: "",
        Impuestos_OdC: "",
        Descuento_OdC: "",
        Sub_Total_OdC: "",
        TotalPagado_OdC: "",
    });

    // Cargar listas de sucursales, proveedores y monedas al iniciar
    useEffect(() => {
        fetch("/api/inventario/sucursal")
            .then((res) => res.json())
            .then((data) => setSucursales(data))
            .catch((err) => console.error("Error al cargar sucursales", err));

        fetch("/api/inventario/proveedor")
            .then((res) => res.json())
            .then((data) => setProveedores(data))
            .catch((err) => console.error("Error al cargar proveedores", err));

        fetch("/api/inventario/moneda")
            .then((res) => res.json())
            .then((data) => setMonedas(data))
            .catch((err) => console.error("Error al cargar monedas", err));
    }, []);

    // Cargar datos si está en modo edición
    useEffect(() => {
        if (ordenCompra) {
            setFormData({
                Id_Sucursal_OdC: ordenCompra.Id_Sucursal_OdC || "",
                Id_Proveedor_OdC: ordenCompra.Id_Proveedor_OdC || "",
                Id_Moneda_Odc: ordenCompra.Id_Moneda_Odc || "",
                FechaOrden_OdC: ordenCompra.FechaOrden_OdC ? new Date(ordenCompra.FechaOrden_OdC).toISOString().split("T")[0] : "",
                Monto_OdC: ordenCompra.Monto_OdC || "",
                Impuestos_OdC: ordenCompra.Impuestos_OdC || "",
                Descuento_OdC: ordenCompra.Descuento_OdC || "",
                Sub_Total_OdC: ordenCompra.Sub_Total_OdC || "",
                TotalPagado_OdC: ordenCompra.TotalPagado_OdC || "",
            });
        }
    }, [ordenCompra]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para seleccionar la sucursal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Sucursal</label>
                    <select
                        name="Id_Sucursal_OdC"
                        value={formData.Id_Sucursal_OdC}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    >
                        <option value="">Seleccione una sucursal</option>
                        {sucursales.map((s) => (
                            <option key={s.Id_Sucursal} value={s.Id_Sucursal}>
                                {s.Nombre_Suc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo para seleccionar el proveedor */}
                <div>
                    <label className="block text-sm font-medium mb-1">Proveedor</label>
                    <select
                        name="Id_Proveedor_OdC"
                        value={formData.Id_Proveedor_OdC}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((p) => (
                            <option key={p.Id_Proveedor} value={p.Id_Proveedor}>
                                {p.Nombre_Prov}
                            </option>
                        ))}
                    </select>
                </div>
            </div
            >
            {/* Campo para seleccionar la moneda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Moneda</label>
                    <select
                        name="Id_Moneda_Odc"
                        value={formData.Id_Moneda_Odc}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    >
                        <option value="">Seleccione una moneda</option>
                        {monedas.map((m) => (
                            <option key={m.Id_Moneda} value={m.Id_Moneda}>
                                {m.Nombre_Mon}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo para la fecha de la orden */}
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de la Orden</label>
                    <input
                        type="date"
                        name="FechaOrden_OdC"
                        value={formData.FechaOrden_OdC}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Campo para el monto */}
                <div>
                    <label className="block text-sm font-medium mb-1">Monto</label>
                    <input
                        type="number"
                        name="Monto_OdC"
                        value={formData.Monto_OdC}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    />
                </div>

                {/* Campo para los impuestos */}
                <div>
                    <label className="block text-sm font-medium mb-1">Impuestos</label>
                    <input
                        type="number"
                        name="Impuestos_OdC"
                        value={formData.Impuestos_OdC}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        required
                    />
                </div>
            </div>
            {/* Campo para el descuento */}
            <div>
                <label className="block text-sm font-medium mb-1">Descuento</label>
                <input
                    type="number"
                    name="Descuento_OdC"
                    value={formData.Descuento_OdC}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para el subtotal */}
            <div>
                <label className="block text-sm font-medium mb-1">Sub Total</label>
                <input
                    type="number"
                    name="Sub_Total_OdC"
                    value={formData.Sub_Total_OdC}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {/* Campo para el total pagado */}
            <div>
                <label className="block text-sm font-medium mb-1">Total Pagado</label>
                <input
                    type="number"
                    name="TotalPagado_OdC"
                    value={formData.TotalPagado_OdC}
                    onChange={handleChange}
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
                    {ordenCompra ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
}
