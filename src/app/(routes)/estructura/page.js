"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import EstructuraForm from "@/app/components/EstructuraForm";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

function EstructuraPage() {
  const [estructuras, setEstructuras] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estructuraEditar, setEstructuraEditar] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    estructura: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [estructurasRes, empresasRes] = await Promise.all([
          fetch("/api/estructura"),
          fetch("/api/empresas"),
        ]);

        if (!estructurasRes.ok || !empresasRes.ok) {
          throw new Error("Error al obtener los datos");
        }

        const estructurasData = await estructurasRes.json();
        const empresasData = await empresasRes.json();

        setEstructuras(Array.isArray(estructurasData) ? estructurasData : []);
        setEmpresas(Array.isArray(empresasData) ? empresasData : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getEmpresaNombre = (id) => {
    const empresa = empresas.find((emp) => emp.Id_Empresa === id);
    return empresa ? empresa.Nombre_Emp : "No encontrada";
  };


  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleDelete = async (estructura) => {
    if (!estructura || !estructura.Id_Estructura) {
      console.error("Estructura inválida:", estructura);
      showNotification("Estructura inválida o ID no definido", "error");
      return;
    }
    setDeleteModal({ show: true, estructura });
  };

  const confirmDelete = async () => {
    try {
      if (!deleteModal.estructura || !deleteModal.estructura.Id_Estructura) {
        showNotification("Estructura inválida o ID no definido", "error");
        return;
      }

      const response = await fetch(
        `/api/estructura/${deleteModal.estructura.Id_Estructura}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar la estructura");
      }

      showNotification("Estructura eliminada correctamente");
      setDeleteModal({ show: false, estructura: null });
      setEstructuras(
        estructuras.filter(
          (estruc) =>
            estruc.Id_Estructura !== deleteModal.estructura.Id_Estructura
        )
      );
    } catch (error) {
      showNotification(
        error.message || "Error al eliminar la estructura",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="text-lg font-medium">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <span className="text-lg font-medium">Error: {error}</span>
      </div>
    );
  }

  return (
    <>
      {notification.show && (
        <div
          className={`fixed top-12 right-60 px-4 py-2 rounded shadow-lg z-50 ${notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}
        >
          {notification.message}
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Estructuras</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Nueva Estructura
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-gray-200 dark:divide-gray-700">
            <thead className="bg-slate-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha Creación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Resolución
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
              {estructuras.map((estructura) => {
                // console.log(estructura);
                return (
                  <tr
                    key={estructura.Id_Estructura}
                    className="hover:bg-slate-500"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {estructura.Id_Estructura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEmpresaNombre(estructura.Id_Empresa)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {estructura.Fecha_Creacion_Est
                        ? new Date(
                          estructura.Fecha_Creacion_Est
                        ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {estructura.Resolucion_Est}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estructura.Estado_Est === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {estructura.Estado_Est}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setEstructuraEditar(estructura);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(estructura)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <DeleteConfirmationModal
          isOpen={deleteModal.show}
          onClose={() => setDeleteModal({ show: false, estructura: null })}
          onConfirm={confirmDelete}
          itemName={`la estructura ${deleteModal.estructura?.Id_Estructura || "desconocida"
            }`}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEstructuraEditar(null);
          }}
          title={estructuraEditar ? "Editar Estructura" : "Nueva Estructura"}
        >
          <EstructuraForm
            estructura={estructuraEditar}
          
            onSubmit={async (data) => {
              console.log("Datos enviados Data estructura:", data);
              console.log("Estructura a editar:", estructuraEditar);
              try {
                let response;

                // Realizar PUT o POST según corresponda
                if (estructuraEditar) {
                  response = await fetch(
                    `/api/estructura/${estructuraEditar.Id_Estructura}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    }
                  );
                } else {
                  response = await fetch("/api/estructura", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                }

                const responseData = await response.json();
                console.log("Respuesta del servidor:", responseData);

                if (!response.ok) {
                  throw new Error(
                    responseData.error || "Error al guardar la estructura"
                  );
                }

                // Mostrar notificación adecuada
                showNotification(
                  estructuraEditar
                    ? "Estructura actualizada correctamente"
                    : "Estructura creada correctamente"
                );

                // Actualizar el estado y cerrar el modal
                setIsModalOpen(false);
                setEstructuraEditar(null);

                if (estructuraEditar) {
                  // Actualizar la estructura en el estado
                  const fetchUpdatedData = await fetch(
                    `/api/estructura/${estructuraEditar.Id_Estructura}`
                  );
                  const updatedData = await fetchUpdatedData.json();

                  setEstructuras((prevEstructuras) =>
                    prevEstructuras.map((estruc) =>
                      estruc.Id_Estructura === estructuraEditar.Id_Estructura
                        ? updatedData
                        : estruc
                    )
                  );
                } else {
                  // Obtener los datos recién creados para mantener consistencia
                  setEstructuras((prevEstructuras) => [
                    ...prevEstructuras,
                    responseData,
                  ]);
                }
              } catch (error) {
                console.error("Error al guardar la estructura:", error);
                showNotification(
                  error.message || "Error al guardar la estructura",
                  "error"
                );
              }
            }}
            onClose={() => {
              setIsModalOpen(false);
              setEstructuraEditar(null);
            }}
          />
        </Modal>
      </div>
    </>
  );
}

export default EstructuraPage;
