"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/auth/login"); // Middleware decide si lo deja o lo manda al login
    }, [router]);

    return null;
}
