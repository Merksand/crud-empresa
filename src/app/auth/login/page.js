"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("DATOS ENVIADOS, ", username, password);

    try {
      // Realiza la petición al endpoint de autenticación
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.error || "Usuario o contraseña incorrectos");
      }

      // Redirige al dashboard después de un inicio de sesión exitoso
      router.push("/personas");
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full p-2"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/auth/crearCuenta"
            className="text-blue-500 hover:underline text-sm"
          >
            Crear cuenta
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
    </div>
  );
}
