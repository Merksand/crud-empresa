import Sidebar from "@/app/components/SidebarInventario";

export default function ReportesLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 transition-all duration-300 ml-20">
        {children}
      </main>
    </div>
  );
} 