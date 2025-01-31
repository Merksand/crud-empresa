'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TreeItem from './TreeItem';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const menuItems = [
    {
      title: 'Empresas',
      path: '/clientes/empresas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Sucursales',
      path: '/clientes/sucursales',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'Empresa-Sucursal',
      path: '/clientes/empresa-sucursal',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      title: 'Información Empresa',
      path: '/clientes/informacion-empresa',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Estructuras',
      path: '/clientes/estructura',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: 'Area',
      path: '/clientes/area',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6h12m0 0l-4 4m4-4l-4-4" />
        </svg>
      ),
    },
    {
      title: 'Dependencias',
      path: '/clientes/dependencia',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: 'Tree view',
      path: '/clientes/treeView',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      )
    }
    
    ,
    {
      title: 'Cargo',
      path: '/clientes/cargo',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      title: 'Empleados',
      path: '/clientes/empleado-municipio',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zM16 11a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Empleado-Cargo',
      path: '/clientes/empleado-cargo',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-1a3 3 0 00-5.356-1.857M9 20H4v-1a3 3 0 015.356-1.857M16 3.13a4 4 0 110 7.747M7 3.13a4 4 0 110 7.747"
          />
        </svg>
      )
    }
  ];

  return (
    <>

      {/* Botón de toggle */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 transition-all duration-300 ${isOpen ? 'left-60' : 'left-4'
          } lg:hover:bg-gray-100 dark:bg-gray-800 dark:lg:hover:bg-gray-700 p-2 rounded-lg `}
      >
        {isOpen ? (
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'
          } z-40`}
      >

        <nav className={`flex flex-col h-full ${darkMode == true ? 'bg-gray-800 text-white' : 'bg-white text-black'} `}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent transition-opacity ${!isOpen && 'opacity-0'}`}>
              Gestión Empresarial
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 118.646 3.646 7 7 0 0020.354 15.354z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m8-8h1m-16 0H3m15.364-6.364l.707-.707m-12.728 0l-.707-.707m12.728 12.728l.707.707m-12.728 0l-.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>

            </h1>

          </div>


          <ul className="flex-1 py-4 space-y-1  ">
            {menuItems.map((item, index) => (
              <li key={index} className="px-2 select-none">
                {item.children ? (
                  <TreeItem item={item} isOpenSidebar={isOpen} />
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    <div className="min-w-[24px]">{item.icon}</div>
                    <span className={`transition-all duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                      {item.title}
                    </span>
                  </Link>
                )}
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
