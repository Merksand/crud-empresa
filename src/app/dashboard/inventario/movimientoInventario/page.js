"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import MovimientoInventarioForm from "@/app/components/inventario/MovimientoInventarioForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";


export default function MovimientoInventario() {
  const [movimientos, setMovimientos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movimientoEditar, setMovimientoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const { notification, showNotification } = useNotification();

  // Cargar movimientos de inventario al inicializar
  useEffect(() => {
    fetchMovimientos();
  }, []);


  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/movimientoInventario");
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      showNotification(
        "Error al cargar los movimientos de inventario",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const method = movimientoEditar ? "PUT" : "POST";
      const url = movimientoEditar
        ? `/api/inventario/movimientoInventario/${movimientoEditar.Id_MovimientoInventario}`
        : "/api/inventario/movimientoInventario";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el movimiento de inventario");
      }

      showNotification(
        movimientoEditar
          ? "Movimiento de inventario actualizado correctamente"
          : "Movimiento de inventario agregado correctamente"
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
      const response = await fetch(
        `/api/inventario/movimientoInventario/${deleteModal.item.Id_MovimientoInventario}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Error al eliminar el movimiento de inventario"
        );
      }
      showNotification("Movimiento de inventario eliminado correctamente");
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
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => showNotification({ show: false, message: "", type: "" })}
        />
      )}
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Gestión de Movimientos de Inventario
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
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
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo de Movimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Almacen Origen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Almacen Destino
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Cargando...
                  </td>
                </tr>
              ) : movimientos.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay movimientos de inventario registrados
                  </td>
                </tr>
              ) : (
                movimientos.map((item) => {
                  // console.log("PAGE: ",item)
                  return (
                    <tr
                      key={item.Id_MovimientoInventario}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.Nombre_Producto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.Nombre_TipoMovimiento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.Cantidad_MoI}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.Nombre_AlmacenOrigen}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.Nombre_AlmacenDestino}
                      </td>
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
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Agregar el DeleteConfirmationModal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Movimiento"
        message="¿Estás seguro que deseas eliminar este movimiento de inventario? Esta acción no se puede deshacer."
      />
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMovimientoEditar(null);
        }}
        title={movimientoEditar ? "Editar Movimiento" : "Nuevo Movimiento"}
      >
        <MovimientoInventarioForm
          movimiento={movimientoEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setMovimientoEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
