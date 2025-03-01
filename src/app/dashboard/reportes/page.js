"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReportesPage() {
  // Estados para los filtros
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState("");
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [mostrarCalendarioInicio, setMostrarCalendarioInicio] = useState(false);
  const [mostrarCalendarioFin, setMostrarCalendarioFin] = useState(false);
  const [reporteGenerado, setReporteGenerado] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Datos de ejemplo para los selects
  const sucursales = [
    { id: 1, nombre: "Sucursal Central" },
    { id: 2, nombre: "Sucursal Norte" },
    { id: 3, nombre: "Sucursal Sur" },
  ];

  const almacenes = [
    { id: 1, nombre: "Almacén Principal", sucursalId: 1 },
    { id: 2, nombre: "Almacén Secundario", sucursalId: 1 },
    { id: 3, nombre: "Almacén Norte", sucursalId: 2 },
    { id: 4, nombre: "Almacén Sur", sucursalId: 3 },
  ];

  const productos = [
    { id: 1, nombre: "Laptop HP", codigo: "LP001" },
    { id: 2, nombre: "Monitor Dell", codigo: "MN002" },
    { id: 3, nombre: "Teclado Logitech", codigo: "TC003" },
    { id: 4, nombre: "Mouse Inalámbrico", codigo: "MS004" },
  ];

  // Datos de ejemplo para los reportes
  const datosMovimientos = [
    { id: 1, fecha: "2025-03-01", tipo: "Entrada", producto: "Laptop HP", cantidad: 10, almacen: "Almacén Principal" },
    { id: 2, fecha: "2025-03-02", tipo: "Salida", producto: "Monitor Dell", cantidad: 5, almacen: "Almacén Principal" },
    { id: 3, fecha: "2025-03-03", tipo: "Transferencia", producto: "Teclado Logitech", cantidad: 15, almacen: "Almacén Secundario" },
    { id: 4, fecha: "2025-03-04", tipo: "Entrada", producto: "Mouse Inalámbrico", cantidad: 20, almacen: "Almacén Principal" },
  ];

  const datosKardex = [
    { id: 1, fecha: "2025-03-01", tipo: "Entrada", cantidad: 10, saldo: 10, precioUnitario: 1200, total: 12000 },
    { id: 2, fecha: "2025-03-02", tipo: "Salida", cantidad: 2, saldo: 8, precioUnitario: 1200, total: 9600 },
    { id: 3, fecha: "2025-03-03", tipo: "Entrada", cantidad: 5, saldo: 13, precioUnitario: 1250, total: 16250 },
    { id: 4, fecha: "2025-03-04", tipo: "Salida", cantidad: 3, saldo: 10, precioUnitario: 1250, total: 12500 },
  ];

  const datosInventario = [
    { id: 1, codigo: "LP001", producto: "Laptop HP", stock: 10, almacen: "Almacén Principal", valorTotal: 12000 },
    { id: 2, codigo: "MN002", producto: "Monitor Dell", stock: 15, almacen: "Almacén Principal", valorTotal: 7500 },
    { id: 3, codigo: "TC003", producto: "Teclado Logitech", stock: 25, almacen: "Almacén Secundario", valorTotal: 2500 },
    { id: 4, codigo: "MS004", producto: "Mouse Inalámbrico", stock: 30, almacen: "Almacén Principal", valorTotal: 1500 },
  ];

  // Filtrar almacenes según la sucursal seleccionada
  const almacenesFiltrados = almacenes.filter(
    (almacen) => !sucursalSeleccionada || almacen.sucursalId === parseInt(sucursalSeleccionada)
  );

  // Función para generar reporte
  const generarReporte = () => {
    setReporteGenerado(true);
    // Aquí iría la lógica para obtener los datos reales del reporte
  };

  // Formatear fecha para mostrar
  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para formatear fecha para API
  const formatearFechaParaAPI = (fecha) => {
    return fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  // Función para exportar a Excel
  const exportarExcel = async (tipoReporte) => {
    try {
      setCargando(true);
      
      // Construir URL con parámetros según el tipo de reporte
      let url = `/api/inventario/reportes-prueba?formato=excel&tipo=${tipoReporte}`;
      
      // Realizar la solicitud para descargar el archivo
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error al generar el archivo Excel');
      }
      
      // Obtener el blob del archivo
      const blob = await response.blob();
      
      // Crear URL para el blob
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Crear un enlace temporal y hacer clic en él para descargar
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${tipoReporte}.xlsx`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      alert('Error al exportar a Excel. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  // Función para imprimir/exportar a PDF
  const exportarPDF = async (tipoReporte) => {
    setCargando(true);
    try {
      const response = await fetch(`/api/inventario/reportes-prueba?formato=pdf&tipo=${tipoReporte}`);
      
      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get('Content-Type');
      
      if (contentType && contentType.includes('text/html')) {
        // Si es HTML, abrir en una nueva ventana
        const htmlContent = await response.text();
        
        // Crear una nueva ventana y escribir el HTML
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(htmlContent);
          newWindow.document.close();
          newWindow.focus();
        } else {
          // Si el navegador bloquea la ventana emergente
          alert('Por favor, permita ventanas emergentes para ver el reporte PDF');
          
          // Alternativa: crear un blob y abrir en la misma ventana
          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
      } else if (contentType && contentType.includes('application/pdf')) {
        // Si es PDF, descargar como antes
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tipoReporte}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (contentType && contentType.includes('application/json')) {
        // Si es un error en formato JSON
        const errorData = await response.json();
        alert(errorData.message || 'Error al generar el PDF');
      } else {
        // Otro tipo de respuesta
        alert('No se pudo generar el PDF. Por favor, intente con Excel.');
      }
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
      alert('Error al generar el PDF. Por favor, intente con Excel.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Reportes del Sistema
      </h1>

      <Tabs defaultValue="movimientos" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="movimientos">Movimientos por Fecha</TabsTrigger>
          <TabsTrigger value="kardex">Kardex de Producto</TabsTrigger>
          <TabsTrigger value="inventario">Inventario General</TabsTrigger>
        </TabsList>

        {/* Reporte de Movimientos */}
        <TabsContent value="movimientos">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos por Rango de Fecha</CardTitle>
              <CardDescription>
                Consulta los movimientos de inventario por rango de fechas para una sucursal y almacén específicos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Selector de Fecha Inicio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha Inicio</label>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setMostrarCalendarioInicio(!mostrarCalendarioInicio)}
                    >
                      {formatearFecha(fechaInicio)}
                    </Button>
                    {mostrarCalendarioInicio && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border">
                        <Calendar
                          mode="single"
                          selected={fechaInicio}
                          onSelect={(date) => {
                            setFechaInicio(date);
                            setMostrarCalendarioInicio(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Selector de Fecha Fin */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha Fin</label>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setMostrarCalendarioFin(!mostrarCalendarioFin)}
                    >
                      {formatearFecha(fechaFin)}
                    </Button>
                    {mostrarCalendarioFin && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border">
                        <Calendar
                          mode="single"
                          selected={fechaFin}
                          onSelect={(date) => {
                            setFechaFin(date);
                            setMostrarCalendarioFin(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Selector de Sucursal */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sucursal</label>
                  <Select 
                    value={sucursalSeleccionada} 
                    onValueChange={setSucursalSeleccionada}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Sucursal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las Sucursales</SelectItem>
                      {sucursales.map((sucursal) => (
                        <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                          {sucursal.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selector de Almacén */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Almacén</label>
                  <Select 
                    value={almacenSeleccionado} 
                    onValueChange={setAlmacenSeleccionado}
                    disabled={!sucursalSeleccionada || sucursalSeleccionada === "todas"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los Almacenes</SelectItem>
                      {almacenesFiltrados.map((almacen) => (
                        <SelectItem key={almacen.id} value={almacen.id.toString()}>
                          {almacen.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                onClick={generarReporte}
              >
                Generar Reporte
              </Button>

              {reporteGenerado && (
                <div className="mt-8">
                  <Table>
                    <TableCaption>Reporte de Movimientos</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Almacén</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datosMovimientos.map((movimiento) => (
                        <TableRow key={movimiento.id}>
                          <TableCell>{movimiento.fecha}</TableCell>
                          <TableCell>{movimiento.tipo}</TableCell>
                          <TableCell>{movimiento.producto}</TableCell>
                          <TableCell>{movimiento.cantidad}</TableCell>
                          <TableCell>{movimiento.almacen}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => exportarExcel("movimientos")} disabled={cargando}>
                {cargando ? "Procesando..." : "Exportar a Excel"}
              </Button>
              <Button variant="outline" onClick={() => exportarPDF("movimientos")} disabled={cargando}>
                {cargando ? "Procesando..." : "Imprimir"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reporte de Kardex */}
        <TabsContent value="kardex">
          <Card>
            <CardHeader>
              <CardTitle>Kardex de Producto</CardTitle>
              <CardDescription>
                Consulta el kardex de un producto específico por rango de fechas en un almacén determinado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Selector de Producto */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Producto</label>
                  <Select 
                    value={productoSeleccionado} 
                    onValueChange={setProductoSeleccionado}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productos.map((producto) => (
                        <SelectItem key={producto.id} value={producto.id.toString()}>
                          {producto.nombre} ({producto.codigo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selector de Fecha Inicio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha Inicio</label>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setMostrarCalendarioInicio(!mostrarCalendarioInicio)}
                    >
                      {formatearFecha(fechaInicio)}
                    </Button>
                    {mostrarCalendarioInicio && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border">
                        <Calendar
                          mode="single"
                          selected={fechaInicio}
                          onSelect={(date) => {
                            setFechaInicio(date);
                            setMostrarCalendarioInicio(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Selector de Fecha Fin */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha Fin</label>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setMostrarCalendarioFin(!mostrarCalendarioFin)}
                    >
                      {formatearFecha(fechaFin)}
                    </Button>
                    {mostrarCalendarioFin && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border">
                        <Calendar
                          mode="single"
                          selected={fechaFin}
                          onSelect={(date) => {
                            setFechaFin(date);
                            setMostrarCalendarioFin(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Selector de Almacén */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Almacén</label>
                  <Select 
                    value={almacenSeleccionado} 
                    onValueChange={setAlmacenSeleccionado}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      {almacenes.map((almacen) => (
                        <SelectItem key={almacen.id} value={almacen.id.toString()}>
                          {almacen.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                onClick={generarReporte}
              >
                Generar Kardex
              </Button>

              {reporteGenerado && (
                <div className="mt-8">
                  <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Información del Producto</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Código:</p>
                        <p className="font-medium">LP001</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nombre:</p>
                        <p className="font-medium">Laptop HP</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Almacén:</p>
                        <p className="font-medium">Almacén Principal</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Stock Actual:</p>
                        <p className="font-medium">10 unidades</p>
                      </div>
                    </div>
                  </div>

                  <Table>
                    <TableCaption>Kardex del Producto</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio Unitario</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Saldo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datosKardex.map((movimiento) => (
                        <TableRow key={movimiento.id}>
                          <TableCell>{movimiento.fecha}</TableCell>
                          <TableCell>{movimiento.tipo}</TableCell>
                          <TableCell>{movimiento.cantidad}</TableCell>
                          <TableCell>Bs. {movimiento.precioUnitario.toFixed(2)}</TableCell>
                          <TableCell>Bs. {movimiento.total.toFixed(2)}</TableCell>
                          <TableCell>{movimiento.saldo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => exportarExcel("kardex")} disabled={cargando}>
                {cargando ? "Procesando..." : "Exportar a Excel"}
              </Button>
              <Button variant="outline" onClick={() => exportarPDF("kardex")} disabled={cargando}>
                {cargando ? "Procesando..." : "Imprimir"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reporte de Inventario */}
        <TabsContent value="inventario">
          <Card>
            <CardHeader>
              <CardTitle>Inventario General</CardTitle>
              <CardDescription>
                Consulta el inventario general con la cantidad de productos disponibles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Selector de Sucursal */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sucursal</label>
                  <Select 
                    value={sucursalSeleccionada} 
                    onValueChange={setSucursalSeleccionada}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Sucursal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las Sucursales</SelectItem>
                      {sucursales.map((sucursal) => (
                        <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                          {sucursal.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selector de Almacén */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Almacén</label>
                  <Select 
                    value={almacenSeleccionado} 
                    onValueChange={setAlmacenSeleccionado}
                    disabled={!sucursalSeleccionada || sucursalSeleccionada === "todas"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los Almacenes</SelectItem>
                      {almacenesFiltrados.map((almacen) => (
                        <SelectItem key={almacen.id} value={almacen.id.toString()}>
                          {almacen.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                onClick={generarReporte}
              >
                Generar Reporte
              </Button>

              {reporteGenerado && (
                <div className="mt-8">
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Productos</p>
                          <p className="text-3xl font-bold">80</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Valor Total</p>
                          <p className="text-3xl font-bold">Bs. 23,500</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Productos Críticos</p>
                          <p className="text-3xl font-bold">5</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableCaption>Inventario General</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Almacén</TableHead>
                        <TableHead>Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datosInventario.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.codigo}</TableCell>
                          <TableCell>{item.producto}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>{item.almacen}</TableCell>
                          <TableCell>Bs. {item.valorTotal.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => exportarExcel("inventario")} disabled={cargando}>
                {cargando ? "Procesando..." : "Exportar a Excel"}
              </Button>
              <Button variant="outline" onClick={() => exportarPDF("inventario")} disabled={cargando}>
                {cargando ? "Procesando..." : "Imprimir"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 