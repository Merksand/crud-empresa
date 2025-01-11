import { useState } from "react";

export default function EmpleadoCargoForm({ relacion, empleados, cargos, relaciones, onSubmit, onClose }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      Id_Empleado_EC: parseInt(formData.get("empleado")),
      Id_Cargo_EC: parseInt(formData.get("cargo")),
      Fecha_Inicio_EC: formData.get("fechaInicio"),
      Fecha_Fin_EC: formData.get("fechaFin") || null,
      Estado_EC: formData.get("estado"),
    };

    const existeRelacion = relaciones.some(
      (rel) =>
        rel.Id_Empleado_EC === data.Id_Empleado_EC &&
        rel.Id_Cargo_EC === data.Id_Cargo_EC
    );

    if (existeRelacion) {
      setErrorMessage("Ya existe una relación para el empleado y cargo seleccionados.");
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

      {!relacion && (
        <div>
          <label className="block text-sm font-medium mb-1">Empleado</label>
          <select
            name="empleado"
            defaultValue={relacion?.Id_Empleado_EC || ""}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
            required
          >
            <option value="" disabled>
              Seleccione un empleado
            </option>
            {empleados?.map((empleado) => (
              <option key={empleado.Id_Empleado} value={empleado.Id_Empleado}>
                {empleado.Nombre_Empleado}
              </option>
            ))}
          </select>
        </div>
      )}

      {!relacion && (
        <div>
          <label className="block text-sm font-medium mb-1">Cargo</label>
          <select
            name="cargo"
            defaultValue={relacion?.Id_Cargo_EC || ""}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
            required
          >
            <option value="" disabled>
              Seleccione un cargo
            </option>
            {cargos?.map((cargo) => (
              <option key={cargo.Id_Cargo} value={cargo.Id_Cargo}>
                {cargo.Nombre_Cargo}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
        <input
          type="date"
          name="fechaInicio"
          defaultValue={relacion?.Fecha_Inicio_EC?.split("T")[0]}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
        <input
          type="date"
          name="fechaFin"
          defaultValue={relacion?.Fecha_Fin_EC?.split("T")[0]}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          defaultValue={relacion?.Estado_EC || "Activo"}
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
