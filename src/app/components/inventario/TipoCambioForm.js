"use client";

import { useState, useEffect } from "react";

export default function TipoCambioForm({ tipoCambio = {}, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    Id_Moneda_TiC: "",
    Fecha_TiC: "",
    TasaCambio_TiC: "",
  });

  const [monedas, setMonedas] = useState([]);

  useEffect(() => {
    if (tipoCambio) {
      // ✅ Formatea la fecha para que se muestre correctamente en el input date
      const formattedDate = tipoCambio.Fecha_TiC
        ? new Date(tipoCambio.Fecha_TiC).toISOString().split("T")[0]
        : "";

      setFormData({
        ...tipoCambio,
        Fecha_TiC: formattedDate, // Asigna la fecha formateada
      });
    }
  }, [tipoCambio]);

  useEffect(() => {
    const fetchMonedas = async () => {
      try {
        const response = await fetch("/api/inventario/moneda");
        const data = await response.json();
        setMonedas(data);
      } catch (error) {
        console.error("Error al obtener las monedas", error);
      }
    };

    fetchMonedas();
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
      {/* Seleccionar Moneda */}
      <div>
        <label className="block mb-1">Moneda:</label>
        <select
          name="Id_Moneda_TiC"
          value={formData.Id_Moneda_TiC}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        >
          <option value="">Seleccione una moneda</option>
          {monedas.map((moneda) => (
            <option key={moneda.Id_Moneda} value={moneda.Id_Moneda}>
              {moneda.Nombre_Mon} ({moneda.Codigo_Mon})
            </option>
          ))}
        </select>
      </div>

      {/* Fecha del Tipo de Cambio */}
      <div>
        <label className="block mb-1">Fecha:</label>
        <input
          type="date"
          name="Fecha_TiC"
          value={formData.Fecha_TiC}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      {/* Tasa de Cambio */}
      <div>
        <label className="block mb-1">Tasa de Cambio:</label>
        <input
          type="number"
          name="TasaCambio_TiC"
          value={formData.TasaCambio_TiC}
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
  