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

  // Separar los estados de carga para cada tipo de exportación
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [cargandoExcel, setCargandoExcel] = useState(false);
  const [cargandoPDF, setCargandoPDF] = useState(false);

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
    if (!selectedEmpresa) {
      console.error('Debe seleccionar una empresa');
      return;
    }
    
    // Usar el estado de carga específico para Excel
    setCargandoExcel(true);
    
    try {
      let url = `/api/reportes/exportar?tipo=${tipo || selectedSucursal}&empresaId=${selectedEmpresa}&formato=excel`;
      
      if ((tipo || selectedSucursal) === 'empleados-sucursal' && selectedSucursal) {
        url += `&sucursalId=${selectedSucursal}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al exportar: ${response.statusText}`);
      }
      
      // Obtener el blob del archivo
      const blob = await response.blob();
      
      // Crear URL para descargar
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `reporte-${tipo || selectedSucursal}-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    } finally {
      // Asegurarse de que solo se actualiza el estado de carga de Excel
      setCargandoExcel(false);
    }
  };

  const imprimirPDF = async (tipo) => {
    if (!selectedEmpresa) {
      console.error('Debe seleccionar una empresa');
      return;
    }
    
    // Usar el estado de carga específico para PDF
    setCargandoPDF(true);
    
    try {
      let url = `/api/reportes/exportar?tipo=${tipo || selectedSucursal}&empresaId=${selectedEmpresa}&formato=pdf`;
      
      if ((tipo || selectedSucursal) === 'empleados-sucursal' && selectedSucursal) {
        url += `&sucursalId=${selectedSucursal}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al exportar: ${response.statusText}`);
      }
      
      // Obtener el blob del archivo
      const blob = await response.blob();
      
      // Crear URL para descargar
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `reporte-${tipo || selectedSucursal}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    } finally {
      // Asegurarse de que solo se actualiza el estado de carga de PDF
      setCargandoPDF(false);
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
            {empresas.map((empresa) => (
              <SelectItem 
                key={empresa.Id_Empresa} 
                value={empresa.Id_Empresa.toString()}>
                {empresa.Nombre_Emp}
              </SelectItem>
            ))}
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
                      <TableCell>Nombre</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Municipio</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sucursales.length > 0 ? (
                      sucursales.map((sucursal) => (
                        <TableRow key={sucursal.Id_Sucursal}>
                          <TableCell>{sucursal.Nombre_Suc}</TableCell>
                          <TableCell>{sucursal.Estado_Suc}</TableCell>
                          <TableCell>{sucursal.municipio ? sucursal.municipio.Nombre_Mun : 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
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
                      <TableCell>Fecha de Creación</TableCell>
                      <TableCell>Resolución</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estructuras.length > 0 ? (
                      estructuras.map((estructura) => (
                        <TableRow key={estructura.Id_Estructura}>
                          <TableCell>{estructura.Fecha_Creacion_Est ? new Date(estructura.Fecha_Creacion_Est).toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell>{estructura.Resolucion_Est || 'N/A'}</TableCell>
                          <TableCell>{estructura.Estado_Est || 'N/A'}</TableCell>
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
                      <TableCell>Nombre</TableCell>
                      <TableCell>CI</TableCell>
                      <TableCell>Cargo</TableCell>
                      <TableCell>Sucursal</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleados.length > 0 ? (
                      empleados.map((empleado) => (
                        <TableRow key={empleado.Id_Empleado}>
                          <TableCell>{empleado.Nombre_Emp} {empleado.Paterno_Emp} {empleado.Materno_Emp}</TableCell>
                          <TableCell>{empleado.CI_Emp}</TableCell>
                          <TableCell>{empleado.cargo ? empleado.cargo.Nombre_Car : 'N/A'}</TableCell>
                          <TableCell>{empleado.sucursal.Nombre_Suc}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
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
                    {sucursales.map((sucursal) => (
                      <SelectItem 
                        key={sucursal.Id_Sucursal} 
                        value={sucursal.Id_Sucursal.toString()}>
                        {sucursal.Nombre_Suc}
                      </SelectItem>
                    ))}
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
                      <TableCell>Nombre</TableCell>
                      <TableCell>CI</TableCell>
                      <TableCell>Cargo</TableCell>
                      <TableCell>Sucursal</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleados.length > 0 && selectedSucursal ? (
                      empleados.map((empleado) => (
                        <TableRow key={empleado.Id_Empleado}>
                          <TableCell>{empleado.Nombre_Emp} {empleado.Paterno_Emp} {empleado.Materno_Emp}</TableCell>
                          <TableCell>{empleado.CI_Emp}</TableCell>
                          <TableCell>{empleado.cargo ? empleado.cargo.Nombre_Car : 'N/A'}</TableCell>
                          <TableCell>{empleado.sucursal.Nombre_Suc}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
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