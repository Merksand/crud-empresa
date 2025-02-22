"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import OrdenCompraForm from "@/app/components/inventario/OrdenCompraForm";
import Notification from '@/app/components/Notification';
import useNotification from '@/app/hooks/useNotification';

export default function OrdenesCompra() {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordenCompraEditar, setOrdenCompraEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const { notification, showNotification } = useNotification();

  // Cargar registros al inicializar
  useEffect(() => {
    fetchOrdenesCompra();
  }, []);

  const fetchOrdenesCompra = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/ordenesCompra");
      const data = await response.json();
      console.log(data);
      setOrdenesCompra(data);
    } catch (error) {
      showNotification("Error al cargar las órdenes de compra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const method = ordenCompraEditar ? "PUT" : "POST";
      const url = ordenCompraEditar
        ? `/api/inventario/ordenesCompra/${ordenCompraEditar.Id_OrdenCompra}`
        : "/api/inventario/ordenesCompra";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la orden de compra");
      }

      showNotification(
        ordenCompraEditar
          ? "Orden de compra actualizada correctamente"
          : "Orden de compra agregada correctamente"
      );

      fetchOrdenesCompra();
      setIsModalOpen(false);
      setOrdenCompraEditar(null);
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
        throw new Error("No se seleccionó ninguna orden de compra para eliminar.");
      }
      const response = await fetch(`/api/inventario/ordenesCompra/${deleteModal.item.Id_OrdenCompra}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la orden de compra");
      }
      showNotification("Orden de compra eliminada correctamente");
      fetchOrdenesCompra();
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
        <h1 className="text-2xl font-bold">Gestión de Órdenes de Compra</h1>
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
          Nueva Orden
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sucursal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Moneda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Cargando...</td>
                </tr>
              ) : ordenesCompra.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No hay órdenes de compra registradas</td>
                </tr>
              ) : (
                ordenesCompra.map((item) => (
                  <tr key={item.Id_OrdenCompra} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Sucursal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Proveedor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Moneda}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(item.FechaOrden_OdC).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Monto_OdC}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setOrdenCompraEditar(item);
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
          setOrdenCompraEditar(null);
        }}
        title={ordenCompraEditar ? "Editar Orden de Compra" : "Nueva Orden de Compra"}
      >
        <OrdenCompraForm
          ordenCompra={ordenCompraEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setOrdenCompraEditar(null);
          }}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Orden de Compra"
        message="¿Está seguro que desea eliminar esta orden de compra?"
      />
    </div>
  );
}
