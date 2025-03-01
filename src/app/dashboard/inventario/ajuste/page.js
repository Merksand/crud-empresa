"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import AjusteForm from "@/app/components/inventario/AjusteForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";

export default function Ajustes() {
  const { notification, showNotification } = useNotification();
  const [ajustes, setAjustes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ajusteEditar, setAjusteEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, ajuste: null });

  // Cargar ajustes al iniciar
  useEffect(() => {
    fetchAjustes();
  }, []);

  const fetchAjustes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/ajuste");
      const data = await response.json();
      setAjustes(data);
    } catch (error) {
      showNotification("Error al cargar los ajustes", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (ajuste) => {
    setDeleteModal({ show: true, ajuste });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.ajuste) {
        throw new Error("No se seleccionó ningún ajuste para eliminar.");
      }
      const response = await fetch(`/api/inventario/ajuste/${deleteModal.ajuste.Id_Ajuste}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el ajuste");
      }
      showNotification("Ajuste eliminado correctamente");
      fetchAjustes();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, ajuste: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Ajustes</h1>
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
          Nuevo Ajuste
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Motivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : ajustes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No hay ajustes registrados</td>
                </tr>
              ) : (
                ajustes.map((ajuste) => (
                  <tr key={ajuste.Id_Ajuste} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ajuste.Nombre_Producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ajuste.Motivo_Aju}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(ajuste.Fecha_Aju).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setAjusteEditar(ajuste);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >Editar</button>
                      <button
                        onClick={() => confirmDelete(ajuste)}
                        className="text-red-600 hover:text-red-900"
                      >Eliminar</button>
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
        onClose={() => setDeleteModal({ show: false, ajuste: null })}
        onConfirm={handleDelete}
        itemName={`el ajuste del producto "${deleteModal.ajuste?.Nombre_Producto}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAjusteEditar(null);
        }}
        title={ajusteEditar ? "Editar Ajuste" : "Nuevo Ajuste"}
      >
        <AjusteForm
          ajuste={ajusteEditar}
          onSubmit={async (data) => {
            try {
              const method = ajusteEditar ? "PUT" : "POST";
              const url = ajusteEditar
                ? `/api/inventario/ajuste/${ajusteEditar.Id_Ajuste}`
                : "/api/inventario/ajuste";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                ajusteEditar
                  ? "Ajuste actualizado correctamente"
                  : "Ajuste creado correctamente"
              );
              fetchAjustes();
              setIsModalOpen(false);
              setAjusteEditar(null);
            } catch (error) {
              showNotification("Error al guardar el ajuste", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setAjusteEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
