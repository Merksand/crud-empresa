"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import TipoCambioForm from "@/app/components/inventario/TipoCambioForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";

export default function TipoCambio() {
  const { notification, showNotification } = useNotification();
  const [tiposCambio, setTiposCambio] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoCambioEditar, setTipoCambioEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, tipoCambio: null });

  useEffect(() => {
    fetchTiposCambio();
  }, []);

  const fetchTiposCambio = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/tipoCambio");
      const data = await response.json();
      setTiposCambio(data);
    } catch (error) {
      showNotification("Error al cargar los tipos de cambio", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (tipoCambio) => {
    setDeleteModal({ show: true, tipoCambio });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.tipoCambio) {
        throw new Error("No se seleccionó ningún tipo de cambio para eliminar.");
      }
      const response = await fetch(`/api/inventario/tipoCambio/${deleteModal.tipoCambio.Id_TipoCambio}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el tipo de cambio");
      }
      showNotification("Tipo de cambio eliminado correctamente");
      fetchTiposCambio();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, tipoCambio: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Tipos de Cambio</h1>
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
          Nuevo Tipo de Cambio
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Moneda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tasa de Cambio</th>
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
              ) : tiposCambio.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No hay tipos de cambio registrados</td>
                </tr>
              ) : (
                tiposCambio.map((tipoCambio) => (
                  <tr key={tipoCambio.Id_TipoCambio} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tipoCambio.Nombre_Moneda}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tipoCambio.Codigo_Moneda}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {tipoCambio.Fecha_TiC ? new Date(tipoCambio.Fecha_TiC).toLocaleDateString(): "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tipoCambio.TasaCambio_TiC}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setTipoCambioEditar(tipoCambio);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >Editar</button>
                      <button
                        onClick={() => confirmDelete(tipoCambio)}
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
        onClose={() => setDeleteModal({ show: false, tipoCambio: null })}
        onConfirm={handleDelete}
        itemName={`el tipo de cambio de "${deleteModal.tipoCambio?.Nombre_Moneda}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTipoCambioEditar(null);
        }}
        title={tipoCambioEditar ? "Editar Tipo de Cambio" : "Nuevo Tipo de Cambio"}
      >
        <TipoCambioForm
          tipoCambio={tipoCambioEditar}
          onSubmit={async (data) => {
            try {
              const method = tipoCambioEditar ? "PUT" : "POST";
              const url = tipoCambioEditar
                ? `/api/inventario/tipoCambio/${tipoCambioEditar.Id_TipoCambio}`
                : "/api/inventario/tipoCambio";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                tipoCambioEditar
                  ? "Tipo de cambio actualizado correctamente"
                  : "Tipo de cambio creado correctamente"
              );
              fetchTiposCambio();
              setIsModalOpen(false);
              setTipoCambioEditar(null);
            } catch (error) {
              showNotification("Error al guardar el tipo de cambio", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setTipoCambioEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
