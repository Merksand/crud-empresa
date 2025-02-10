import { useState, useEffect } from "react";

export default function SucursalForm({ sucursal, empresas, onSubmit, onClose }) {
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (sucursal) {
      setSelectedEmpresa(sucursal.Id_Empresa_Suc || "");
      setEstado(sucursal.Estado_Suc || "Activo");
    }
  }, [sucursal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Id_Empresa_Suc: selectedEmpresa,
      Nombre_Parametro_Suc: e.target.parametro.value,
      Nombre_Suc: e.target.nombre.value,
      Estado_Suc: estado,
    };
    onSubmit(data);
  };
  // console.log(sucursal) 
  // sucursal.map((suc) => (
  //   console.log("aden" +  suc)
  // ))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
       
      </div>


    </form>
  );
}
