"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import AlmacenForm from "@/app/components/inventario/AlmacenForm";

export default function Almacenes() {
  const [almacenes, setAlmacenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [almacenEditar, setAlmacenEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, almacen: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchAlmacenes();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchAlmacenes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/almacen");
      const data = await response.json();
      setAlmacenes(data);
    } catch (error) {
      showNotification("Error al cargar los almacenes", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (almacen) => {
    setDeleteModal({ show: true, almacen });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.almacen) {
        throw new Error("No se seleccionó ningún almacén para eliminar.");
      }
      const response = await fetch(`/api/inventario/almacen/${deleteModal.almacen.Id_Almacen}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el almacén");
      }
      showNotification("Almacén eliminado correctamente");
      fetchAlmacenes();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, almacen: null });
    }
  };


  return (
    <div className="p-4">
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Almacenes</h1>
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
          Nuevo Almacén
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Sucursal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Capacidad Máxima</th>
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
              ) : almacenes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No hay almacenes registrados</td>
                </tr>
              ) : (
                almacenes.map((almacen) => (
                  <tr key={almacen.Id_Almacen} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{almacen.Nombre_Sucursal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{almacen.Nombre_Alm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{almacen.Ubicacion_Alm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{almacen.Capacidad_maxima_Alm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setAlmacenEditar(almacen);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >Editar</button>
                      <button
                        onClick={() => confirmDelete(almacen)}
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
        onClose={() => setDeleteModal({ show: false, almacen: null })}
        onConfirm={handleDelete}
        itemName={`el almacén "${deleteModal.almacen?.Nombre_Alm}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAlmacenEditar(null);
        }}
        title={almacenEditar ? "Editar Almacén" : "Nuevo Almacén"}
      >
        <AlmacenForm
          almacen={almacenEditar}
          onSubmit={async (data) => {
            try {
              const method = almacenEditar ? "PUT" : "POST";
              const url = almacenEditar
                ? `/api/inventario/almacen/${almacenEditar.Id_Almacen}`
                : "/api/inventario/almacen";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                almacenEditar
                  ? "Almacén actualizado correctamente"
                  : "Almacén creado correctamente"
              );
              fetchAlmacenes();
              setIsModalOpen(false);
              setAlmacenEditar(null);
            } catch (error) {
              showNotification("Error al guardar el almacén", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setAlmacenEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
