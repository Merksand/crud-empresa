'use client';

import { useState, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import ProductoForm from '@/app/components/inventario/ProductoForm';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal';
import Notification from '@/app/components/Notification';
import useNotification from '@/app/hooks/useNotification';

export default function Producto() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [industrias, setIndustrias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, producto: null });
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    fetchData();
  }, []);


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

    // console.log("Pene: ",productos)
    console.log(deleteModal.producto.Id_Producto)

    try {
      const response = await fetch(`/api/inventario/producto/${deleteModal.producto.Id_Producto}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el producto');
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
      {notification.show && <Notification message={notification.message} type={notification.type} />}
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
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Modelo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unidad Medida</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">Cargando...</td>
                </tr>
              ) : productos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No hay productos registrados</td>
                </tr>
              ) : (
                productos.map((producto) => {
                  // console.log(producto)
                  return (
                    <tr key={producto.Id_Producto}>
                      <td className="px-6 py-4 text-sm">{producto.Nombre_Pro}</td>
                      <td className="px-6 py-4 text-sm">{producto.Modelo_Pro}</td>
                      <td className="px-6 py-4 text-sm">{producto.Unidad_medida_Pro}</td>
                      <td className="px-6 py-4 text-sm">
                        <img src={producto.Foto_Pro} width={100} ></img>
                      </td>
                      <td className="px-6 py-4 text-left text-sm">
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
                  )
                }
                )
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
          onSubmit={async (data) => {
            try {

              console.log(data)
              // console.log(productoEditar.Id_Producto)
              let response;
              if (productoEditar) {
                response = await fetch(`/api/inventario/producto/${productoEditar.Id_Producto}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });

                // const responseData = await response.json();

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
