import { Geist } from "next/font/google";
import "@/app/globals.css";


export const metadata = {
  title: "Sistema de Gestión Empresarial",
  description: "CRUD para gestión de empresas y sucursales",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      <main className={`flex-1 transition-all duration-300 p-4`} style={{ marginLeft: '16rem' }}>
        {children}
      </main>
    </div>
  );
}
