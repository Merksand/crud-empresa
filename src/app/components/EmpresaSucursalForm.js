import { useState } from "react";

export default function EmpresaSucursalForm({ relacion, empresas, sucursales, relaciones, onSubmit, onClose }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      Id_Empresa_ES: parseInt(formData.get("empresa")),
      Id_Sucursal_ES: parseInt(formData.get("sucursal")),
      Fecha_Apertura_ES: formData.get("fechaApertura"),
      Fecha_Cierre_ES: formData.get("fechaCierre") || null,
      Estado_ES: formData.get("estado"),
    };

    // Validar que empresa y sucursal no sean iguales
    // if (data.Id_Empresa_ES === data.Id_Sucursal_ES) {
    //   setErrorMessage("La empresa y la sucursal seleccionadas no pueden ser iguales.");
    //   return;
    // }

    const existeRelacion = relaciones.some(
      (relacion) =>
        relacion.Id_Empresa_ES === data.Id_Empresa_ES &&
        relacion.Id_Sucursal_ES === data.Id_Sucursal_ES
    );

    if (existeRelacion) {
      setErrorMessage("No puedes seleccionar la misma empresa y sucursal. Verifica tu selección.");
      return;
    }

    setErrorMessage("");
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {!relacion && <div>
        <label className="block text-sm font-medium mb-1">Empresa</label>
        <select
          name="empresa"
          defaultValue={relacion?.Id_Empresa_ES || ""}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione una empresa
          </option>
          {empresas?.map((empresa) => (
            <option key={empresa.Id_Empresa} value={empresa.Id_Empresa}>
              {empresa.Nombre_Emp}
            </option>
          ))}
        </select>
      </div>}

      {!relacion && <div>
        <label className="block text-sm font-medium mb-1">Sucursal</label>
        <select
          name="sucursal"
          defaultValue={relacion?.Id_Sucursal_ES || ""}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        >
          <option value="" disabled>
            Seleccione una sucursal
          </option>
          {sucursales?.map((sucursal) => (
            <option key={sucursal.Id_Sucursal} value={sucursal.Id_Sucursal}>
              {sucursal.Nombre_Suc}
            </option>
          ))}
        </select>
      </div>}

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

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Cierre</label>
        <input
          type="date"
          name="fechaCierre"
          defaultValue={relacion?.Fecha_Cierre_ES?.split("T")[0]}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          defaultValue={relacion?.Estado_ES || "Activo"}
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
          {relacion ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
