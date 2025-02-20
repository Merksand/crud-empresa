"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import LoteProductoForm from "@/app/components/inventario/LoteProductoForm";
import Notification from '@/app/components/Notification';
import useNotification from '@/app/hooks/useNotification';


export default function LoteProductos() {
  const [loteProductos, setLoteProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loteProductoEditar, setLoteProductoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const { notification, showNotification } = useNotification();
  // Cargar registros al inicializar
  useEffect(() => {
    fetchLoteProductos();
  }, []);

  const fetchLoteProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/loteProducto");
      const data = await response.json();
      setLoteProductos(data);
    } catch (error) {
      showNotification("Error al cargar los registros", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const method = loteProductoEditar ? "PUT" : "POST";
      const url = loteProductoEditar
        ? `/api/inventario/loteProducto/${loteProductoEditar.Id_LoteProductos}`
        : "/api/inventario/loteProducto";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el registro");
      }

      showNotification(
        loteProductoEditar
          ? "Registro actualizado correctamente"
          : "Registro agregado correctamente"
      );

      fetchLoteProductos();
      setIsModalOpen(false);
      setLoteProductoEditar(null);
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
        throw new Error("No se seleccionó ningún registro para eliminar.");
      }
      const response = await fetch(`/api/inventario/loteProducto/${deleteModal.item.Id_LoteProductos}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el registro");
      }
      showNotification("Registro eliminado correctamente");
      fetchLoteProductos();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, item: null });
    }
  };

  return (
    <div className="p-4">
      {/* Notificaciones */}
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Lote-Productos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a 1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nuevo Registro
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lote
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Cargando...</td>
                </tr>
              ) : loteProductos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No hay registros</td>
                </tr>
              ) : (
                loteProductos.map((item) => (
                  <tr key={item.Id_LoteProductos} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Numero_Lote}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Cantidad_LoP}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setLoteProductoEditar(item);
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
          setLoteProductoEditar(null);
        }}
        title={loteProductoEditar ? "Editar Lote-Producto" : "Nuevo Registro"}
      >
        <LoteProductoForm
          loteProducto={loteProductoEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setLoteProductoEditar(null);
          }}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Registro"
        message="¿Está seguro que desea eliminar este registro?"
      />
    </div>
  );
}
