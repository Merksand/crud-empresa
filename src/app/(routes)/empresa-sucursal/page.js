'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import EmpresaSucursalForm from '@/app/components/EmpresaSucursalForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function EmpresaSucursal() {
  const [relaciones, setRelaciones] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relacionEditar, setRelacionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, relacion: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [relacionesRes, empresasRes, sucursalesRes] = await Promise.all([
        fetch('/api/empresa-sucursal'),
        fetch('/api/empresas'),
        fetch('/api/sucursales')
      ]);

      const [relacionesData, empresasData, sucursalesData] = await Promise.all([
        relacionesRes.json(),
        empresasRes.json(),
        sucursalesRes.json()
      ]);

      setRelaciones(relacionesData);
      setEmpresas(empresasData);
      setSucursales(sucursalesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      showNotification('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (relacion) => {
    setDeleteModal({ show: true, relacion });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/empresa-sucursal/${deleteModal.relacion.Id_Empresa}/${deleteModal.relacion.Id_Sucursal}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la relación');
      }

      showNotification('Relación eliminada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar la relación', 'error');
    } finally {
      setDeleteModal({ show: false, relacion: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empresa-Sucursal</h1>
        <div className="flex items-center gap-4">
          {notification.show && (
            <div className={`px-4 py-2 rounded-lg ${
              notification.type === 'error' 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {notification.message}
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nueva Relación
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sucursal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha Apertura</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha Cierre</th>
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
              ) : relaciones.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay relaciones registradas
                  </td>
                </tr>
              ) : (
                relaciones.map((relacion) => {
                  const empresa = empresas.find(e => e.Id_Empresa === relacion.Id_Empresa_ES);
                  const sucursal = sucursales.find(s => s.Id_Sucursal === relacion.Id_Sucursal_ES);
                  
                  return (
                    <tr key={`${relacion.Id_Empresa}-${relacion.Id_Sucursal}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa?.Nombre_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{sucursal?.Nombre_Suc}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(relacion.Fecha_Apertura_ES).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {relacion.Fecha_Cierre_ES ? new Date(relacion.Fecha_Cierre_ES).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          relacion.Estado_ES === 'Activo' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {relacion.Estado_ES}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setRelacionEditar(relacion);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(relacion)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, relacion: null })}
        onConfirm={confirmDelete}
        itemName="la relación empresa-sucursal"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRelacionEditar(null);
        }}
        title={relacionEditar ? 'Editar Relación' : 'Nueva Relación'}
      >
        <EmpresaSucursalForm
          relacion={relacionEditar}
          empresas={empresas}
          sucursales={sucursales}
          onSubmit={async (data) => {
            try {
              let response;
              if (relacionEditar) {
                const formattedData = {
                  ...data,
                  Fecha_Apertura_ES: data.Fecha_Apertura_ES,
                  Fecha_Cierre_ES: data.Fecha_Cierre_ES || null
                };

                response = await fetch(
                  `/api/empresa-sucursal/${relacionEditar.Id_Empresa}/${relacionEditar.Id_Sucursal}`,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formattedData),
                  }
                );
              } else {
                response = await fetch('/api/empresa-sucursal', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
              }

              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(responseData.error || 'Error al guardar la relación');
              }

              showNotification(
                relacionEditar 
                  ? 'Relación actualizada correctamente'
                  : 'Relación creada correctamente'
              );
              setIsModalOpen(false);
              setRelacionEditar(null);
              await fetchData();
            } catch (error) {
              console.error('Error:', error);
              showNotification(error.message || 'Error al guardar la relación', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setRelacionEditar(null);
          }}
        />
      </Modal>
    </div>
  );
} 