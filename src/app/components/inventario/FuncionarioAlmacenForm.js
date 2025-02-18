import { useState, useEffect } from "react";

export default function FuncionarioAlmacenForm({ asignacion, onSubmit, onClose }) {
    const [funcionarios, setFuncionarios] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [formData, setFormData] = useState({
        Id_Funcionario_FA: "",
        Id_Almacen_FA: "",
        Fecha_Inicio_FA: "",
        Fecha_Fin_FA: "",
        Puesto_FA: "",
    });

    // Cargar funcionarios y almacenes al montar el componente
    useEffect(() => {
        fetchFuncionarios();
        fetchAlmacenes();
    }, []);

    // Cargar datos si es edición
    useEffect(() => {
        if (asignacion) {
            setFormData({
                Id_Funcionario_FA: asignacion.Id_Funcionario_FA,
                Id_Almacen_FA: asignacion.Id_Almacen_FA,
                Fecha_Inicio_FA: formatDate(asignacion.Fecha_Inicio_FA),
                Fecha_Fin_FA: asignacion.Fecha_Fin_FA ? formatDate(asignacion.Fecha_Fin_FA) : "",
                Puesto_FA: asignacion.Puesto_FA,
            });
        }
    }, [asignacion]);

    const fetchFuncionarios = async () => {
        try {
            const response = await fetch("/api/inventario/funcionario");
            const data = await response.json();
            setFuncionarios(data);
        } catch (error) {
            console.error("Error al cargar funcionarios:", error);
        }
    };

    const fetchAlmacenes = async () => {
        try {
            const response = await fetch("/api/inventario/almacen");
            const data = await response.json();
            setAlmacenes(data);
        } catch (error) {
            console.error("Error al cargar almacenes:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Funcionario</label>
                <select
                    name="Id_Funcionario_FA"
                    value={formData.Id_Funcionario_FA}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un funcionario</option>
                    {funcionarios.map((funcionario) => (
                        <option key={funcionario.Id_Funcionario} value={funcionario.Id_Funcionario}>
                            {`${funcionario.Nombre_Fun} ${funcionario.Apellido_Fun}`}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Almacén</label>
                <select
                    name="Id_Almacen_FA"
                    value={formData.Id_Almacen_FA}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un almacén</option>
                    {almacenes.map((almacen) => (
                        <option key={almacen.Id_Almacen} value={almacen.Id_Almacen}>
                            {almacen.Nombre_Alm}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Puesto</label>
                <input
                    type="text"
                    name="Puesto_FA"
                    value={formData.Puesto_FA}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
                <input
                    type="date"
                    name="Fecha_Inicio_FA"
                    value={formData.Fecha_Inicio_FA}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
                <input
                    type="date"
                    name="Fecha_Fin_FA"
                    value={formData.Fecha_Fin_FA}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {asignacion ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
