'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import ProveedorForm from '@/app/components/inventario/ProveedorForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function Proveedor() {
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, proveedor: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchProveedores();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchProveedores = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventario/proveedor');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
      showNotification('Error al cargar los proveedores', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (proveedor) => {
    setDeleteModal({ show: true, proveedor });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/inventario/proveedor/${deleteModal.proveedor.Id_Proveedor}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el proveedor');
      }
      
      showNotification('Proveedor eliminado correctamente');
      fetchProveedores();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar el proveedor', 'error');
    } finally {
      setDeleteModal({ show: false, proveedor: null });
    }
  };

  return (
    <div className="p-6">
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          Nuevo Proveedor
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Direccion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telefono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">Cargando...</td>
                </tr>
              ) : proveedores.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No hay proveedores registrados</td>
                </tr>
              ) : (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.Id_Proveedor} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{proveedor.Nombre_Prov}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{proveedor.Direccion_Prov}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{proveedor.Telefono_Prov}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{proveedor.Correo_Prov}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${proveedor.Estado_Prov === 'Activo'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                          }`}>
                          {proveedor.Estado_Prov}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setProveedorEditar(proveedor);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(proveedor)}
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
        onClose={() => setDeleteModal({ show: false, proveedor: null })}
        onConfirm={confirmDelete}
        itemName={`el proveedor "${deleteModal.proveedor?.Nombre_Prov}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProveedorEditar(null);
        }}
        title={proveedorEditar ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      >
        <ProveedorForm
          proveedor={proveedorEditar}
          onSubmit={async (data) => {
            try {
              if (proveedorEditar) {
                await fetch(`/api/inventario/proveedor/${proveedorEditar.Id_Proveedor}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Proveedor actualizado correctamente');
              } else {
                await fetch('/api/inventario/proveedor', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                showNotification('Proveedor creado correctamente');
              }
              setIsModalOpen(false);
              setProveedorEditar(null);
              fetchProveedores();
            } catch (error) {
              console.error('Error:', error);
              showNotification('Error al guardar el proveedor', 'error');
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setProveedorEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
