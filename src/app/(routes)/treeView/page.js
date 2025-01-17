"use client";

import { useState, useEffect } from "react";
import TreeView from "@/app/components/TreeView";

export default function TreeViewPage() {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await fetch("/api/treeView"); // Cambiar la ruta si es necesario
        if (!response.ok) throw new Error("Error al obtener los datos del Tree View");
        const data = await response.json();
        setTreeData(data);
      } catch (error) {
        console.error("Error al cargar el Tree View:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Árbol Jerárquico de Áreas</h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Cargando datos del Tree View...</span>
        </div>
      ) : (
        <TreeView data={treeData} />
      )}
    </div>
  );
}
