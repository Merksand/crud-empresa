"use client";

import { useState, useEffect } from "react";

export default function AlmacenForm({ almacen = {}, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    Id_Sucursal_Alm: "",
    Nombre_Alm: "",
    Ubicacion_Alm: "",
    Capacidad_maxima_Alm: "",
  });

  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    if (almacen) {
      setFormData(almacen);
    }
  }, [almacen]);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch("/api/sucursales");
        const data = await response.json();
        setSucursales(data);
      } catch (error) {
        console.error("Error al obtener las sucursales", error);
      }
    };

    fetchSucursales();
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
      <div>
        <label className="block mb-1">Sucursal:</label>
        <select
          name="Id_Sucursal_Alm"
          value={formData.Id_Sucursal_Alm}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        >
          <option value="">Seleccione una sucursal</option>
          {sucursales.map((sucursal) => (
            <option key={sucursal.Id_Sucursal} value={sucursal.Id_Sucursal}>
              {sucursal.Nombre_Suc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Nombre del Almacén:</label>
        <input
          type="text"
          name="Nombre_Alm"
          value={formData.Nombre_Alm}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block mb-1">Ubicación:</label>
        <input
          type="text"
          name="Ubicacion_Alm"
          value={formData.Ubicacion_Alm}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block mb-1">Capacidad Máxima:</label>
        <input
          type="number"
          name="Capacidad_maxima_Alm"
          value={formData.Capacidad_maxima_Alm}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

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
