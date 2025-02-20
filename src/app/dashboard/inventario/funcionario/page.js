"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import FuncionarioForm from "@/app/components/inventario/FuncionarioForm";
import Notification from "@/app/components/Notification";
import useNotification from "@/app/hooks/useNotification";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarioEditar, setFuncionarioEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    funcionario: null,
  });
  const { notification, showNotification } = useNotification();


  // Cargar funcionarios al inicializar
  useEffect(() => {
    fetchFuncionarios();
  }, []);



  const fetchFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/funcionario");
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      showNotification("Error al cargar los funcionarios", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (funcionario) => {
    setDeleteModal({ show: true, funcionario });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.funcionario) {
        throw new Error("No se seleccionó ningún funcionario para eliminar.");
      }
      const response = await fetch(
        `/api/inventario/funcionario/${deleteModal.funcionario.Id_Funcionario}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar el funcionario");
      }
      showNotification("Funcionario eliminado correctamente");
      fetchFuncionarios();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, funcionario: null });
    }
  };

  const handleSubmit = async (data) => {
    try {
      const url = funcionarioEditar
        ? `/api/inventario/funcionario/${funcionarioEditar.Id_Funcionario}`
        : '/api/inventario/funcionario';

      const response = await fetch(url, {
        method: funcionarioEditar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al procesar la solicitud');
      }

      showNotification(
        funcionarioEditar
          ? 'Funcionario actualizado correctamente'
          : 'Funcionario creado correctamente'
      );

      // Actualizar la lista de funcionarios
      fetchFuncionarios();

      // Cerrar el modal
      setIsModalOpen(false);
      setFuncionarioEditar(null);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      {/* Encabezado */}
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Funcionarios</h1>
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
          Nuevo Funcionario
        </button>
      </div>
      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nombre Completo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Documento
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
              ) : funcionarios.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay funcionarios registrados
                  </td>
                </tr>
              ) : (
                funcionarios.map((funcionario) => (
                  <tr
                    key={funcionario.Id_Funcionario}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {`${funcionario.Nombre_Fun} ${funcionario.Apellido_Fun}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {funcionario.Cargo_Funcionario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {funcionario.Documento_Fun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setFuncionarioEditar(funcionario);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(funcionario)}
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

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, funcionario: null })}
        onConfirm={handleDelete}
        itemName={`el funcionario "${deleteModal.funcionario?.Nombre_Fun} ${deleteModal.funcionario?.Apellido_Fun}"`}
      />

      {/* Modal de formulario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFuncionarioEditar(null);
        }}
        title={funcionarioEditar ? "Editar Funcionario" : "Nuevo Funcionario"}
      >
        <FuncionarioForm
          funcionario={funcionarioEditar}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setFuncionarioEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
