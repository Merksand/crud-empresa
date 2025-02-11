"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import CategoriaForm from "@/app/components/inventario/CategoriaForm";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, categoria: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventario/categoria");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      showNotification("Error al cargar las categorías", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (categoria) => {
    setDeleteModal({ show: true, categoria });
  };

  const handleDelete = async () => {
    try {
      if (!deleteModal.categoria) {
        throw new Error("No se seleccionó ninguna categoría para eliminar.");
      }
      const response = await fetch(`/api/inventario/categoria/${deleteModal.categoria.Id_Categoria}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar la categoría");
      }
      showNotification("Categoría eliminada correctamente");
      fetchCategorias();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setDeleteModal({ show: false, categoria: null });
    }
  };

  return (
    <div className="p-4">
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>{notification.message}</div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
        <button
          onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Categoría
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Categoría Padre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : categorias.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No hay categorías registradas</td>
                </tr>
              ) : (
                categorias.map((categoria) => (
                  <tr key={categoria.Id_Categoria} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{categoria.Id_Categoria}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{categoria.Nombre_Cat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{categoria.Id_Categoria_Padre_Cat || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{categoria.Estado_Cat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setCategoriaEditar(categoria);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(categoria)}
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
        onClose={() => setDeleteModal({ show: false, categoria: null })}
        onConfirm={handleDelete}
        itemName={`la categoría "${deleteModal.categoria?.Nombre_Cat}"`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCategoriaEditar(null);
        }}
        title={categoriaEditar ? "Editar Categoría" : "Nueva Categoría"}
      >
        <CategoriaForm
          categoria={categoriaEditar}
          categoriasPadre={categorias} // <-- Aquí se pasa la lista de categorías padre

          onSubmit={async (data) => {
            try {
              const method = categoriaEditar ? "PUT" : "POST";
              const url = categoriaEditar
                ? `/api/inventario/categoria/${categoriaEditar.Id_Categoria}`
                : "/api/inventario/categoria";

              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              showNotification(
                categoriaEditar
                  ? "Categoría actualizada correctamente"
                  : "Categoría creada correctamente"
              );
              fetchCategorias();
              setIsModalOpen(false);
              setCategoriaEditar(null);
            } catch (error) {
              showNotification("Error al guardar la categoría", "error");
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setCategoriaEditar(null);
          }}
        />
      </Modal>
    </div>
  );
}
