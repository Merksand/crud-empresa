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
        fetch('/api/sucursales'),
      ]);

      const relacionesData = await relacionesRes.json();
      const empresasData = await empresasRes.json();
      const sucursalesData = await sucursalesRes.json();

      setRelaciones(relacionesData);
      setEmpresas(empresasData);
      setSucursales(sucursalesData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
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
      const response = await fetch(
        `/api/empresa-sucursal/${deleteModal.relacion.Id_Empresa_Sucursal}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const data = await response.json();
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th>Empresa</th>
                <th>Sucursal</th>
                <th>Fecha Apertura</th>
                <th>Fecha Cierre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">Cargando...</td>
                </tr>
              ) : relaciones.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No hay relaciones registradas</td>
                </tr>
              ) : (
                relaciones.map((relacion) => (
                  <tr key={relacion.Id_Empresa_Sucursal}>
                    <td>{empresas.find(e => e.Id_Empresa === relacion.Id_Empresa_ES)?.Nombre_Emp}</td>
                    <td>{sucursales.find(s => s.Id_Sucursal === relacion.Id_Sucursal_ES)?.Nombre_Suc}</td>
                    <td>{new Date(relacion.Fecha_Apertura_ES).toLocaleDateString()}</td>
                    <td>{relacion.Fecha_Cierre_ES ? new Date(relacion.Fecha_Cierre_ES).toLocaleDateString() : '-'}</td>
                    <td>{relacion.Estado_ES}</td>
                    <td>
                      <button onClick={() => { setRelacionEditar(relacion); setIsModalOpen(true); }}>Editar</button>
                      <button onClick={() => handleDelete(relacion)}>Eliminar</button>
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
        onClose={() => setDeleteModal({ show: false, relacion: null })}
        onConfirm={confirmDelete}
        itemName="la relación empresa-sucursal"
      />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setRelacionEditar(null); }} title="Relación">
        <EmpresaSucursalForm
          relacion={relacionEditar}
          empresas={empresas}
          sucursales={sucursales}
          onSubmit={fetchData}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
