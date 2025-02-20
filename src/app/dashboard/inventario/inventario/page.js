"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import InventarioForm from "@/app/components/inventario/InventarioForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";
import { io } from "socket.io-client";
import useSocket from "@/app/hooks/useSocket";

export default function Inventario() {
  const { notification, showNotification } = useNotification();
  const [inventario, setInventario] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventarioEditar, setInventarioEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });

  // Cargar inventario al inicializar
  useEffect(() => {
    fetchInventario();
  }, []);

  const fetchInventario = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/inventario");
      const data = await response.json();
      setInventario(data);
    } catch (error) {
      showNotification("Error al cargar el inventario", "error");
    } finally {
      setLoading(false);
    }
  };



  useSocket({
    "inventario-actualizado": (productoActualizado) => {
        console.log("🔔 Evento recibido: inventario-actualizado", productoActualizado);

        setInventario((prev) => {
            const index = prev.findIndex(
                (item) => String(item.Id_Inventario) === String(productoActualizado.Id_Inventario)
            );

            if (index !== -1) {
                // ✅ Actualiza solo la fila correspondiente sin agregar nuevas
                return prev.map((item, i) =>
                    i === index ? { ...item, ...productoActualizado } : item
                );
            } else {
                return prev; // ✅ No agrega una nueva fila si no se encuentra
            }
        });
    },

    "inventario-agregado": (nuevoProducto) => {
        console.log("🔔 Evento recibido: inventario-agregado", nuevoProducto);
        setInventario((prev) => [...prev, nuevoProducto]); // ✅ Agrega un nuevo producto
    },

    "inventario-eliminado": (idProducto) => {
        console.log("🔔 Evento recibido: inventario-eliminado", idProducto);
        setInventario((prev) =>
            prev.filter((item) => String(item.Id_Inventario) !== String(idProducto))
        ); // ✅ Elimina la fila correspondiente
    }
});





  const handleSubmit = async (data) => {
    try {
      const method = inventarioEditar ? "PUT" : "POST";
      const url = inventarioEditar
        ? `/api/inventario/inventario/${inventarioEditar.Id_Inventario}`
        : "/api/inventario/inventario";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el registro");
      }

      showNotification(
        inventarioEditar
          ? "Registro actualizado correctamente"
          : "Registro agregado correctamente"
      );

      fetchInventario();
      setIsModalOpen(false);
      setInventarioEditar(null);
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
        throw new Error("No se seleccionó ningún producto para eliminar.");
      }
      const response = await fetch(`/api/inventario/inventario/${deleteModal.item.Id_Inventario}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el producto del inventario");
      }
      showNotification("Producto eliminado del inventario correctamente");
      fetchInventario();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, item: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
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
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Almacén
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
              ) : inventario.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No hay registros en el inventario</td>
                </tr>
              ) : (
                inventario.map((item) => (
                  <tr key={item.Id_Inventario} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Nombre_Almacen}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Cantidad_Inv}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setInventarioEditar(item);
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
          setInventarioEditar(null);
        }}
        title={inventarioEditar ? "Editar Inventario" : "Nuevo Registro"}
      >
        <InventarioForm
          inventario={inventarioEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setInventarioEditar(null);
          }}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, item: null })}
        onConfirm={handleDelete}
        title="Eliminar Producto del Inventario"
        message="¿Está seguro que desea eliminar este producto del inventario?"
      />
    </div>
  );
}
