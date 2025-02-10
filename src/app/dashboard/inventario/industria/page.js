"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import IndustriaForm from "@/app/components/IndustriaForm";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function Industrias() {
    const [industrias, setIndustrias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [industriaEditar, setIndustriaEditar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, industria: null });
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    // Cargar industrias al inicializar
    useEffect(() => {
        fetchIndustrias();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    const fetchIndustrias = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/inventario/industria");
            const data = await response.json();
            setIndustrias(data);
        } catch (error) {
            console.error("Error al cargar industrias:", error);
            showNotification("Error al cargar las industrias", "error");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (industria) => {
        setDeleteModal({ show: true, industria });
    };

    const handleDelete = async () => {
        try {
            if (!deleteModal.industria) {
                throw new Error("No se seleccionó ninguna industria para eliminar.");
            }
            const response = await fetch(`/api/inventario/industria/${deleteModal.industria.Id_Industria}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error al eliminar la industria");
            }
            showNotification("Industria eliminada correctamente");
            fetchIndustrias();
        } catch (error) {
            showNotification(error.message, "error");
        } finally {
            setDeleteModal({ show: false, industria: null });
        }
    };

    return (
        <div className="p-4">
            {/* Notificaciones */}
            {notification.show && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        }`}
                >
                    {notification.message}
                </div>
            )}
            {/* Encabezado */}
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Inventario de Industrias</h1>
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
                    Nueva Industria
                </button>
            </div>
            {/* Tabla */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Nombre
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
                                    <td colSpan="3" className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                            <span className="ml-2">Cargando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : industrias.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                        No hay industrias registradas
                                    </td>
                                </tr>
                            ) : (
                                industrias.map((industria) => {
                                    return (
                                        <tr key={industria.Id_Industria} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{industria.Nombre_Ind}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{industria.Estado_Pai}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => {
                                                        setIndustriaEditar(industria);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(industria)}
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
            {/* Modal de confirmación para eliminar */}
            <DeleteConfirmationModal
                isOpen={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, industria: null })}
                onConfirm={handleDelete}
                itemName={`la industria "${deleteModal.industria?.Nombre_Ind}"`}
            />
            {/* Modal de formulario */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setIndustriaEditar(null);
                }}
                title={industriaEditar ? "Editar Industria" : "Nueva Industria"}
            >
                <IndustriaForm
                    industria={industriaEditar}
                    onSubmit={async (data) => {
                        try {
                            const method = industriaEditar ? "PUT" : "POST"; // Determina si es creación o actualización
                            const url = industriaEditar
                                ? `/api/inventario/industria/${industriaEditar.Id_Industria}` // URL para actualizar
                                : "/api/inventario/industria"; // URL para crear
                            await fetch(url, {
                                method, // Usa el método dinámico
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(data),
                            });
                            showNotification(
                                industriaEditar
                                    ? "Industria actualizada correctamente"
                                    : "Industria creada correctamente"
                            );
                            fetchIndustrias(); // Actualiza la lista de industrias
                            setIsModalOpen(false); // Cierra el modal
                            setIndustriaEditar(null); // Limpia el estado de edición
                        } catch (error) {
                            showNotification("Error al guardar la industria", "error");
                        }
                    }}
                    onClose={() => {
                        setIsModalOpen(false);
                        setIndustriaEditar(null);
                    }}
                />
            </Modal>
        </div>
    );
}