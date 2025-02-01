import Link from 'next/link';
import SidebarDash from "@/app/components/SidebarDash";
import { FaUsers, FaBox, FaUserTie, FaCogs } from 'react-icons/fa'; // Importa los iconos que necesites

function HomeDash() {
  return (
    <>
      <SidebarDash />
      <div className="grid">
        {/* Nombre de usuario */}
        <div className="w-10 h-10 rounded-full justify-self-end bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
          Miguel
        </div>

        {/* Contenedor de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 p-6">
          {/* Clientes */}
          <Link href="/dashboard/clientes">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-blue-600">
                <FaUsers size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Clientes</h2>
              <p className="text-2xl font-bold text-blue-600">11</p>
            </div>
          </Link>

          {/* Inventario */}
          <Link href="/dashboard/inventario">
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-green-600">
                <FaBox size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Inventario</h2>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
          </Link>

          {/* Recursos Humanos */}
          <Link href="/dashboard/recursos-humanos">
            <div className="bg-purple-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-center text-purple-600">
                <FaUserTie size={40} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Recursos Humanos</h2>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
          </Link>

          {/* Producción */}
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