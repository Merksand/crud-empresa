"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import BajasForm from "@/app/components/inventario/BajasForm";

export default function Bajas() {
  const [bajas, setBajas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bajaEditar, setBajaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, baja: null });

  useEffect(() => {
    fetchBajas();
  }, []);

  const fetchBajas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/bajas");
      const data = await response.json();
      setBajas(data);
    } catch (error) {
      console.error("Error al obtener las bajas:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (baja) => {
    setDeleteModal({ show: true, baja });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.baja) {
        throw new Error("No se seleccionó ninguna baja para eliminar.");
      }
      const response = await fetch(`/api/inventario/bajas/${deleteModal.baja.Id_Baja}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la baja.");
      }
      fetchBajas();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModal({ show: false, baja: null });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Bajas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Nueva Baja
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50  dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Movimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Autorización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">Cargando...</td>
                </tr>
              ) : bajas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">No hay bajas registradas</td>
                </tr>
              ) : (
                bajas.map((baja) => (
                  <tr key={baja.Id_Baja}>
                    <td className="px-6 py-4 text-sm">{baja.Id_Movimiento_Baj}</td>
                    <td className="px-6 py-4 text-sm">{baja.Motivo_Baj}</td>
                    <td className="px-6 py-4 text-sm">{baja.Autorizacion_Baj}</td>
                    <td className="px-6 py-4 text-sm">{new Date(baja.Fecha_Baj).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setBajaEditar(baja);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(baja)}
                        className="text-red-600 hover:text-red-900"
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

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, baja: null })}
        onConfirm={handleDelete}
        itemName={`la baja con ID ${deleteModal.baja?.Id_Baja}`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setBajaEditar(null);
        }}
        title={bajaEditar ? "Editar Baja" : "Nueva Baja"}
      >
        <BajasForm
          baja={bajaEditar}
          onSubmit={async (data) => {
            try {
              const method = bajaEditar ? "PUT" : "POST";
              const url = bajaEditar
                ? `/api/inventario/bajas/${bajaEditar.Id_Baja}`
                : "/api/inventario/bajas";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              fetchBajas();
              setIsModalOpen(false);
              setBajaEditar(null);
            } catch (error) {
              console.error("Error al guardar la baja:", error);
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setBajaEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
