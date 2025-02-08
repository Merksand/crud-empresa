'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Estado para abrir/cerrar el sidebar

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700     ${isOpen ? 'left-64' : 'left-4'}`}
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
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Contenedor del logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2">
              <img
                src="/img/logo2.jpg" // Ruta de tu logo
                alt="Logo"
                className={`h-20 transition-all duration-300 ${!isOpen ? 'w-10' : 'w-32'}`}
              />
            </div>
          </Link>
        </div>
      </aside>

      {/* Ajuste del contenido principal */}
      <style jsx global>{`
        main {
          margin-left: ${isOpen ? '16rem' : '4rem'} !important;
          transition: margin-left 0.3s ease-in-out;
        }
      `}</style>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}