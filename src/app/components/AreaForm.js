export default function AreaForm({ area, onSubmit, onClose }) {
  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
          Nombre_Are: formData.get("nombre"),
          Resolucion_Are: formData.get("resolucion"),
          Fecha_Creacion_Are: formData.get("fechaCreacion"),
          Estado_Are: formData.get("estado"),
      };
      onSubmit(data);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                  type="text"
                  name="nombre"
                  defaultValue={area?.Nombre_Are}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  required
              />
          </div>

          <div>
              <label className="block text-sm font-medium mb-1">Resolución</label>
              <input
                  type="text"
                  name="resolucion"
                  defaultValue={area?.Resolucion_Are}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  required
              />
          </div>

          <div>
              <label className="block text-sm font-medium mb-1">Fecha de Creación</label>
              <input
                  type="date"
                  name="fechaCreacion"
                  defaultValue={area?.Fecha_Creacion_Are?.split("T")[0]}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  required
              />
          </div>

          <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                  name="estado"
                  defaultValue={area?.Estado_Are || 'Activo'}
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
                  {area ? "Actualizar" : "Crear"}
              </button>
          </div>
      </form>
  );
}
  