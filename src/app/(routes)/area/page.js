"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import AreaForm from "@/app/components/AreaForm";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function Area() {
  const [areas, setAreas] = useState([]);
  const [estructura, setEstructura] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaEditar, setAreaEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, area: null });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Realiza las llamadas paralelas a las APIs
      const [areasRes, estructurasRes] = await Promise.all([
        fetch("/api/area"), // Endpoint para obtener las áreas básicas
        fetch("/api/estructura"), // Endpoint para obtener las estructuras
      ]);

      // Verificar si las respuestas son válidas
      if (!areasRes.ok || !estructurasRes.ok) {
        throw new Error("Error al obtener los datos de áreas y estructuras");
      }

      // Convertir las respuestas en JSON
      const areasData = await areasRes.json();
      const estructurasData = await estructurasRes.json();

      // Combinar las áreas con las estructuras
      const processedData = areasData.map((area) => {
        const estructura = estructurasData.find(
          (est) => est.Id_Estructura === area.Id_Estructura_Ar
        );
        return {
          ...area, // Datos básicos del área
          Resolucion_Est: estructura?.Resolucion_Est || "Sin resolución", // Resolución
        };
      });

      setEstructura(estructurasData);
      // setEstructura(43);

      console.log("Estructura Data: ", estructurasData);
      console.log("Estructura Data id: ", estructurasData.Id_estructura);
   
      setAreas(processedData);
    } catch (error) {
      console.error("Error al cargar las áreas y estructuras:", error);
      showNotification("Error al cargar las áreas y estructuras", "error");
    } finally {
      setLoading(false);
    }
  };
  console.log("Estructura afuera del fetch: ", estructura);




  const handleDelete = async (area) => {
    setDeleteModal({ show: true, area });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/area/${deleteModal.area.Id_Area}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar el área");
      }

      showNotification("Área eliminada correctamente");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Error al eliminar el área", "error");
    } finally {
      setDeleteModal({ show: false, area: null });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Áreas</h1>
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
          Nueva Área
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-70">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estructura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolución
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              ) : areas.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay áreas registradas
                  </td>
                </tr>
              ) : (
                areas.map((area) => {
                  console.log(area)
                  return (
                    <tr key={area.Id_Area} className="hover:bg-slate-500">
                      <td className="px-6 py-4 text-sm">
                        {area.Resolucion_Est}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {area.Fecha_Creacion_Ar
                          ? new Date(
                            area.Fecha_Creacion_Ar
                          ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm">{area.Nombre_Are}</td>
                      <td className="px-6 py-4 text-sm">
                        {area.Resolucion_Are}
                      </td>
                      <td className="px-6 py-4 text-sm">


                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${area.Estado_Are === "Activo"
                            ? "bg-green-700 text-green-300"
                            : "bg-red-800   text-red-300"
                            }`}
                        >
                          {area.Estado_Are}
                        </span>
                      </td>
                      <td className="px-6 float-right py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setAreaEditar(area);
                            setIsModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(area)}
                          className=" text-red-600 hover:text-red-900"
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
        onClose={() => setDeleteModal({ show: false, area: null })}
        onConfirm={confirmDelete}
        itemName={`el área ${deleteModal.area?.nombre_area || "desconocida"}`}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAreaEditar(null);
        }}
        title={areaEditar ? "Editar Área" : "Nueva Área"}
      >
        <AreaForm
          area={areaEditar}
          estructuras={estructura} // Pasa las estructuras como prop
          onSubmit={async (data) => {
            try {
              console.log("Área data de editar: ", data);
              let response;
              if (areaEditar) {
                response = await fetch(`/api/area/${areaEditar.Id_Area}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
              } else {
                response = await fetch("/api/area", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
              }

              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(
                  responseData.error || "Error al guardar el área"
                );
              }

              showNotification(
                areaEditar
                  ? "Área actualizada correctamente"
                  : "Área creada correctamente"
              );
              setIsModalOpen(false);
              setAreaEditar(null);
              fetchData(); // Actualiza la lista después de guardar
            } catch (error) {
              console.error("Error:", error);
              showNotification(
                error.message || "Error al guardar el área",
                "error"
              );
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setAreaEditar(null);
          }}
        />

      </Modal>
    </div>
  );
}
