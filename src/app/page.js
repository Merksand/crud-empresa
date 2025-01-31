'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir al login si no hay sesión, de lo contrario al dashboard
    const user = localStorage.getItem("session"); // Puedes usar AuthContext también
    if (user) {
        router.push("/dashboard");
    } else {
        router.push("/auth/login");
    }
}, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Redirigiendo...</p>
      </div>
    </div>
  );
}
