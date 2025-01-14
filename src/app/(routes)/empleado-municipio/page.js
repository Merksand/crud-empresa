'use client';

import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import EmpleadoForm from '@/app/components/EmpleadoForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, empleado: null });
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
      const [empleadosRes, municipiosRes] = await Promise.all([
        fetch('/api/empleado-municipio'),
        fetch('/api/municipio'),
      ]);

      const [empleadosData, municipiosData] = await Promise.all([
        empleadosRes.json(),
        municipiosRes.json(),
      ]);

      setEmpleados(empleadosData);
      setMunicipios(municipiosData);
    } catch (error) {
      // console.error('Error al cargar datos:', error);
      showNotification('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (empleado) => {
    setDeleteModal({ show: true, empleado });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/empleado-municipio/${deleteModal.empleado.Id_Empleado}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el empleado');
      }

      showNotification('Empleado eliminado correctamente');
      fetchData();
    } catch (error) {
<<<<<<< HEAD
     // console.error('Error:', error);
=======
      // console.error('Error:', error);
>>>>>>> 337df1cdc70d5b93dbd977aae95076997d7c3db7
      showNotification(error.message || 'Error al eliminar el empleado', 'error');
    } finally {
      setDeleteModal({ show: false, empleado: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empleados</h1>
        <div className="flex items-center gap-4">
          {notification.show && (
            <div
              className={`px-4 py-2 rounded-lg ${
                notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
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
            Nuevo Empleado
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Municipio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  CI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
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
              ) : empleados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay empleados registrados
                  </td>
                </tr>
              ) : (
                empleados.map((empleado) => {
                  const municipio = municipios.find(
                    (m) => m.Id_Municipio === empleado.Id_Municipio_Emp
                  );

                  return (
                    <tr
                      key={empleado.Id_Empleado}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{municipio?.Nombre_Mun}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empleado.Nombre_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empleado.CI_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{empleado.Direccion_Emp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            empleado.Estado_Emp === 'Activo'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}
                        >
                          {empleado.Estado_Emp}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setEmpleadoEditar(empleado);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(empleado)}
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
        onClose={() => setDeleteModal({ show: false, empleado: null })}
        onConfirm={confirmDelete}
        itemName={`el empleado ${deleteModal.empleado?.Nombre_Emp || 'desconocido'}`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEmpleadoEditar(null);
        }}
        title={empleadoEditar ? 'Editar Empleado' : 'Nuevo Empleado'}
      >
        <EmpleadoForm
          empleado={empleadoEditar}
          municipios={municipios}
          onSubmit={async (data) => {
            try {
              let response;
              if (empleadoEditar) {
                response = await fetch(`/api/empleado-municipio/${empleadoEditar.Id_Empleado}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
              } else {
                response = await fetch('/api/empleado-municipio', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
              }

              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(responseData.error || 'Error al guardar el empleado');
              }

              showNotification(
                empleadoEditar
                  ? 'Empleado actualizado correctamente'
                  : 'Empleado creado correctamente'
              );
              setIsModalOpen(false);
              setEmpleadoEditar(null);
              fetchData();
            } catch (error) {
              // console.error('Error:', error);
              showNotification(error.message || 'Error al guardar el empleado', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setEmpleadoEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
