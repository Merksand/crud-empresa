'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    {
      title: 'Empresas',
      path: '/empresas'
    },
    {
      title: 'Sucursales',
      path: '/sucursales'
    },
    {
      title: 'Empresa-Sucursal',
      path: '/empresa-sucursal'
    },
    {
      title: 'Información Empresa',
      path: '/informacion-empresa'
    }
  ];

  return (
    <div className="sidebar bg-white dark:bg-gray-800 p-4 fixed h-full">
      <h1 className="text-xl font-bold mb-6">Gestión Empresarial</h1>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.path}
                className={`block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                  ${pathname === item.path ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 