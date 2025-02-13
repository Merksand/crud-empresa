"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import EmpresaForm from "@/app/components/EmpresaForm";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empresaEditar, setEmpresaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, empresa: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Cargar empresas al inicializar
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/empresas");
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
      showNotification("Error al cargar las empresas", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (empresa) => {
    setDeleteModal({ show: true, empresa });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.empresa) {
        throw new Error("No se seleccionó ninguna empresa para eliminar.");
      }

      const response = await fetch(`/api/empresas/${deleteModal.empresa.Id_Empresa}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la empresa");
      }

      showNotification("Empresa eliminada correctamente");
      fetchEmpresas();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, empresa: null });
    }
  };

  return (
    <div className="p-6 ">
      {/* Notificaciones */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
        >
          {notification.message}
        </div>
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empresas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Empresa
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sede
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Municipio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha Fundación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
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
              ) : empresas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay empresas registradas
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => {
                  // console.log(empresa)
                  return (
                    <tr key={empresa.Id_Empresa} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa.Nombre_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa.Pais}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa.Municipio}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(empresa.Fecha_Fundacion_Emp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa.Tipo_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setEmpresaEditar(empresa);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDelete(empresa)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                }

                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, empresa: null })}
        onConfirm={handleDelete}
        itemName={`la empresa "${deleteModal.empresa?.Nombre_Emp}"`}
      />

      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEmpresaEditar(null);
        }}
        title={empresaEditar ? "Editar Empresa" : "Nueva Empresa"}
      >
        <EmpresaForm
          empresa={empresaEditar}
          onSubmit={async (data) => {
            console.log(data)
            try {
              const method = empresaEditar ? "PUT" : "POST"; // Determina si es creación o actualización
              const url = empresaEditar
                ? `/api/empresas/${empresaEditar.Id_Empresa}` // URL para actualizar
                : "/api/empresas"; // URL para crear

              await fetch(url, {
                method, // Usa el método dinámico
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                empresaEditar
                  ? "Empresa actualizada correctamente"
                  : "Empresa creada correctamente"
              );
              fetchEmpresas(); // Actualiza la lista de empresas
              setIsModalOpen(false); // Cierra el modal
              setEmpresaEditar(null); // Limpia el estado de edición
            } catch (error) {
              showNotification("Error al guardar la empresa", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setEmpresaEditar(null);
          }}
        />

      </Modal>
    </div>
  );
}
