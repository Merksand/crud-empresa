import { useState, useEffect } from "react";

export default function IndustriaForm({ industria, onSubmit, onClose }) {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");

  // Cargar datos de la industria al editar
  useEffect(() => {
    if (industria) {
      setNombre(industria.Nombre_Ind);
      setEstado(industria.Estado_Pai);
    }
  }, [industria]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!nombre.trim()) {
      alert("El nombre de la industria es obligatorio.");
      return;
    }

    // Crear el objeto de datos a enviar
    const data = {
      Nombre_Ind: nombre,
      Estado_Pai: estado,
    };

    // Llamar a la función onSubmit (proveniente del componente padre)
    onSubmit(data);
  };

  console.log(industria)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo: Nombre de la industria */}
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          placeholder="Ingrese el nombre de la industria"
          required
        />
      </div>

      {/* Campo: Estado de la industria */}
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Botones de acción */}
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
          {industria ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}