import { useState, useEffect } from 'react';

export default function EstructuraForm({ estructura, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaCreacion: '',
    resolucion: '',
    estado: 'Activo',
  });

  // Si hay una estructura, inicializamos el formulario con los valores actuales
  useEffect(() => {
    if (estructura) {
      setFormData({
        nombre: estructura?.nombre_are || '',
        fechaCreacion: estructura?.fecha_creacion_are?.split('T')[0] || '',
        resolucion: estructura?.resolucion_are || '',
        estado: estructura?.estado_are || 'Activo',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Creación</label>
        <input
          type="date"
          name="fechaCreacion"
          value={formData.fechaCreacion}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resolución</label>
        <input
          type="text"
          name="resolucion"
          value={formData.resolucion}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          value={formData.estado}
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
          {estructura ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
