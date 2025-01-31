'use client';
import '@/app/globals.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function CrearCuenta() {
    const [ci, setCi] = useState('');
    const [funcionario, setFuncionario] = useState(null);
    const [usuarioGenerado, setUsuarioGenerado] = useState('');
    const [passwordGenerado, setPasswordGenerado] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (errorMessage || successMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, successMessage]);

    const verificarPersona = async () => {
        if (!ci) {
            setErrorMessage('Por favor, ingresa un CI.');
            setFuncionario(null);
            return;
        }
        try {
            const response = await fetch(`/api/funcionarios/${ci}`);
            const data = await response.json();

            if (data.error) {
                setErrorMessage(data.error);
                setFuncionario(null);
                return;
            }

            if (data.length === 0) {
                setErrorMessage('No se encontró una funcionario con este CI.');
                setFuncionario(null);
                return;
            }

            const funcionario = data;
            console.log("PERSONA: ", funcionario);
            const usuario = `${funcionario.Nombre_Fun}${funcionario.Paterno_Fun}`.toLowerCase();
            const password = Math.random().toString(36).slice(-8) + '!@#';

            setFuncionario(funcionario);
            setUsuarioGenerado(usuario);
            setPasswordGenerado(password);
            setErrorMessage('');

            console.log('Persona encontrada:', funcionario.Id_Funcionario);
            console.log('Usuario generado:', usuario);
            console.log('Contraseña generada:', password);
        } catch (error) {
            setErrorMessage('Error al verificar la funcionario.');
        }
    };

    const crearCuenta = async () => {
        try {
            console.log("PASSWORD YA HASH ", passwordGenerado);
            console.log("Dentro de try: ", funcionario.Id_Funcionario)
            const response = await fetch(`/api/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id_Funcionario: funcionario.Id_Funcionario,
                    Usuario: usuarioGenerado,
                    Password: passwordGenerado,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear la cuenta.');
            }

            setSuccessMessage('Cuenta creada correctamente.');
            setFuncionario(null);
            setUsuarioGenerado('');
            setPasswordGenerado('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-900 flex justify-center box-border">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex flex-col justify-between lg:w-1/2 xl:w-5/12 p-6 sm:p-10">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="h-12 ">
                                {errorMessage && (
                                    <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>


                            {successMessage && (
                                <div className="bg-green-500 text-white p-3 rounded-lg mb-2 text-center">
                                    {successMessage}
                                </div>
                            )}

                            <div className="mx-auto max-w-xs space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">C.I.</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={ci}
                                            onChange={(e) => setCi(e.target.value)}
                                            className="flex-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:border-green-400"
                                        />
                                        <button
                                            onClick={verificarPersona}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                        >
                                            Verificar
                                        </button>
                                    </div>
                                </div>

                                {funcionario && (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Nombre</label>
                                            <input
                                                type="text"
                                                value={funcionario.Nombre_Fun}
                                                readOnly
                                                className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Apellido</label>
                                            <input
                                                type="text"
                                                value={funcionario.Paterno_Fun}
                                                readOnly
                                                className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Usuario</label>
                                            <input
                                                type="text"
                                                value={usuarioGenerado}
                                                readOnly
                                                className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Contraseña</label>
                                            <input
                                                type="text"
                                                value={passwordGenerado}
                                                readOnly
                                                className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            onClick={crearCuenta}
                                            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                                        >
                                            Crear Cuenta
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-0 text-center ">
                        <a
                            href="/auth/login"
                            className="text-blue-500 hover:underline text-sm mb-9"
                        >
                            Iniciar Sesión
                        </a>{" "}
                        |{" "}
                        <a
                            href="/auth/resetPassword"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Olvidé mi contraseña
                        </a>
                    </div>
                </div>

                <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div
                        className="hidden lg:flex flex-1 bg-cover bg-center mb-16 box-border"
                        style={{ backgroundImage: "url('../img/logo2.svg')" }}
                    ></div>
                </div>
            </div>
        </div>
    );

}
