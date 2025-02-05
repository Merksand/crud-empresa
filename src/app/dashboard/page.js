'use client';

import Link from 'next/link';
import SidebarDash from '@/app/components/SidebarDash';
import { useRouter } from 'next/navigation';
import { FaUsers, FaBox, FaUserTie, FaCogs, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

function HomeDash() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <SidebarDash />
      <div className="relative grid">
        {/* Icono de usuario */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <FaUserCircle
              size={40}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-10">
                <p className="text-gray-700 text-md">Miguel</p>
                <button
                  onClick={logout}
                  className="mt-2 w-full text-left text-red-600 hover:text-red-800 text-md"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 p-6 select-none">
          <Link href="/dashboard/clientes">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-blue-600">
                <FaUsers size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Clientes</h2>
              <p className="text-2xl font-bold text-blue-600">11</p>
            </div>
          </Link>
          <Link href="/dashboard/inventario">
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-green-600">
                <FaBox size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Inventario</h2>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
          </Link>
          <Link href="/dashboard/recursos-humanos">
            <div className="bg-purple-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-purple-600">
                <FaUserTie size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Recursos Humanos</h2>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
          </Link>
          <Link href="/dashboard/produccion">
            <div className="bg-orange-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-orange-600">
                <FaCogs size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Producción</h2>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomeDash;
