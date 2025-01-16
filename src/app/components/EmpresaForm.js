import { useState, useEffect } from "react";

export default function EmpresaForm({ empresa, onSubmit, onClose }) {
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    const [selectedPais, setSelectedPais] = useState("");
    const [selectedDepartamento, setSelectedDepartamento] = useState("");
    const [selectedProvincia, setSelectedProvincia] = useState("");
    const [selectedMunicipio, setSelectedMunicipio] = useState("");

    // Cargar países al inicio
    useEffect(() => {
        fetch("/api/paises")
            .then((res) => res.json())
            .then((data) => {
                setPaises(data);
                console.log("Paises cargados:", data);
            });
    }, []);

    // Cargar datos de la empresa al editar
    useEffect(() => {
        if (empresa) {
            console.log("Empresa recibida para editar:", empresa);
            setSelectedPais(empresa.Id_Pais || "");
            setSelectedDepartamento(empresa.Id_Departamento || "");
            setSelectedProvincia(empresa.Id_Provincia || "");
            setSelectedMunicipio(empresa.Sede_Emp || "");
        }
    }, [empresa]);

    // Cargar departamentos según el país seleccionado
    useEffect(() => {
        if (selectedPais) {
            fetch(`/api/departamentos?pais=${selectedPais}`)
                .then((res) => res.json())
                .then((data) => {
                    setDepartamentos(data);
                    console.log("Departamentos cargados:", data);
                });
        } else {
            setDepartamentos([]);
        }
        setSelectedDepartamento("");
        setSelectedProvincia("");
        setSelectedMunicipio("");
    }, [selectedPais]);

    // Cargar provincias según el departamento seleccionado
    useEffect(() => {
        if (selectedDepartamento) {
            fetch(`/api/provincias?departamento=${selectedDepartamento}`)
                .then((res) => res.json())
                .then((data) => {
                    setProvincias(data);
                    console.log("Provincias cargadas:", data);
                });
        } else {
            setProvincias([]);
        }
        setSelectedProvincia("");
        setSelectedMunicipio("");
    }, [selectedDepartamento]);

    // Cargar municipios según la provincia seleccionada
    useEffect(() => {
        if (selectedProvincia) {
            fetch(`/api/municipio?provincia=${selectedProvincia}`)
                .then((res) => res.json())
                .then((data) => {
                    setMunicipios(data);
                    console.log("Municipios cargados:", data);
                });
        } else {
            setMunicipios([]);
        }
        setSelectedMunicipio("");
    }, [selectedProvincia]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Nombre_Emp: e.target.nombre.value,
            Sede_Emp: selectedMunicipio,
            Fecha_Fundacion_Emp: e.target.fechaFundacion.value,
            Tipo_Emp: e.target.tipo.value,
        };
        console.log("Datos a enviar:", data);
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={empresa?.Nombre_Emp}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">País</label>
                <select
                    name="pais"
                    value={selectedPais}
                    onChange={(e) => setSelectedPais(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un país</option>
                    {paises.map((pais) => (
                        <option key={pais.Id_Pais} value={pais.Id_Pais}>
                            {pais.Nombre_Pai}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Departamento</label>
                <select
                    name="departamento"
                    value={selectedDepartamento}
                    onChange={(e) => setSelectedDepartamento(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map((dep) => (
                        <option key={dep.Id_Departamento} value={dep.Id_Departamento}>
                            {dep.Nombre_Dep}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Provincia</label>
                <select
                    name="provincia"
                    value={selectedProvincia}
                    onChange={(e) => setSelectedProvincia(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione una provincia</option>
                    {provincias.map((prov) => (
                        <option key={prov.Id_Provincia} value={prov.Id_Provincia}>
                            {prov.Nombre_Pro}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Municipio</label>
                <select
                    name="municipio"
                    value={selectedMunicipio}
                    onChange={(e) => setSelectedMunicipio(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="">Seleccione un municipio</option>
                    {municipios.map((mun) => (
                        <option key={mun.Id_Municipio} value={mun.Id_Municipio}>
                            {mun.Nombre_Mun}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Fecha Fundación</label>
                <input
                    type="date"
                    name="fechaFundacion"
                    defaultValue={empresa?.Fecha_Fundacion_Emp?.split("T")[0]}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                    name="tipo"
                    defaultValue={empresa?.Tipo_Emp || ""}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="S.A.">S.A.</option>
                    <option value="S.L.">S.L.</option>
                    <option value="Autónomo">Autónomo</option>
                </select>
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
                    {empresa ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
;