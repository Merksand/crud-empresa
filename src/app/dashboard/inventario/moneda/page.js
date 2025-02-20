'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import MonedaForm from '@/app/components/inventario/MonedaForm'; // Asegúrate de tener este componente
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';
import Notification from '@/app/components/Notification';
import useNotification from '@/app/hooks/useNotification';

export default function Moneda() {
  const { notification, showNotification } = useNotification();
  const [monedas, setMonedas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monedaEditar, setMonedaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, moneda: null });

  useEffect(() => {
    fetchMonedas();
  }, []);

  const fetchMonedas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventario/moneda');
      const data = await response.json();
      setMonedas(data);
    } catch (error) {
      console.error('Error al cargar monedas:', error);
      showNotification('Error al cargar las monedas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (moneda) => {
    setDeleteModal({ show: true, moneda });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/inventario/moneda/${deleteModal.moneda.Id_Moneda}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la moneda');
      }

      showNotification('Moneda eliminada correctamente');
      fetchMonedas();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar la moneda', 'error');
    } finally {
      setDeleteModal({ show: false, moneda: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && <Notification message={notification.message} type={notification.type} />}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Monedas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Moneda
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : monedas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No hay monedas registradas
                  </td>
                </tr>
              ) : (
                monedas.map((moneda) => {
                  return (
                    <tr key={moneda.Id_Moneda} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{moneda.Codigo_Mon}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{moneda.Nombre_Mon}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setMonedaEditar(moneda);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(moneda)}
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
        onClose={() => setDeleteModal({ show: false, moneda: null })}
        onConfirm={confirmDelete}
        itemName={`la moneda "${deleteModal.moneda?.Nombre_Mon}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMonedaEditar(null);
        }}
        title={monedaEditar ? 'Editar Moneda' : 'Nueva Moneda'}
      >
        <MonedaForm
          moneda={monedaEditar}
          onSubmit={async (data) => {
            try {
              if (monedaEditar) {
                await fetch(`/api/inventario/moneda/${monedaEditar.Id_Moneda}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Moneda actualizada correctamente');
              } else {
                await fetch('/api/inventario/moneda', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Moneda creada correctamente');
              }
              setIsModalOpen(false);
              setMonedaEditar(null);
              fetchMonedas();
            } catch (error) {
              console.error('Error:', error);
              showNotification('Error al guardar la moneda', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setMonedaEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
