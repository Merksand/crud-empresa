import { useState, useEffect } from "react";

export default function EmpresaSucursalForm({ relacion, empresas, sucursales, relaciones, onSubmit, onClose }) {
  const [municipios, setMunicipios] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(relacion?.Id_Sucursal_ES || "");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");

  useEffect(() => {
    if (selectedSucursal) {
      // Cargar municipios relacionados con la sucursal seleccionada
      fetch(`/api/municipio?sucursal=${selectedSucursal}`)
        .then((res) => res.json())
        .then((data) => setMunicipios(data))
        .catch((err) => console.error("Error al cargar municipios:", err));
    } else {
      setMunicipios([]);
    }
  }, [selectedSucursal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      Id_Empresa_ES: parseInt(formData.get("empresa")),
      Id_Sucursal_ES: parseInt(formData.get("sucursal")),
      Id_Municipio_ES: parseInt(selectedMunicipio), // Municipio seleccionado
      Fecha_Apertura_ES: formData.get("fechaApertura"),
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Empresa</label>
        <select
          name="empresa"
          defaultValue={relacion?.Id_Empresa_ES || ""}
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
        <label className="block text-sm font-medium mb-1">Sucursal</label>
        <select
          name="sucursal"
          value={selectedSucursal}
          onChange={(e) => setSelectedSucursal(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>Seleccione una sucursal</option>
          {sucursales?.map((sucursal) => (
            <option key={sucursal.Id_Sucursal} value={sucursal.Id_Sucursal}>
              {sucursal.Nombre_Suc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Municipio</label>
        <select
          name="municipio"
          value={selectedMunicipio}
          onChange={(e) => setSelectedMunicipio(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>Seleccione un municipio</option>
          {municipios.map((municipio) => (
            <option key={municipio.Id_Municipio} value={municipio.Id_Municipio}>
              {municipio.Nombre_Mun}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Apertura</label>
        <input
          type="date"
          name="fechaApertura"
          defaultValue={relacion?.Fecha_Apertura_ES?.split("T")[0]}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
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
          {relacion ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
