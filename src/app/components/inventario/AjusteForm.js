"use client";

import { useState, useEffect } from "react";

export default function AjusteForm({ ajuste = {}, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    Id_Movimiento_Aju: "",
    Motivo_Aju: "",
    FechaAju: "",
  });

  const [movimientos, setMovimientos] = useState([]);

  // Cargar datos en modo edición
  useEffect(() => {
    if (ajuste) {
      const formattedDate = ajuste.FechaAju
        ? new Date(ajuste.FechaAju).toISOString().split("T")[0]
        : "";
      setFormData({ ...ajuste, FechaAju: formattedDate });
    }
  }, [ajuste]);

  // Obtener movimientos de inventario
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
          name="Id_Movimiento_Aju"
          value={formData.Id_Movimiento_Aju}
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

      {/* Motivo del Ajuste */}
      <div>
        <label className="block mb-1">Motivo del Ajuste:</label>
        <textarea
          name="Motivo_Aju"
          value={formData.Motivo_Aju}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      {/* Fecha del Ajuste */}
      <div>
        <label className="block mb-1">Fecha del Ajuste:</label>
        <input
          type="date"
          name="FechaAju"
          value={formData.FechaAju}
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
