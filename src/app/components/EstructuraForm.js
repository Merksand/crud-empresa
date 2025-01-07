import { useState, useEffect } from "react";

export default function EstructuraForm({ estructura, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    Id_Empresa: "",
    Fecha_Creacion_Est: "",
    Resolucion_Est: "",
    Estado_Est: "Activo",
  });

  const [empresas, setEmpresas] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const response = await fetch("/api/empresas");  
        if (!response.ok) throw new Error("Error al cargar empresas");
        const data = await response.json();
        setEmpresas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmpresas();
  }, []);

  useEffect(() => {
    if (estructura) {
      setFormData({
        Id_Empresa: estructura?.Id_Empresa || "",  
        Fecha_Creacion_Est: estructura?.Fecha_Creacion_Est?.split("T")[0] || "",
        Resolucion_Est: estructura?.Resolucion_Est || "",
        Estado_Est: estructura?.Estado_Est || "Activo",
      });
    } else {
      setFormData({
        Id_Empresa: "",
        Fecha_Creacion_Est: "",
        Resolucion_Est: "",
        Estado_Est: "Activo",
      });
    }
  }, [estructura]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) {
    return <p>Cargando empresas...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Empresa</label>
        <select
          name="Id_Empresa"
          value={formData.Id_Empresa}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="">Seleccione una empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.Id_Empresa} value={empresa.Id_Empresa}>
              {empresa.Nombre_Emp}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Fecha de Creación
        </label>
        <input
          type="date"
          name="Fecha_Creacion_Est"
          value={formData.Fecha_Creacion_Est || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resolución</label>
        <input
          type="text"
          name="Resolucion_Est"
          value={formData.Resolucion_Est || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="Estado_Est"
          value={formData.Estado_Est || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

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
          {estructura ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
