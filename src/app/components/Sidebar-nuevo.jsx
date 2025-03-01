"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const navItems = [
  { title: "Dashboard", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Usuarios", href: "/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { title: "Mensajes", href: "/messages", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { title: "Reportes", href: "/reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { title: "Estadísticas", href: "/analytics", icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
];

const Sidebar = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen">
      <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} flex flex-col justify-between shadow-lg`}>
        <div className="flex items-center justify-between border-b p-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {isSidebarOpen && <span className="text-xl font-bold">Dashboard</span>}
        </div>
        <nav className="flex-1 overflow-auto p-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {isSidebarOpen && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 w-full rounded-md text-center bg-gray-200 dark:bg-gray-800">
            {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </button>
          <button className="mt-4 p-2 w-full bg-red-500 text-white rounded-md text-center">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <div className={`transition-all duration-300 flex-1 p-4 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Contenido principal aquí */}
      </div>
    </div>
  );
};

export default Sidebar;