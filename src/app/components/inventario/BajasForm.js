import { useState, useEffect } from "react";

export default function BajasForm({ baja, onSubmit, onClose }) {
    const [movimientos, setMovimientos] = useState([]);
    const [movimiento, setMovimiento] = useState("");
    const [motivo, setMotivo] = useState("");
    const [autorizacion, setAutorizacion] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        fetch("/api/inventario/movimientoInventario")
            .then((res) => res.json())
            .then((data) => setMovimientos(data));
    }, []);

    useEffect(() => {
        if (baja) {
            setMovimiento(baja.Id_Movimiento_Baj || "");
            setMotivo(baja.Motivo_Baj || "");
            setAutorizacion(baja.Autorizacion_Baj || "");
            setFecha(baja.Fecha_Baj ? baja.Fecha_Baj.split("T")[0] : "");
        }
    }, [baja]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!movimiento || !motivo || !autorizacion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const data = {
            Id_Movimiento_Baj: movimiento,
            Motivo_Baj: motivo,
            Autorizacion_Baj: autorizacion,
            Fecha_Baj: baja ? fecha : undefined // Solo enviar fecha en edición
        };

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Movimiento de Inventario</label>
                <select
                    value={movimiento}
                    onChange={(e) => setMovimiento(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un movimiento</option>
                    {movimientos.map((mov) => (
                        <option key={mov.Id_MovimientoInventario} value={mov.Id_MovimientoInventario}>
                            {`ID: ${mov.Id_MovimientoInventario} - Producto: ${mov.Nombre_Producto}`}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Motivo</label>
                <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Autorización</label>
                <input
                    type="text"
                    value={autorizacion}
                    onChange={(e) => setAutorizacion(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            {baja && (
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Baja</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        disabled
                    />
                </div>
            )}

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
                    {baja ? "Actualizar" : "Registrar Baja"}
                </button>
            </div>
        </form>
    );
}
