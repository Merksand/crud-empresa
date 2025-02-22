'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
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
      title: 'Inv. Sucursal',
      path: '/dashboard/inventario/sucursal',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H2a3 3 0 00-3 3v2h5v4h14v-4z" />
        </svg>
      )
    },
    {
      title: 'Inv. Industria',
      path: '/dashboard/inventario/industria',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Inv. Almacen',
      path: '/dashboard/inventario/almacen',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10a2 2 0 002 2h14a2 2 0 002-2M3 10V8a2 2 0 012-2h4a2 2 0 012 2v2M3 10h4v2-2z" />
        </svg>
      )
    },
    {
      title: 'Inv. Categoria',
      path: '/dashboard/inventario/categoria',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },

    {
      title: 'Marca',
      path: '/dashboard/inventario/marca',
      icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
      )
  },
  {

    title: 'Proveedor',
    path: '/dashboard/inventario/proveedor',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M9 3h6m-7 8h8m-9 4h10m-11 4h12" />
      </svg>
    )
  },

  {
    title: 'Producto',
    path: '/dashboard/inventario/producto',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1-2a2 2 0 012-1h12a2 2 0 012 1l1 2m-18 0h18m-18 0l2 9a2 2 0 002 2h8a2 2 0 002-2l2-9M5 19h14" />
      </svg>
    )
  },
  {
    title: 'Funcionario',
    path: '/dashboard/inventario/funcionario',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: 'funcionarioAlmacen',
    path: '/dashboard/inventario/funcionarioAlmacen',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Inventario',
    path: '/dashboard/inventario/inventario',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: 'Tipo movimiento',
    path: '/dashboard/inventario/tipoMovimiento',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )

  },
  {
    title: 'Metodo Valoracion',
    path: '/dashboard/inventario/metodoValoracion',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10H9m3-3v6m0-6V4" />
      </svg>
    )
  },
  {
    title: 'Movimiento Inventario',
    path: '/dashboard/inventario/movimientoInventario',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  },
  {
    title: "Inventario Bajas",
    path: '/dashboard/inventario/bajas',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M10 14h4M4 18h16" />
      </svg>
    )
  },

  {
    title: 'Devoluciones',
    path: '/dashboard/inventario/devolucion',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h16M4 9l4 4m-4-4l4-4m12 6v6a2 2 0 01-2 2h-6m6-8l-4 4m4-4l-4-4" />
      </svg>
    )
},

  {
    title: "Lotes",
    path: '/dashboard/inventario/lote',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1.293-1.293a1 1 0 011.414 0L12 15.586l6.293-6.293a1 1 0 011.414 0L21 10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
},

{
  title: "Lote Productos",
  path: '/dashboard/inventario/loteProducto',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-9 5h9" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  )
},

{
  title: "Monedas",
  path: '/dashboard/inventario/moneda',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4l2 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
},

{
  title: "Tipo de Cambio",
  path: '/dashboard/inventario/tipoCambio',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V4m0 0L8 8m4-4l4 4m-4 8v4m0 0l4-4m-4 4l-4-4M4 12h16" />
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

              </li>
            ))}
          </ul>

        </nav>
      </aside>

      <style jsx global>{`
        main {
          margin-left: ${isOpen ? '8rem' : '1rem'} !important;
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
