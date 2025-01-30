import { useState, useEffect } from "react";

export default function DependenciaForm({ dependencia, areas, onSubmit, onClose }) {
  const [error, setError] = useState(""); // Estado para manejar el mensaje de error
  const [formData, setFormData] = useState({
    Id_Area_Padre_Dep: "",
    Id_Area_Hijo_Dep: "",
    Fecha_Asignacion_Dep: "",
    Resolucion_Are_Dep: "",
    Estado_Dep: "Activo",
  });

  useEffect(() => {
    if (dependencia) {
      setFormData({
        Id_Area_Padre_Dep: dependencia?.Id_Area_Padre_Dep || "",
        Id_Area_Hijo_Dep: dependencia?.Id_Area_Hijo_Dep || "",
        Fecha_Asignacion_Dep: dependencia?.Fecha_Asignacion_Dep?.split("T")[0] || "",
        Resolucion_Are_Dep: dependencia?.Resolucion_Are_Dep || "",
        Estado_Dep: dependencia?.Estado_Dep || "Activo",
      });
    } else {
      setFormData({
        Id_Area_Padre_Dep: "",
        Id_Area_Hijo_Dep: "",
        Fecha_Asignacion_Dep: "",
        Resolucion_Are_Dep: "",
        Estado_Dep: "Activo",
      });
    }
  }, [dependencia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name.includes("Id_Area") ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.Id_Area_Padre_Dep === formData.Id_Area_Hijo_Dep) {
      setError("El área padre y el área hija no pueden ser la misma.");
      return;
    }

    setError(""); // Limpia el error si todo está bien
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500 text-white p-2 rounded">
          {error}
        </div>
      )}

      {/* Campo para seleccionar el área padre */}
      <div>
        <label className="block text-sm font-medium mb-1">Área Padre</label>
        <select
          name="Id_Area_Padre_Dep"
          value={formData.Id_Area_Padre_Dep}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione un área padre
          </option>
          {areas.map((area) => (
            <option key={area.Id_Area} value={area.Id_Area}>
              {area.Nombre_Are}
            </option>
          ))}
        </select>
      </div>

      {/* Campo para seleccionar el área hija */}
      <div>
        <label className="block text-sm font-medium mb-1">Área Hija</label>
        <select
          name="Id_Area_Hijo_Dep"
          value={formData.Id_Area_Hijo_Dep}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione un área hija
          </option>
          {areas.map((area) => (
            <option key={area.Id_Area} value={area.Id_Area}>
              {area.Nombre_Are}
            </option>
          ))}
        </select>
      </div>

      {/* Campo para la fecha de asignación */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Asignación</label>
        <input
          type="date"
          name="Fecha_Asignacion_Dep"
          value={formData.Fecha_Asignacion_Dep}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      {/* Campo para la resolución */}
      <div>
        <label className="block text-sm font-medium mb-1">Resolución</label>
        <input
          type="text"
          name="Resolucion_Are_Dep"
          value={formData.Resolucion_Are_Dep}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      {/* Campo para el estado 
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="Estado_Dep"
          value={formData.Estado_Dep}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
*/}
      {/* Botones para cancelar o guardar */}
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
          {dependencia ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
