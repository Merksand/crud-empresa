'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import SucursalForm from '@/app/components/SucursalForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sucursalEditar, setSucursalEditar] = useState(null);
  const [municipios, setMunicipios] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, sucursal: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchSucursales();
    fetchMunicipios();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchMunicipios = async () => {
    try {
      const response = await fetch('/api/municipio'); // Endpoint para obtener municipios
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
      showNotification('Error al cargar los municipios', 'error');
    }
  };

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sucursales');
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      console.error('Error al cargar sucursales:', error);
      showNotification('Error al cargar las sucursales', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sucursal) => {
    setDeleteModal({ show: true, sucursal });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/sucursales/${deleteModal.sucursal.Id_Sucursal}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la sucursal');
      }

      showNotification('Sucursal eliminada correctamente');
      fetchSucursales();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar la sucursal', 'error');
    } finally {
      setDeleteModal({ show: false, sucursal: null });
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
        <h1 className="text-2xl font-bold">Gestión de Sucursales</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Sucursal
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Municipio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Geolocalización</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parámetro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : sucursales.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay sucursales registradas
                  </td>
                </tr>
              ) : (
                sucursales.map((sucursal) => (
                  <tr key={sucursal.Id_Sucursal} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Suc}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Municipio || 'Desconocido'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Id_Geolocalizacion_Suc}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal.Nombre_Parametro_Suc}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sucursal.Estado_Suc === 'Activo'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                        {sucursal.Estado_Suc}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSucursalEditar(sucursal);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(sucursal)}
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

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, sucursal: null })}
        onConfirm={confirmDelete}
        itemName={`la sucursal "${deleteModal.sucursal?.Nombre_Suc}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSucursalEditar(null);
        }}
        title={sucursalEditar ? 'Editar Sucursal' : 'Nueva Sucursal'}
      >
        <SucursalForm
          sucursal={sucursalEditar}
          municipios={municipios} // Lista de municipios cargada desde el backend
          onSubmit={async (data) => {
            try {
              if (sucursalEditar) {
                await fetch(`/api/sucursales/${sucursalEditar.Id_Sucursal}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Sucursal actualizada correctamente');
              } else {
                await fetch('/api/sucursales', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Sucursal creada correctamente');
              }
              setIsModalOpen(false);
              setSucursalEditar(null);
              fetchSucursales();
            } catch (error) {
              console.error('Error:', error);
              showNotification('Error al guardar la sucursal', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setSucursalEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
