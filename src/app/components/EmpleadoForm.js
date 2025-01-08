import React, { useState, useEffect } from 'react';

export default function EmpleadoForm({ empleado, municipios, onSubmit, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      Id_Municipio_Emp: parseInt(formData.get('municipio')),
      CI_Emp: formData.get('ci'),
      Nombre_Emp: formData.get('nombre'),
      Paterno_Emp: formData.get('paterno'),
      Materno_Emp: formData.get('materno'),
      Sexo_Emp: formData.get('sexo'),
      Direccion_Emp: formData.get('direccion'),
      Estado_Civil_Emp: formData.get('estadoCivil'),
      FDN_Emp: formData.get('fdn'),
      Estado_Emp: formData.get('estado'),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Municipio</label>
        <select
          name="municipio"
          defaultValue={empleado?.Id_Municipio_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione un municipio
          </option>
          {municipios?.map((municipio) => (
            <option key={municipio.Id_Municipio} value={municipio.Id_Municipio}>
              {municipio.Nombre_Mun}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CI</label>
        <input
          type="text"
          name="ci"
          defaultValue={empleado?.CI_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="Ingrese el CI"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          defaultValue={empleado?.Nombre_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="Ingrese el nombre"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Apellido Paterno</label>
        <input
          type="text"
          name="paterno"
          defaultValue={empleado?.Paterno_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="Ingrese el apellido paterno"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Apellido Materno</label>
        <input
          type="text"
          name="materno"
          defaultValue={empleado?.Materno_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          placeholder="Ingrese el apellido materno"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sexo</label>
        <select
          name="sexo"
          defaultValue={empleado?.Sexo_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione el sexo
          </option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          defaultValue={empleado?.Direccion_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          placeholder="Ingrese la dirección"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado Civil</label>
        <select
          name="estadoCivil"
          defaultValue={empleado?.Estado_Civil_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione el estado civil
          </option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
        <input
          type="date"
          name="fdn"
          defaultValue={empleado?.FDN_Emp || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          defaultValue={empleado?.Estado_Emp || 'Activo'}
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
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          {empleado ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
