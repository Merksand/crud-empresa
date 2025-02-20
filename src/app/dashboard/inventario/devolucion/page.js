"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import DevolucionForm from "@/app/components/inventario/DevolucionForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";

export default function Devoluciones() {
  const { notification, showNotification } = useNotification();
  const [devoluciones, setDevoluciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devolucionEditar, setDevolucionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, devolucion: null });

  useEffect(() => {
    fetchDevoluciones();
  }, []);

  const fetchDevoluciones = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/devolucion");
      const data = await response.json();
      setDevoluciones(data);
    } catch (error) {
      showNotification("Error al cargar las devoluciones", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (devolucion) => {
    setDeleteModal({ show: true, devolucion });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.devolucion) {
        throw new Error("No se seleccionó ninguna devolución para eliminar.");
      }
      const response = await fetch(`/api/inventario/devolucion/${deleteModal.devolucion.Id_Dev}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la devolución");
      }
      showNotification("Devolución eliminada correctamente");
      fetchDevoluciones();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, devolucion: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Devoluciones</h1>
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
          Nueva Devolución
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Motivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Autorización</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : devoluciones.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No hay devoluciones registradas</td>
                </tr>
              ) : (
                devoluciones.map((devolucion) => (
                  <tr key={devolucion.Id_Dev} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{devolucion.Nombre_Producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{devolucion.Motivo_Dev}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{devolucion.Autorizacion_Dev}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{devolucion.Fecha_Dev}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setDevolucionEditar(devolucion);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >Editar</button>
                      <button
                        onClick={() => confirmDelete(devolucion)}
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
        onClose={() => setDeleteModal({ show: false, devolucion: null })}
        onConfirm={handleDelete}
        itemName={`la devolución del producto "${deleteModal.devolucion?.Nombre_Producto}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDevolucionEditar(null);
        }}
        title={devolucionEditar ? "Editar Devolución" : "Nueva Devolución"}
      >
        <DevolucionForm
          devolucion={devolucionEditar}
          onSubmit={async (data) => {
            try {
              const method = devolucionEditar ? "PUT" : "POST";
              const url = devolucionEditar
                ? `/api/inventario/devolucion/${devolucionEditar.Id_Dev}`
                : "/api/inventario/devolucion";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                devolucionEditar
                  ? "Devolución actualizada correctamente"
                  : "Devolución creada correctamente"
              );
              fetchDevoluciones();
              setIsModalOpen(false);
              setDevolucionEditar(null);
            } catch (error) {
              showNotification("Error al guardar la devolución", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setDevolucionEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
