"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import MetodoValoracionForm from "@/app/components/inventario/MetodoValoracionForm";

export default function MetodoValoracion() {
  const [metodos, setMetodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metodoEditar, setMetodoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Cargar métodos de valoración al inicializar
  useEffect(() => {
    fetchMetodos();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchMetodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/metodoValoracion");
      const data = await response.json();
      setMetodos(data);
    } catch (error) {
      showNotification("Error al cargar los métodos de valoración", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const method = metodoEditar ? "PUT" : "POST";
      const url = metodoEditar
        ? `/api/inventario/metodoValoracion/${metodoEditar.Id_MetodoValoracion}`
        : "/api/inventario/metodoValoracion";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el método de valoración");
      }

      showNotification(
        metodoEditar
          ? "Método de valoración actualizado correctamente"
          : "Método de valoración agregado correctamente"
      );

      fetchMetodos();
      setIsModalOpen(false);
      setMetodoEditar(null);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const confirmDelete = (item) => {
    setDeleteModal({ show: true, item });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.item) {
        throw new Error("No se seleccionó ningún método de valoración para eliminar.");
      }
      const response = await fetch(`/api/inventario/metodoValoracion/${deleteModal.item.Id_MetodoValoracion}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el método de valoración");
      }
      showNotification("Método de valoración eliminado correctamente");
      fetchMetodos();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, item: null });
    }
  };

  return (
    <div className="p-4">
      {/* Notificaciones */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Métodos de Valoración</h1>
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
          Nuevo Método
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
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Cargando...</td>
                </tr>
              ) : metodos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No hay métodos de valoración registrados</td>
                </tr>
              ) : (
                metodos.map((item) => (
                  <tr key={item.Id_MetodoValoracion} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_MeV}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Descripcion_MeV}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setMetodoEditar(item);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(item)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
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

      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMetodoEditar(null);
        }}
        title={metodoEditar ? "Editar Método de Valoración" : "Nuevo Método de Valoración"}
      >
        <MetodoValoracionForm
          metodo={metodoEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setMetodoEditar(null);
          }}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Método de Valoración"
        message="¿Está seguro que desea eliminar este método de valoración? Esta acción no se puede deshacer."
      />
    </div>
  );
}
