"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import SucursalForm from "@/app/components/inventario/SucursalForm";

export default function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sucursalEditar, setSucursalEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, sucursal: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Cargar sucursales al inicializar
  useEffect(() => {
    fetchSucursales();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/sucursal");
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      showNotification("Error al cargar las sucursales", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (sucursal) => {
    setDeleteModal({ show: true, sucursal });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.sucursal) {
        throw new Error("No se seleccionó ninguna sucursal para eliminar.");
      }
      const response = await fetch(`/api/inventario/sucursal/${deleteModal.sucursal.Id_Sucursal}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la sucursal");
      }
      showNotification("Sucursal eliminada correctamente");
      fetchSucursales();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, sucursal: null });
    }
  };

  return (
    <div className="p-6">
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
        <h1 className="text-2xl font-bold">Gestión de Sucursales</h1>
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
          Nueva Sucursal
        </button>
      </div>
      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Parametro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sucursal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : sucursales.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No hay sucursales registradas
                  </td>
                </tr>
              ) : (
                sucursales.map((sucursal) => {
                  return (
                    <tr key={sucursal.Id_Sucursal} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Empresa}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Parametro_Suc}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Suc}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSucursalEditar(sucursal);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDelete(sucursal)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, sucursal: null })}
        onConfirm={handleDelete}
        itemName={`la sucursal "${deleteModal.sucursal?.Nombre_Suc}"`}
      />
      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSucursalEditar(null);
          console.log("Modal open")
        }}
        title={sucursalEditar ? "Editar Sucursal" : "Nueva Sucursal"}
      >
        <SucursalForm
          sucursal={sucursalEditar}
          onSubmit={async (data) => {
            try {
              const method = sucursalEditar ? "PUT" : "POST"; // Determina si es creación o actualización
              const url = sucursalEditar
                ? `/api/inventario/sucursal/${sucursalEditar.Id_Sucursal}` // URL para actualizar
                : "/api/inventario/sucursal"; // URL para crear
                console.log(data)
              await fetch(url, {
                method, // Usa el método dinámico
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              showNotification(
                sucursalEditar
                  ? "Sucursal actualizada correctamente"
                  : "Sucursal creada correctamente"
              );
              fetchSucursales(); // Actualiza la lista de sucursales
              setIsModalOpen(false); // Cierra el modal
              setSucursalEditar(null); // Limpia el estado de edición
            } catch (error) {
              showNotification("Error al guardar la sucursal", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setSucursalEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}