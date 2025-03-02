'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, FileDown, Printer } from "lucide-react";

export default function ReportesPage() {
  const [empresas, setEmpresas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estructuras, setEstructuras] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      fetchSucursalesPorEmpresa(selectedEmpresa);
      fetchEstructurasPorEmpresa(selectedEmpresa);
      fetchEmpleadosPorEmpresa(selectedEmpresa);
    } else {
      setSucursales([]);
      setEstructuras([]);
      setEmpleados([]);
    }
  }, [selectedEmpresa]);

  useEffect(() => {
    if (selectedEmpresa && selectedSucursal) {
      fetchEmpleadosPorSucursal(selectedEmpresa, selectedSucursal);
    }
  }, [selectedEmpresa, selectedSucursal]);

  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/empresas');
      if (!response.ok) throw new Error('Error al cargar empresas');
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudo cargar las empresas");
    } finally {
      setLoading(false);
    }
  };

  const fetchSucursalesPorEmpresa = async (empresaId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reportes/sucursales-por-empresa?empresaId=${empresaId}`);
      if (!response.ok) throw new Error('Error al cargar sucursales');
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudieron cargar las sucursales");
    } finally {
      setLoading(false);
    }
  };

  const fetchEstructurasPorEmpresa = async (empresaId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reportes/estructuras-por-empresa?empresaId=${empresaId}`);
      if (!response.ok) throw new Error('Error al cargar estructuras');
      const data = await response.json();
      setEstructuras(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudieron cargar las estructuras");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmpleadosPorEmpresa = async (empresaId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reportes/empleados-por-empresa?empresaId=${empresaId}`);
      if (!response.ok) throw new Error('Error al cargar empleados');
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudieron cargar los empleados");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmpleadosPorSucursal = async (empresaId, sucursalId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reportes/empleados-por-sucursal?empresaId=${empresaId}&sucursalId=${sucursalId}`);
      if (!response.ok) throw new Error('Error al cargar empleados por sucursal');
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudieron cargar los empleados por sucursal");
    } finally {
      setLoading(false);
    }
  };

  const exportarExcel = async (tipo) => {
    try {
      setExportLoading(true);
      let url = '';
      
      switch (tipo) {
        case 'sucursales':
          url = `/api/reportes/exportar?tipo=sucursales&empresaId=${selectedEmpresa}&formato=excel`;
          break;
        case 'estructuras':
          url = `/api/reportes/exportar?tipo=estructuras&empresaId=${selectedEmpresa}&formato=excel`;
          break;
        case 'empleados':
          url = `/api/reportes/exportar?tipo=empleados&empresaId=${selectedEmpresa}&formato=excel`;
          break;
        case 'empleados-sucursal':
          url = `/api/reportes/exportar?tipo=empleados-sucursal&empresaId=${selectedEmpresa}&sucursalId=${selectedSucursal}&formato=excel`;
          break;
        default:
          throw new Error('Tipo de reporte no válido');
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al exportar a Excel');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `reporte-${tipo}-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      
      alert("Éxito: Reporte exportado correctamente");
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudo exportar el reporte");
    } finally {
      setExportLoading(false);
    }
  };

  const imprimirPDF = async (tipo) => {
    try {
      setExportLoading(true);
      let url = '';
      
      switch (tipo) {
        case 'sucursales':
          url = `/api/reportes/exportar?tipo=sucursales&empresaId=${selectedEmpresa}&formato=pdf`;
          break;
        case 'estructuras':
          url = `/api/reportes/exportar?tipo=estructuras&empresaId=${selectedEmpresa}&formato=pdf`;
          break;
        case 'empleados':
          url = `/api/reportes/exportar?tipo=empleados&empresaId=${selectedEmpresa}&formato=pdf`;
          break;
        case 'empleados-sucursal':
          url = `/api/reportes/exportar?tipo=empleados-sucursal&empresaId=${selectedEmpresa}&sucursalId=${selectedSucursal}&formato=pdf`;
          break;
        default:
          throw new Error('Tipo de reporte no válido');
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al generar PDF');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Abrir en nueva pestaña
      window.open(downloadUrl, '_blank');
      
      alert("Éxito: PDF generado correctamente");
    } catch (error) {
      console.error('Error:', error);
      alert("Error: No se pudo generar el PDF");
    } finally {
      setExportLoading(false);
    }
  };

  const handleEmpresaChange = (value) => {
    setSelectedEmpresa(value);
    
    // Verificar que el valor no sea un ID generado aleatoriamente
    if (value && !value.startsWith('empresa-')) {
      fetchSucursalesPorEmpresa(value);
      fetchEstructurasPorEmpresa(value);
      fetchEmpleadosPorEmpresa(value);
    } else {
      // Limpiar datos si se selecciona una empresa sin ID válido
      setSucursales([]);
      setEstructuras([]);
      setEmpleados([]);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>
      
      <div className="mb-6">
        <Select value={selectedEmpresa} onValueChange={handleEmpresaChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Selecciona una empresa" />
          </SelectTrigger>
          <SelectContent>
            {empresas.map((empresa) => {
              const empresaId = empresa.id || empresa.idEmpresa || empresa.empresaId;
              const itemValue = empresaId ? empresaId.toString() : `empresa-${Math.random()}`;
              return (
                <SelectItem 
                  key={itemValue} 
                  value={itemValue}>
                  {empresa.Nombre_Emp || 'Empresa sin nombre'}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="sucursales" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="sucursales">Sucursales</TabsTrigger>
          <TabsTrigger value="estructuras">Estructuras</TabsTrigger>
          <TabsTrigger value="empleados">Empleados</TabsTrigger>
          <TabsTrigger value="empleados-sucursal">Empleados por Sucursal</TabsTrigger>
        </TabsList>
        
        {/* Tab: Sucursales por Empresa */}
        <TabsContent value="sucursales">
          <Card>
            <CardHeader>
              <CardTitle>Sucursales por Empresa</CardTitle>
              <CardDescription>
                Lista de sucursales pertenecientes a la empresa seleccionada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de sucursales</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Municipio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sucursales.length > 0 ? (
                      sucursales.map((sucursal) => (
                        <TableRow key={sucursal.id}>
                          <TableCell>{sucursal.id}</TableCell>
                          <TableCell>{sucursal.nombre}</TableCell>
                          <TableCell>{sucursal.direccion}</TableCell>
                          <TableCell>{sucursal.telefono}</TableCell>
                          <TableCell>{sucursal.municipio?.nombre || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          {selectedEmpresa ? "No hay sucursales para esta empresa" : "Selecciona una empresa para ver sus sucursales"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportarExcel('sucursales')}
                disabled={!selectedEmpresa || exportLoading || sucursales.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
                Exportar a Excel
              </Button>
              <Button 
                variant="default" 
                onClick={() => imprimirPDF('sucursales')}
                disabled={!selectedEmpresa || exportLoading || sucursales.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Printer className="h-4 w-4 mr-2" />}
                Imprimir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab: Estructuras por Empresa */}
        <TabsContent value="estructuras">
          <Card>
            <CardHeader>
              <CardTitle>Estructuras por Empresa</CardTitle>
              <CardDescription>
                Lista de estructuras pertenecientes a la empresa seleccionada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de estructuras</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Nivel</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estructuras.length > 0 ? (
                      estructuras.map((estructura) => (
                        <TableRow key={estructura.id}>
                          <TableCell>{estructura.id}</TableCell>
                          <TableCell>{estructura.nombre}</TableCell>
                          <TableCell>{estructura.descripcion}</TableCell>
                          <TableCell>{estructura.nivel}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          {selectedEmpresa ? "No hay estructuras para esta empresa" : "Selecciona una empresa para ver sus estructuras"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportarExcel('estructuras')}
                disabled={!selectedEmpresa || exportLoading || estructuras.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
                Exportar a Excel
              </Button>
              <Button 
                variant="default" 
                onClick={() => imprimirPDF('estructuras')}
                disabled={!selectedEmpresa || exportLoading || estructuras.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Printer className="h-4 w-4 mr-2" />}
                Imprimir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab: Empleados por Empresa */}
        <TabsContent value="empleados">
          <Card>
            <CardHeader>
              <CardTitle>Empleados por Empresa</CardTitle>
              <CardDescription>
                Lista de empleados pertenecientes a la empresa seleccionada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de empleados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Cargo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleados.length > 0 ? (
                      empleados.map((empleado) => (
                        <TableRow key={empleado.id}>
                          <TableCell>{empleado.id}</TableCell>
                          <TableCell>{empleado.nombre}</TableCell>
                          <TableCell>{empleado.apellido}</TableCell>
                          <TableCell>{empleado.email}</TableCell>
                          <TableCell>{empleado.telefono}</TableCell>
                          <TableCell>{empleado.cargo?.nombre || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          {selectedEmpresa ? "No hay empleados para esta empresa" : "Selecciona una empresa para ver sus empleados"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportarExcel('empleados')}
                disabled={!selectedEmpresa || exportLoading || empleados.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
                Exportar a Excel
              </Button>
              <Button 
                variant="default" 
                onClick={() => imprimirPDF('empleados')}
                disabled={!selectedEmpresa || exportLoading || empleados.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Printer className="h-4 w-4 mr-2" />}
                Imprimir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab: Empleados por Sucursal */}
        <TabsContent value="empleados-sucursal">
          <Card>
            <CardHeader>
              <CardTitle>Empleados por Sucursal</CardTitle>
              <CardDescription>
                Lista de empleados por sucursal de la empresa seleccionada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedSucursal} onValueChange={setSelectedSucursal} disabled={!selectedEmpresa || sucursales.length === 0}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Selecciona una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => {
                      const sucursalId = sucursal.id || sucursal.idSucursal || sucursal.sucursalId;
                      const itemValue = sucursalId ? sucursalId.toString() : `sucursal-${Math.random()}`;
                      
                      return (
                        <SelectItem 
                          key={itemValue} 
                          value={itemValue}>
                          {sucursal.nombre || 'Sucursal sin nombre'}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de empleados por sucursal</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Sucursal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleados.length > 0 && selectedSucursal ? (
                      empleados.map((empleado) => (
                        <TableRow key={empleado.id}>
                          <TableCell>{empleado.id}</TableCell>
                          <TableCell>{empleado.nombre}</TableCell>
                          <TableCell>{empleado.apellido}</TableCell>
                          <TableCell>{empleado.email}</TableCell>
                          <TableCell>{empleado.telefono}</TableCell>
                          <TableCell>{empleado.cargo?.nombre || 'N/A'}</TableCell>
                          <TableCell>{empleado.sucursal?.nombre || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          {!selectedEmpresa 
                            ? "Selecciona una empresa primero" 
                            : !selectedSucursal 
                              ? "Selecciona una sucursal para ver sus empleados" 
                              : "No hay empleados para esta sucursal"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportarExcel('empleados-sucursal')}
                disabled={!selectedEmpresa || !selectedSucursal || exportLoading || empleados.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
                Exportar a Excel
              </Button>
              <Button 
                variant="default" 
                onClick={() => imprimirPDF('empleados-sucursal')}
                disabled={!selectedEmpresa || !selectedSucursal || exportLoading || empleados.length === 0}
              >
                {exportLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Printer className="h-4 w-4 mr-2" />}
                Imprimir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 