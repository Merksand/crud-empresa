"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import TipoMovimientoForm from "@/app/components/inventario/TipoMovimientoForm";

export default function TipoMovimiento() {
  const [movimientos, setMovimientos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movimientoEditar, setMovimientoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Cargar movimientos al inicializar
  useEffect(() => {
    fetchMovimientos();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/tipoMovimiento");
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      showNotification("Error al cargar los movimientos", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const method = movimientoEditar ? "PUT" : "POST";
      const url = movimientoEditar
        ? `/api/inventario/tipoMovimiento/${movimientoEditar.Id_TipoMovimiento}`
        : "/api/inventario/tipoMovimiento";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el tipo de movimiento");
      }

      showNotification(
        movimientoEditar
          ? "Tipo de movimiento actualizado correctamente"
          : "Tipo de movimiento agregado correctamente"
      );

      fetchMovimientos();
      setIsModalOpen(false);
      setMovimientoEditar(null);
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
        throw new Error("No se seleccionó ningún movimiento para eliminar.");
      }
      const response = await fetch(`/api/inventario/tipoMovimiento/${deleteModal.item.Id_TipoMovimiento}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el movimiento");
      }
      showNotification("Movimiento eliminado correctamente");
      fetchMovimientos();
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
        <h1 className="text-2xl font-bold">Gestión de Tipos de Movimiento</h1>
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
          Nuevo Movimiento
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
                  Código
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
              ) : movimientos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No hay tipos de movimientos registrados</td>
                </tr>
              ) : (
                movimientos.map((item) => (
                  <tr key={item.Id_TipoMovimiento} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_TiM}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Codigo_TiM}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setMovimientoEditar(item);
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
          setMovimientoEditar(null);
        }}
        title={movimientoEditar ? "Editar Tipo de Movimiento" : "Nuevo Tipo de Movimiento"}
      >
        <TipoMovimientoForm
          movimiento={movimientoEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setMovimientoEditar(null);
          }}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Tipo de Movimiento"
        message="¿Está seguro que desea eliminar este tipo de movimiento?"
      />
    </div>
  );
}
