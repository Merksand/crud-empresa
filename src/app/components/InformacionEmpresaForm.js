import React, { useState, useEffect } from 'react';

export default function InformacionEmpresaForm({ informacion, empresas, onSubmit, onClose }) {
  const [logoUrl, setLogoUrl] = useState(informacion?.Logo_IE || '');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageValid, setIsImageValid] = useState(!!informacion?.Logo_IE);

  useEffect(() => {
    setLogoUrl(informacion?.Logo_IE || '');
    setImageError(false);
    setIsImageValid(!!informacion?.Logo_IE);
  }, [informacion]);

  const handleLogoChange = (e) => {
    const url = e.target.value;
    setLogoUrl(url);
    setIsLoading(!!url);
    setImageError(false);
    setIsImageValid(false);

    if (url) {
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
        setIsImageValid(true);
      };
      img.onerror = () => {
        setIsLoading(false);
        setImageError(true);
        setIsImageValid(false);
      };
      img.src = url;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isImageValid) {
      setImageError(true);
      return;
    }
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
          className={`w-full p-2 border rounded-lg dark:bg-gray-700 ${
            imageError ? 'border-red-500' : ''
          }`}
          required
          placeholder="URL o ruta del logo"
        />
        {imageError && (
          <p className="text-red-500 text-sm mt-1">
            La URL proporcionada no es una imagen válida
          </p>
        )}
        {logoUrl && !imageError && (
          <div className="mt-2 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={logoUrl}
              alt="Logo preview"
              className="max-h-32 rounded-lg"
              onError={() => setImageError(true)}
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
          disabled={!isImageValid || imageError}
          className={`px-4 py-2 rounded-lg ${
            !isImageValid || imageError
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {informacion ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
