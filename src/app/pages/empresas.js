"use client";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import EmpresaForm from "../components/EmpresaForm";

export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [empresaEditar, setEmpresaEditar] = useState(null);

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await fetch("/api/empresas");
            const data = await response.json();
            setEmpresas(data);
        } catch (error) {
            console.error("Error al cargar empresas:", error);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (empresaEditar) {
                // Actualizar
                await fetch(`/api/empresas/${empresaEditar.Id_Empresa}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            } else {
                // Crear
                await fetch("/api/empresas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            }

            setIsModalOpen(false);
            setEmpresaEditar(null);
            fetchEmpresas();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (empresa) => {
        setEmpresaEditar(empresa);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
            try {
                await fetch(`/api/empresas/${id}`, {
                    method: "DELETE",
                });
                fetchEmpresas();
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Empresas</h1>
                <button
                    onClick={() => {
                        setEmpresaEditar(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Nueva Empresa
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Sede</th>
                            <th className="px-6 py-3 text-left">
                                Fecha Fundación
                            </th>
                            <th className="px-6 py-3 text-left">Tipo</th>
                            <th className="px-6 py-3 text-left">Estado</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa) => (
                            <tr
                                key={empresa.Id_Empresa}
                                className="border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4">
                                    {empresa.Id_Empresa}
                                </td>
                                <td className="px-6 py-4">
                                    {empresa.Nombre_Emp}
                                </td>
                                <td className="px-6 py-4">
                                    {empresa.Sede_Emp}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        empresa.Fecha_Fundacion_Emp
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {empresa.Tipo_Emp}
                                </td>
                                <td className="px-6 py-4">
                                    {empresa.Estado_Emp}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                        onClick={() => handleEdit(empresa)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() =>
                                            handleDelete(empresa.Id_Empresa)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEmpresaEditar(null);
                }}
                title={empresaEditar ? "Editar Empresa" : "Nueva Empresa"}
            >
                <EmpresaForm
                    empresa={empresaEditar}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEmpresaEditar(null);
                    }}
                />
            </Modal>
        </div>
    );
}
