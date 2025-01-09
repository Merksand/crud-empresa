"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DependenciaForm from "@/app/components/DependenciaForm";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function Dependencia() {
  const [dependencias, setDependencias] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dependenciaEditar, setDependenciaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, dependencia: null });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Llamadas paralelas a las APIs
      const [dependenciasRes, areasRes] = await Promise.all([
        fetch("/api/dependencia"),
        fetch("/api/area"),
      ]);

      if (!dependenciasRes.ok || !areasRes.ok) {
        throw new Error("Error al obtener los datos de dependencias y áreas");
      }

      const dependenciasData = await dependenciasRes.json();
      const areasData = await areasRes.json();

      // Combinar dependencias con áreas para mostrar nombres
      const processedData = dependenciasData.map((dep) => {
        const areaPadre = areasData.find((area) => area.Id_Area === dep.Id_Area_Padre_Dep);
        const areaHijo = areasData.find((area) => area.Id_Area === dep.Id_Area_Hijo_Dep);

        return {
          ...dep,
          Nombre_Padre: areaPadre?.Nombre_Are || "No encontrada",
          Nombre_Hijo: areaHijo?.Nombre_Are || "No encontrada",
        };
      });

      setDependencias(processedData);
      setAreas(areasData);
    } catch (error) {
      console.error("Error al cargar dependencias y áreas:", error);
      showNotification("Error al cargar dependencias y áreas", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dependencia) => {
    setDeleteModal({ show: true, dependencia });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/dependencia/${deleteModal.dependencia.Id_Dependencia}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar la dependencia");
      } 

      showNotification("Dependencia eliminada correctamente");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Error al eliminar la dependencia", "error");
    } finally {
      setDeleteModal({ show: false, dependencia: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Dependencias</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          Nueva Dependencia
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Área Padre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Área Hija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Asignación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolución
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : dependencias.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay dependencias registradas
                  </td>
                </tr>
              ) : (
                dependencias.map((dep) => (
                  <tr key={dep.Id_Dependencia} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{dep.Nombre_Padre}</td>
                    <td className="px-6 py-4">{dep.Nombre_Hijo}</td>
                    <td className="px-6 py-4">
                      {dep.Fecha_Asignacion_Dep
                        ? new Date(dep.Fecha_Asignacion_Dep).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4">{dep.Resolucion_Are_Dep}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          dep.Estado_Dep === "Activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dep.Estado_Dep}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setDependenciaEditar(dep);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(dep)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, dependencia: null })}
        onConfirm={confirmDelete}
        itemName={`la dependencia ${deleteModal.dependencia?.Id_Dependencia || "desconocida"}`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDependenciaEditar(null);
        }}
        title={dependenciaEditar ? "Editar Dependencia" : "Nueva Dependencia"}
      >
        <DependenciaForm
          dependencia={dependenciaEditar}
          areas={areas} // Pasa las áreas como prop
          onSubmit={async (data) => {
            try {
              let response;
              if (dependenciaEditar) {
                response = await fetch(`/api/dependencia/${dependenciaEditar.Id_Dependencia}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
              } else {
                response = await fetch("/api/dependencia", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
              }

              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(responseData.error || "Error al guardar la dependencia");
              }

              showNotification(
                dependenciaEditar
                  ? "Dependencia actualizada correctamente"
                  : "Dependencia creada correctamente"
              );
              setIsModalOpen(false);
              setDependenciaEditar(null);
              fetchData();
            } catch (error) {
              console.error("Error:", error);
              showNotification(error.message || "Error al guardar la dependencia", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setDependenciaEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
