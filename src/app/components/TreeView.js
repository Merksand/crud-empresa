import { useState } from 'react';

const TreeItem = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="ml-4">
      {/* Nodo principal */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {/* Indicador de expansión */}
        {node.children.length > 0 && (
          <span className="text-sm font-bold">
            {expanded ? '-' : '+'}
          </span>
        )}
        {/* Información del nodo */}
        <div>
          <div className="font-semibold">
            {node.Nombre_Are || node.Nombre_Emp || "Nodo sin nombre"}
          </div>
          {node.Resolucion_Est && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {node.Resolucion_Est}
            </div>
          )}
        </div>
      </div>

      {/* Subnodos */}
      {expanded && node.children.length > 0 && (
        <ul className="ml-4 border-l border-gray-300 dark:border-gray-700">
          {node.children.map((child) => (
            <TreeItem
              key={child.Id_Area || `${child.Id_Empresa}-${child.Nombre_Are}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ data }) => {
  return (
    <ul className="space-y-2">
      {data.map((node) => (
        <TreeItem
          key={node.Id_Area || `${node.Id_Empresa}-${node.Nombre_Emp}`}
          node={node}
        />
      ))}
    </ul>
  );
};

export default TreeView;
