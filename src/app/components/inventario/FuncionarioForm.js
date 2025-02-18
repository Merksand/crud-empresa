import { useState, useEffect } from "react";

export default function FuncionarioForm({ funcionario, onSubmit, onClose }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cargo, setCargo] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        if (funcionario) {
            setNombre(funcionario.Nombre_Fun || "");
            setApellido(funcionario.Apellido_Fun || "");
            setCargo(funcionario.Cargo_Funcionario || "");
            setDocumento(funcionario.Documento_Fun || "");
            setTelefono(funcionario.Telefono_Fun || "");
            setCorreo(funcionario.Correo_Fun || "");
        }
    }, [funcionario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Nombre_Fun: nombre,
            Apellido_Fun: apellido,
            Cargo_Funcionario: cargo,
            Documento_Fun: documento,
            Telefono_Fun: telefono,
            Correo_Fun: correo,
            Estado_Fun: "AC", // Estado activo por defecto
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Apellido</label>
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Documento</label>
                <input
                    type="number"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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
                    {funcionario ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
