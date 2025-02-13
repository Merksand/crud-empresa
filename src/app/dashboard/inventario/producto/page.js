'use client';

import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import ProductoForm from '@/app/components/inventario/ProductoForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';

export default function Producto() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [industrias, setIndustrias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, producto: null });
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
      const [productosRes, categoriasRes, marcasRes, industriasRes] = await Promise.all([
        fetch('/api/inventario/producto'),
        fetch('/api/inventario/categoria'),
        fetch('/api/inventario/marca'),
        fetch('/api/inventario/industria'),
      ]);

      const [productosData, categoriasData, marcasData, industriasData] = await Promise.all([
        productosRes.json(),
        categoriasRes.json(),
        marcasRes.json(),
        industriasRes.json(),
      ]);

      setProductos(productosData);
      setCategorias(categoriasData);
      setMarcas(marcasData);
      setIndustrias(industriasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      showNotification('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (producto) => {
    setDeleteModal({ show: true, producto });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/productos/${deleteModal.producto.Id_Producto}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      showNotification('Producto eliminado correctamente');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al eliminar el producto', 'error');
    } finally {
      setDeleteModal({ show: false, producto: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modelo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidad Medida</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">Cargando...</td>
                </tr>
              ) : productos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No hay productos registrados</td>
                </tr>
              ) : (
                productos.map((producto) => (
                  <tr key={producto.Id_Producto}>
                    <td className="px-6 py-4 text-sm">{producto.Nombre_Pro}</td>
                    <td className="px-6 py-4 text-sm">{producto.Modelo_Pro}</td>
                    <td className="px-6 py-4 text-sm">{producto.Unidad_Medida_Pro}</td>
                    <td className="px-6 py-4 text-sm">{producto.Foto_Pro}</td>
                    <td className="px-6 py-4 text-sm">{producto.Estado_Pro}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => {
                          setProductoEditar(producto);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(producto)}
                        className="text-red-600 hover:text-red-900"
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
        onClose={() => setDeleteModal({ show: false, producto: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.producto?.Nombre_Pro || 'el producto'}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductoEditar(null);
        }}
        title={productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <ProductoForm
  producto={productoEditar}
  categorias={categorias}
  marcas={marcas}
  industrias={industrias}
  onSubmit={async (data) => { // <-- Aquí agregamos la función que faltaba
    try {
      let response;
      if (productoEditar) {
        response = await fetch(`/api/inventario/producto/${productoEditar.Id_Producto}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch('/api/inventario/producto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Error al guardar el producto');
      }

      showNotification(
        productoEditar
          ? 'Producto actualizado correctamente'
          : 'Producto creado correctamente'
      );
      setIsModalOpen(false);
      setProductoEditar(null);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al guardar el producto', 'error');
    }
  }}
  onClose={() => {
    setIsModalOpen(false);
    setProductoEditar(null);
  }}
  fetchData={fetchData}
/>

      </Modal>
    </div>
  );
}
