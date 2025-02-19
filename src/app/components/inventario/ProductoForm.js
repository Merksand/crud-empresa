import React, { useState, useEffect } from 'react';

export default function ProductoForm({ producto, categorias, marcas, industrias, onSubmit, onClose }) {
  const [fotoUrl, setFotoUrl] = useState(producto?.Foto_Pro || '');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageValid, setIsImageValid] = useState(!!producto?.Foto_Pro);
  useEffect(() => {
    setFotoUrl(producto?.Foto_Pro || '');
    setImageError(false);
    setIsImageValid(!!producto?.Foto_Pro);
  }, [producto]);

  const handleFotoChange = (e) => {
    const url = e.target.value;
    setFotoUrl(url);
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
      Id_Categoria_Pro: parseInt(formData.get('categoria')),
      Id_Marca_Pro: parseInt(formData.get('marca')),
      Id_Industria_Pro: parseInt(formData.get('industria')),
      Nombre_Pro: formData.get('nombre'),
      Modelo_Pro: formData.get('modelo'),
      Descripcion_Pro: formData.get('descripcion'),
      Unidad_medida_Pro: formData.get('unidad_medida'),
      Stock_minimo_Pro: parseInt(formData.get('stock_minimo')) || 0,
      Stock_maximo_Pro: parseInt(formData.get('stock_maximo')) || 0,
      Foto_Pro: fotoUrl,
      Atributo_Personalizados_Pro: formData.get('atributos'),
      Estado_Pro: formData.get('estado'),
    };
    onSubmit(data);
  };
  return (
    <div className="p-4 mx-auto max-w-[900px] bg-white dark:bg-gray-800 rounded-lg shadow-md">


      <form onSubmit={handleSubmit} className="space-y-3 max-h-screen overflow-y-auto p-1.5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              name="categoria"
              defaultValue={producto?.Id_Categoria_Pro || ''}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias?.map((cat) => (
                <option key={cat.Id_Categoria} value={cat.Id_Categoria}>
                  {cat.Nombre_Cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <select
              name="marca"
              defaultValue={producto?.Id_marca_Pro || ''}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
            >
              <option value="" disabled>Seleccione una marca</option>
              {marcas?.map((marca) => {

                return (

                  <option key={marca.Id_Marca} value={marca.Id_Marca}>
                    {marca.Nombre_Mar}
                  </option>
                )
              })}
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Industria</label>
            <select
              name="industria"
              defaultValue={producto?.Id_Industria_Pro || ''}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
            >
              <option value="" disabled>Seleccione una industria</option>
              {industrias?.map((ind) => (
                <option key={ind.Id_Industria} value={ind.Id_Industria}>
                  {ind.Nombre_Ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              defaultValue={producto?.Nombre_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Ingrese el nombre del producto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              defaultValue={producto?.Modelo_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Ingrese el modelo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              defaultValue={producto?.Descripcion_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Ingrese la descripcion"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Unidad de Medida</label>
            <input
              type="text"
              name="unidad_medida"
              defaultValue={producto?.Unidad_medida_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Ej: Litros, Kilogramos"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock Minimo</label>
            <input
              type="text"
              name="stock_minimo"
              defaultValue={producto?.Stock_minimo_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Stock minimo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div>
            <label className="block text-sm font-medium mb-1">Stock Maximo</label>
            <input
              type="text"
              name="stock_maximo"
              defaultValue={producto?.Stock_maximo_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Stock maximo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Atributo</label>
            <input
              type="text"
              name="atributos"
              defaultValue={producto?.Atributo_Personalizados_Pro}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
              placeholder="Ingrese Atributo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div>
            <label className="block text-sm font-medium mb-1">Foto (URL)</label>
            <input
              type="text"
              name="foto"
              value={fotoUrl}
              onChange={handleFotoChange}
              className={`w-full p-1.5 border rounded-lg dark:bg-gray-700 ${imageError ? 'border-red-500' : ''
                }`}
              required
              placeholder="Ingrese la URL de la imagen"
            />
            {imageError && (
              <p className="text-red-500 text-sm mt-1">
                La URL proporcionada no es una imagen válida
              </p>
            )}
            {fotoUrl && !imageError && (
              <div className="mt-2 relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
                <img
                  src={fotoUrl}
                  alt="Foto preview"
                  className="max-h-32 rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              defaultValue={producto?.Estado_Pro || 'ACTIVO'}
              className="w-full p-1.5 border rounded-lg dark:bg-gray-700"
              required
            >
              <option value="ACTIVO">Activo</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div> */}
        </div>
        <div className="flex justify-end gap-1.5 mt-6">
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
            className={`px-4 py-2 rounded-lg ${!isImageValid || imageError
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
          >
            {producto ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}
