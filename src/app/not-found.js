// app/not-found.js
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <div className="text-center px-6 py-8 md:px-12 ">
        <h1 className="text-[21rem] font-bold animate-pulse">404</h1>
        <p className="text-2xl md:text-4xl font-semibold mt-4">
          ¡Vaya! La página que buscas no existe.
        </p>
        <p className="text-lg mt-4">
          Es posible que hayas escrito la URL incorrectamente, o que la página ya no esté disponible.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block mt-4 text-xl font-semibold px-8 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
        <div className="mt-12">
         
        </div>
      </div>
    </div>
  )
}
