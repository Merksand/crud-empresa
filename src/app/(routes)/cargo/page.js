'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import CargoForm from '@/app/components/CargoForm'; // Asegúrate de tener este componente
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function cargo() {
  const [cargo, setcargo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cargoEditar, setCargoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, cargo: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchcargo();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchcargo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cargo');
      const data = await response.json();
      setcargo(data);
    } catch (error) {
      console.error('Error al cargar cargo:', error);
      showNotification('Error al cargar los cargo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cargo) => {
    setDeleteModal({ show: true, cargo });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/cargo/${deleteModal.cargo.Id_Cargo}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el cargo');
      }

      showNotification('Cargo eliminado correctamente');
      fetchcargo();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar el cargo', 'error');
    } finally {
      setDeleteModal({ show: false, cargo: null });
    }
  };

  return (
    <div className="p-6">
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-green-500 text-white'
          }`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de cargo</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Cargo
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nivel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sueldo Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sueldo USD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resolución</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : cargo.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No hay cargo registrados
                  </td>
                </tr>
              ) : (
                cargo.map((cargo) => {
                  return (
                    <tr key={cargo.Id_Cargo} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cargo.Nombre_Car}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cargo.Nivel_Car}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cargo.Sueldo_Car}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cargo.Sueldo_USD_Car}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cargo.Resolucion_Car}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cargo.Estado_Dep === 'Activo'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                          }`}>
                          {cargo.Estado_Dep}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setCargoEditar(cargo);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(cargo)}
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

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, cargo: null })}
        onConfirm={confirmDelete}
        itemName={`el cargo "${deleteModal.cargo?.Nombre_Car}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCargoEditar(null);
        }}
        title={cargoEditar ? 'Editar Cargo' : 'Nuevo Cargo'}
      >
        <CargoForm
          cargo={cargoEditar}
          onSubmit={async (data) => {
            try {
              if (cargoEditar) {
                await fetch(`/api/cargo/${cargoEditar.Id_Cargo}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Cargo actualizado correctamente');
              } else {
                await fetch('/api/cargo', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Cargo creado correctamente');
              }
              setIsModalOpen(false);
              setCargoEditar(null);
              fetchcargo();
            } catch (error) {
              console.error('Error:', error);
              showNotification('Error al guardar el cargo', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setCargoEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
