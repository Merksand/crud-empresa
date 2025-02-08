import { Geist } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/app/components/Sidebar";
import Link from 'next/link';


export const metadata = {
  title: "Sistema de Gestión Empresarial",
  description: "CRUD para gestión de empresas y sucursales",
};

export default function RootLayout({ children }) {
  return (
    <span className = "bg-red-400 flex flex-col min-h-screen w-full">
      <Sidebar />
      {/* <main className={`flex-1 w-full  p-4  ml-10 `} style={{ marginLeft: '16rem' }}> */}
      <main className={`flex-1    p-4  `}>
        <nav className="mb-4 ml-5 bg-blue-600 inline-block p-2 rounded-lg active:bg-blue-800"><Link href="/dashboard">
        <button  >Dashboard</button></Link>
        </nav>
        {children}
      </main>
    </span>
  );
}
