'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Empresas',
      path: '/empresas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Sucursales',
      path: '/sucursales',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'Empresa-Sucursal',
      path: '/empresa-sucursal',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      title: 'Información Empresa',
      path: '/informacion-empresa',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Botón de toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 transition-all duration-300 ${
          isOpen ? 'left-60' : 'left-4'
        } lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700 p-2 rounded-lg`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-16'
        } z-40`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent transition-opacity ${!isOpen && 'opacity-0'}`}>
              Gestión Empresarial
            </h1>
          </div>
          
          <ul className="flex-1 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <li key={index} className="px-2">
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="min-w-[24px]">
                    {item.icon}
                  </div>
                  <span className={`transition-all duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style jsx global>{`
        main {
          margin-left: ${isOpen ? '16rem' : '4rem'} !important;
          transition: margin-left 0.3s ease-in-out;
        }
      `}</style>

      {/* Overlay para cerrar en móviles */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
