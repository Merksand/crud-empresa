import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema de Gestión Empresarial",
  description: "CRUD para gestión de empresas y sucursales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className={`flex-1 transition-all duration-300 p-4`} style={{ marginLeft: '16rem' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
