"use client";

import { useState, useEffect } from "react";

export default function DevolucionForm({ devolucion = {}, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    Id_Movimiento_Dev: "",
    Motivo_Dev: "",
    Autorizacion_Dev: "",
    Fecha_Dev: "",
  });

  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    if (devolucion) {
      const formattedDate = devolucion.Fecha_Dev
        ? new Date(devolucion.Fecha_Dev).toISOString().split("T")[0]
        : "";
      setFormData({ ...devolucion, Fecha_Dev: formattedDate });
    }
  }, [devolucion]);

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const response = await fetch("/api/inventario/movimientoInventario");
        const data = await response.json();
        setMovimientos(data);
      } catch (error) {
        console.error("Error al obtener los movimientos de inventario", error);
      }
    };

    fetchMovimientos();
  }, []);

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
      {/* Seleccionar Movimiento de Inventario */}
      <div>
        <label className="block mb-1">Movimiento de Inventario:</label>
        <select
          name="Id_Movimiento_Dev"
          value={formData.Id_Movimiento_Dev}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        >
          <option value="">Seleccione un movimiento</option>
          {movimientos.map((movimiento) => (
            <option key={movimiento.Id_MovimientoInventario} value={movimiento.Id_MovimientoInventario}>
              {movimiento.Nombre_Producto}
            </option>
          ))}
        </select>
      </div>

      {/* Motivo de la Devolución */}
      <div>
        <label className="block mb-1">Motivo de la Devolución:</label>
        <textarea
          name="Motivo_Dev"
          value={formData.Motivo_Dev}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      {/* Autorización de la Devolución */}
      <div>
        <label className="block mb-1">Autorización:</label>
        <input
          type="text"
          name="Autorizacion_Dev"
          value={formData.Autorizacion_Dev}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      {/* Fecha de la Devolución */}
      <div>
        <label className="block mb-1">Fecha de la Devolución:</label>
        <input
          type="date"
          name="Fecha_Dev"
          value={formData.Fecha_Dev}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
