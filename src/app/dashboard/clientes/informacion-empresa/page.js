'use client';

import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import InformacionEmpresaForm from '@/app/components/InformacionEmpresaForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function InformacionEmpresa() {
  const [informaciones, setInformaciones] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informacionEditar, setInformacionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, informacion: null });
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
      const [informacionesRes, empresasRes] = await Promise.all([
        fetch('/api/informacion-empresa'),
        fetch('/api/empresas'),
      ]);

      const [informacionesData, empresasData] = await Promise.all([
        informacionesRes.json(),
        empresasRes.json(),
      ]);

      setInformaciones(informacionesData);
      setEmpresas(empresasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      showNotification('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (informacion) => {
    setDeleteModal({ show: true, informacion });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/informacion-empresa/${deleteModal.informacion.Id_Empresa}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la información');
      }

      showNotification('Información eliminada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar la información', 'error');
    } finally {
      setDeleteModal({ show: false, informacion: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Información de Empresa</h1>
        <div className="flex items-center gap-4">
          {notification.show && (
            <div
              className={`px-4 py-2 rounded-lg ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
            >
              {notification.message}
            </div>
          )}
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
            Nueva Información
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Régimen Impositivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Zona Horaria
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
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
              ) : informaciones.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay información registrada
                  </td>
                </tr>
              ) : (
                informaciones.map((info) => {
                  const empresa = empresas.find((e) => e.Id_Empresa === info.Id_Empresa);

                  return (
                    <tr
                      key={info.Id_InformacionEmpresa}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empresa?.Nombre_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {info.Logo_IE ? (
                          <img
                            src={info.Logo_IE}
                            alt="Logo"
                            className="h-10 max-w-[100px] object-contain rounded-lg border dark:border-gray-600"
                            onError={(e) => (e.target.src = '/.png')}
                          />
                        ) : ( 
                          <span className="text-gray-500 italic">Sin logo</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {info.Regimen_Impositivo_IE}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{info.Zona_Horaria_IE}</td>
                      {/*<td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.Estado_IE === 'Activo'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}
                        >
                          {info.Estado_IE}
                        </span>
                      </td>
                      */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setInformacionEditar(info);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(info)}
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
        onClose={() => setDeleteModal({ show: false, informacion: null })}
        onConfirm={confirmDelete}
        itemName={`la información de ${empresas.find((e) => e.Id_Empresa === deleteModal.informacion?.Id_Empresa)?.Nombre_Emp ||
          'empresa desconocida'
          }`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInformacionEditar(null);
        }}
        title={informacionEditar ? 'Editar Información' : 'Nueva Información'}
      >
        <InformacionEmpresaForm
          informacion={informacionEditar}
          empresas={empresas}
          onSubmit={async (data) => {
            try {
              let response;
              if (informacionEditar) {
                response = await fetch(
                  `/api/informacion-empresa/${informacionEditar.Id_Empresa}`,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  }
                );
              } else {
                response = await fetch('/api/informacion-empresa', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
              }

              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(
                  responseData.error || 'Error al guardar la información'
                );
              }

              showNotification(
                informacionEditar
                  ? 'Información actualizada correctamente'
                  : 'Información creada correctamente'
              );
              setIsModalOpen(false);
              setInformacionEditar(null);
              fetchData();
            } catch (error) {
              console.error('Error:', error);
              showNotification(error.message || 'Error al guardar la información', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setInformacionEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
