import Sidebar from '@/app/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[250px] p-4">
        {children}
      </div>
    </div>
  );
} 