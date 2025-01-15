import { useState, useEffect } from "react";

export default function EmpresaForm({ empresa, onSubmit, onClose }) {
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    const [selectedPais, setSelectedPais] = useState(empresa?.Id_Pais || "");
    const [selectedDepartamento, setSelectedDepartamento] = useState(empresa?.Id_Departamento || "");
    const [selectedProvincia, setSelectedProvincia] = useState(empresa?.Id_Provincia || "");
    const [selectedMunicipio, setSelectedMunicipio] = useState(empresa?.Sede_Emp || "");
    const [nombrePais, setNombrePais] = useState("");

    // Cargar países
    useEffect(() => {
        fetch("/api/paises")
            .then((res) => res.json())
            .then(setPaises);
    }, []);

    // Cargar departamentos según el país seleccionado
    useEffect(() => {
        if (selectedPais) {
            fetch(`/api/departamentos?pais=${selectedPais}`)
                .then((res) => res.json())
                .then(setDepartamentos);
        } else {
            setDepartamentos([]);
        }
        setSelectedDepartamento("");
        setSelectedProvincia("");
        setMunicipios([]);
    }, [selectedPais]);

    // Cargar provincias según el departamento seleccionado
    useEffect(() => {
        if (selectedDepartamento) {
            fetch(`/api/provincias?departamento=${selectedDepartamento}`)
                .then((res) => res.json())
                .then(setProvincias);
        } else {
            setProvincias([]);
        }
        setSelectedProvincia("");
        setMunicipios([]);
    }, [selectedDepartamento]);

    // Cargar municipios según la provincia seleccionada
    useEffect(() => {
        if (selectedProvincia) {
            fetch(`/api/municipio?provincia=${selectedProvincia}`)
                .then((res) => res.json())
                .then(setMunicipios);
        } else {
            setMunicipios([]);
        }
        setSelectedMunicipio("");
    }, [selectedProvincia]);

    // Actualizar nombre del país según el municipio seleccionado
    useEffect(() => {
        if (selectedMunicipio) {
            const municipio = municipios.find((m) => m.Id_Municipio === parseInt(selectedMunicipio));
            if (municipio) {
                setNombrePais(municipio.Nombre_Pais); // `Nombre_Pais` debe venir en los datos del municipio
            }
        }
    }, [selectedMunicipio, municipios]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Nombre_Emp: formData.get("nombre"),
            Sede_Emp: parseInt(selectedMunicipio), // Guardar Id del Municipio
            Fecha_Fundacion_Emp: formData.get("fechaFundacion"),
            Tipo_Emp: formData.get("tipo"),
            Idioma_Emp: formData.get("idioma"),
        };
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
                    value={selectedPais}
                    onChange={(e) => setSelectedPais(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>
                        Seleccione un país
                    </option>
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
                    value={selectedDepartamento}
                    onChange={(e) => setSelectedDepartamento(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>
                        Seleccione un departamento
                    </option>
                    {departamentos.map((departamento) => (
                        <option key={departamento.Id_Departamento} value={departamento.Id_Departamento}>
                            {departamento.Nombre_Dep}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Provincia</label>
                <select
                    value={selectedProvincia}
                    onChange={(e) => setSelectedProvincia(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>
                        Seleccione una provincia
                    </option>
                    {provincias.map((provincia) => (
                        <option key={provincia.Id_Provincia} value={provincia.Id_Provincia}>
                            {provincia.Nombre_Pro}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Municipio</label>
                <select
                    value={selectedMunicipio}
                    onChange={(e) => setSelectedMunicipio(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                >
                    <option value="" disabled>
                        Seleccione un municipio
                    </option>
                    {municipios.map((municipio) => (
                        <option key={municipio.Id_Municipio} value={municipio.Id_Municipio}>
                            {municipio.Nombre_Mun}
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
                    <option value="" disabled>
                        Seleccione un tipo
                    </option>
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
