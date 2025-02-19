'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import MarcaForm from '@/app/components/inventario/MarcaForm'; // Asegúrate de tener este componente
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function Marca() {
  const [marcas, setMarcas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marcaEditar, setMarcaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, marca: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchMarcas();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchMarcas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventario/marca');
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error('Error al cargar marcas:', error);
      showNotification('Error al cargar las marcas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (marca) => {
    setDeleteModal({ show: true, marca });
  };

  const confirmDelete = async () => {
    try {
      console.log(deleteModal.marca.Id_Marca)
      const response = await fetch(`/api/inventario/marca/${deleteModal.marca.Id_Marca}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la marca');
      }

      showNotification('Marca eliminada correctamente');
      fetchMarcas();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar la marca', 'error');
    } finally {
      setDeleteModal({ show: false, marca: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-green-500 text-white'
          }`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Marcas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Marca
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
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
              ) : marcas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No hay marcas registradas
                  </td>
                </tr>
              ) : (
                marcas.map((marca) => {
                  return (
                    <tr key={marca.Id_Marca} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{marca.Nombre_Mar}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${marca.Estado_Mar === 'Activo'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                          }`}>
                          {marca.Estado_Mar}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setMarcaEditar(marca);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(marca)}
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
        onClose={() => setDeleteModal({ show: false, marca: null })}
        onConfirm={confirmDelete}
        itemName={`la marca "${deleteModal.marca?.Nombre_Mar}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMarcaEditar(null);
        }}
        title={marcaEditar ? 'Editar Marca' : 'Nueva Marca'}
      >
        <MarcaForm
          marca={marcaEditar}
          onSubmit={async (data) => {
            try {
              if (marcaEditar) {
                await fetch(`/api/inventario/marca/${marcaEditar.Id_Marca}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Marca actualizada correctamente');
              } else {
                await fetch('/api/inventario/marca', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Marca creada correctamente');
              }
              setIsModalOpen(false);
              setMarcaEditar(null);
              fetchMarcas();
            } catch (error) {
              console.error('Error:', error);
              showNotification('Error al guardar la marca', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setMarcaEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}