import React, { useState, useEffect } from 'react';

export default function InformacionEmpresaForm({ informacion, empresas, onSubmit, onClose }) {
  const [logoUrl, setLogoUrl] = useState(informacion?.Logo_IE || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLogoUrl(informacion?.Logo_IE || '');
  }, [informacion]);

  const handleLogoChange = (e) => {
    const url = e.target.value;
    setLogoUrl(url);
    setIsLoading(!!url); // Inicia el loading solo si hay URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      Id_Empresa: parseInt(formData.get('empresa')),
      Logo_IE: logoUrl,
      Regimen_Impositivo_IE: formData.get('regimen'),
      Zona_Horaria_IE: formData.get('zonaHoraria'),
      Estado_IE: formData.get('estado'),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Empresa</label>
        <select
          name="empresa"
          defaultValue={informacion?.Id_Empresa || ''}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>Seleccione una empresa</option>
          {empresas?.map((empresa) => (
            <option key={empresa.Id_Empresa} value={empresa.Id_Empresa}>
              {empresa.Nombre_Emp}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Logo</label>
        <input
          type="text"
          name="logo"
          value={logoUrl}
          onChange={handleLogoChange}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="URL o ruta del logo"
        />
        {logoUrl && (
          <div className="mt-2 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={logoUrl}
              alt="Logo preview"
              className="max-w-[200px] h-auto rounded-lg border dark:border-gray-600"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.png'; // Imagen de respaldo
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Régimen Impositivo</label>
        <input
          type="text"
          name="regimen"
          defaultValue={informacion?.Regimen_Impositivo_IE}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="Ej: IVA General"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Zona Horaria</label>
        <input
          type="text"
          name="zonaHoraria"
          defaultValue={informacion?.Zona_Horaria_IE}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
          placeholder="Ej: UTC-5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          defaultValue={informacion?.Estado_IE || 'Activo'}
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
          {informacion ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
