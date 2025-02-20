"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import FuncionarioAlmacenForm from "@/app/components/inventario/FuncionarioAlmacenForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";

export default function FuncionarioAlmacen() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asignacionEditar, setAsignacionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    asignacion: null,
  });
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    fetchAsignaciones();
  }, []);



  const fetchAsignaciones = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/funcionarioAlmacen");
      const data = await response.json();
      setAsignaciones(data);
    } catch (error) {
      showNotification("Error al cargar las asignaciones", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const url = asignacionEditar
        ? `/api/inventario/funcionarioAlmacen/${asignacionEditar.Id_FuncionarioAlmacen}`
        : '/api/inventario/funcionarioAlmacen';
      
      const response = await fetch(url, {
        method: asignacionEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      showNotification(
        asignacionEditar
          ? 'Asignación actualizada correctamente'
          : 'Asignación creada correctamente'
      );
      
      fetchAsignaciones();
      setIsModalOpen(false);
      setAsignacionEditar(null);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/inventario/funcionarioAlmacen/${deleteModal.asignacion.Id_FuncionarioAlmacen}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la asignación");
      }

      showNotification("Asignación eliminada correctamente");
      fetchAsignaciones();
      setDeleteModal({ show: false, asignacion: null });
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Asignaciones</h1>
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
          Nueva Asignación
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Funcionario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Almacén
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Puesto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha Fin
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : asignaciones.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No hay asignaciones registradas
                </td>
              </tr>
            ) : (
              asignaciones.map((asignacion) => (
                <tr
                  key={asignacion.Id_FuncionarioAlmacen}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${asignacion.Nombre_Fun} ${asignacion.Apellido_Fun}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asignacion.Nombre_Alm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asignacion.Puesto_FA}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(asignacion.Fecha_Inicio_FA).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asignacion.Fecha_Fin_FA
                      ? new Date(asignacion.Fecha_Fin_FA).toLocaleDateString()
                      : "Activo"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setAsignacionEditar(asignacion);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({ show: true, asignacion: asignacion })
                      }
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

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, asignacion: null })}
        onConfirm={handleDelete}
        itemName={`la asignación de ${
          deleteModal.asignacion?.Nombre_Fun
        } al almacén ${deleteModal.asignacion?.Nombre_Alm}`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAsignacionEditar(null);
        }}
        title={
          asignacionEditar ? "Editar Asignación" : "Nueva Asignación"
        }
      >
        <FuncionarioAlmacenForm
          asignacion={asignacionEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setAsignacionEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
