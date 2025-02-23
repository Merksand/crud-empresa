use Bd_INVENTARIO_12022025_2;

-- Inserciones para TbInv_Sucursal
INSERT INTO TbInv_Sucursal (Id_Sucursal, Id_Empresa_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc) 
VALUES 
(1, 1, 'SCZ-CENTRO', 'Sucursal Central', 'AC'),
(2, 1, 'SCZ-NORTE', 'Sucursal Norte', 'AC'),
(3, 2, 'LPZ-SUR', 'Sucursal Sur', 'AC'),
(4, 2, 'CBBA-ESTE', 'Sucursal Este', 'AC'),
(5, 3, 'ORU-OESTE', 'Sucursal Oeste', 'AC');

-- Inserciones para TbInv_Industria
INSERT INTO TbInv_Industria (Nombre_Ind, Estado_Pai) 
VALUES 
('Alimentos', 'AC'),
('Electrónica', 'AC'),
('Textil', 'AC'),
('Automotriz', 'AC'),
('Farmacéutica', 'AC');

-- Inserciones para TbInv_Almacen
INSERT INTO TbInv_Almacen (Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, Estado_Alm) 
VALUES 
(1, 'Almacén Central', 'Av. Principal #123', 1000, 'AC'),
(2, 'Almacén Norte', 'Calle 45 #456', 800, 'AC'),
(3, 'Almacén Sur', 'Zona Industrial #789', 600, 'AC'),
(4, 'Almacén Este', 'Av. Colón #222', 500, 'AC'),
(5, 'Almacén Oeste', 'Calle 10 #333', 700, 'AC');

-- Inserciones para TbInv_Categoria
INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) 
VALUES 
('Electrodomésticos', 1, 'AC'),
('Móviles', 1, 'AC'),
('Computación', 1, 'AC'),
('Ropa Deportiva', 1, 'AC'),
('Accesorios', 4, 'AC');




-- Inserciones para TbInv_Marca
INSERT INTO TbInv_Marca (Nombre_Mar, Estado_Mar) 
VALUES 
('Samsung', 'AC'),
('LG', 'AC'),
('Nike', 'AC'),
('Adidas', 'AC'),
('Sony', 'AC');

-- Inserciones para TbInv_Proveedor
INSERT INTO TbInv_Proveedor (Nombre_Prov, Direccion_Prov, Telefono_Prov, Correo_Prov, Estado_Prov) 
VALUES 
('Distribuidora Bolivia', 'Av. Central #456', '78451236', 'contacto@distribo.com', 'AC'),
('Importaciones LP', 'Calle Comercio #123', '78563421', 'ventas@importlp.com', 'AC'),
('Mayoristas CBBA', 'Zona Industrial #222', '77451236', 'info@mayoristascbba.com', 'AC'),
('Farmacias Unidos', 'Av. Blanco Galindo #999', '76543218', 'contacto@farmunidos.com', 'AC'),
('Tienda Global', 'Calle 9 de Julio #333', '71234567', 'info@tiendaglobal.com', 'AC');

-- Inserciones para TbInv_Producto con URLs de imágenes
INSERT INTO TbInv_Producto (Id_Codigo_Pro, Id_Categoria_Pro, Id_marca_Pro, Id_Industria_Pro, Codigo_Barras_Pro, Nombre_Pro, Modelo_Pro, Descripcion_Pro, Unidad_medida_Pro, Stock_minimo_Pro, Stock_maximo_Pro, Foto_Pro, Atributo_Personalizados_Pro, Estado_pro)
VALUES 
(1001, 1, 1, 2, '1234567890123', 'Refrigerador', 'SAMSUNG-XR200', 'Refrigerador No Frost', 'Unidad', 10, 50, 'https://acortar.link/rSpXuZ', '{}', 'AC'),
(1002, 1, 1, 2, '7894561230123', 'Teléfono Móvil', 'SAMSUNG-GALAXY S21', 'Smartphone de última generación', 'Unidad', 5, 30, 'https://acortar.link/wsGsdH', '{}', 'AC'),
(1003, 1, 2, 2, '3216549870123', 'Laptop', 'LG-ULTRA15', 'Laptop ultradelgada', 'Unidad', 5, 20, 'https://acortar.link/YoTU16', '{}', 'AC'),
(1004, 1, 3, 3, '9876543210123', 'Zapatillas', 'NIKE-AIRMAX', 'Zapatillas deportivas', 'Par', 15, 60, 'https://acortar.link/Se3sPv', '{}', 'AC'),
(1005, 1, 4, 3, '1237896540123', 'Gorra', 'ADIDAS-CAP', 'Gorra deportiva', 'Unidad', 20, 80, 'https://acortar.link/vCz6AE', '{}', 'AC');

-- Inserciones para TbInv_Funcionario
INSERT INTO TbInv_Funcionario (Id_Persona_Fun, Nombre_Fun, Apellido_Fun, Cargo_Funcionario, Documento_Fun, Telefono_Fun, Correo_Fun, Estado_Fun)
VALUES 
(1, 'Juan', 'Perez', 'Gerente', '12345678', '78563214', 'juan.perez@email.com', 'AC'),
(2, 'Maria', 'Lopez', 'Vendedora', '87654321', '71234567', 'maria.lopez@email.com', 'AC'),
(3, 'Carlos', 'Gonzalez', 'Almacenero', '11223344', '75689123', 'carlos.gonzalez@email.com', 'AC'),
(4, 'Lucia', 'Fernandez', 'Supervisora', '99887766', '74567812', 'lucia.fernandez@email.com', 'AC'),
(5, 'Jose', 'Martinez', 'Repartidor', '55443322', '72123456', 'jose.martinez@email.com', 'AC');

-- Inserciones para TbInv_FuncionarioAlmacen
INSERT INTO TbInv_FuncionarioAlmacen (Id_Funcionario_FA, Id_Almacen_FA, Fecha_Inicio_FA, Fecha_Fin_FA, Puesto_FA, Estado_FA)
VALUES 
(3, 1, '2024-01-01', '2025-01-01', 'Encargado de Almacén', 'AC'),
(2, 2, '2023-12-01', '2024-12-01', 'Asistente de Almacén', 'AC'),
(1, 3, '2023-11-15', '2024-11-15', 'Supervisor de Inventario', 'AC'),
(4, 4, '2023-10-10', '2024-10-10', 'Gerente Logístico', 'AC'),
(5, 5, '2023-09-05', '2024-09-05', 'Auxiliar de Depósito', 'AC');

-- Inserciones para TbInv_Inventario
INSERT INTO TbInv_Inventario (Id_Producto_Inv, Id_Almacen_Inv, Cantidad_Inv, Estado_Inv)
VALUES 
(1, 1, 20, 'AC'),
(2, 2, 15, 'AC'),
(3, 3, 30, 'AC'),
(4, 4, 25, 'AC'),
(5, 5, 10, 'AC');

-- Inserciones para TbInv_TipoMovimiento
INSERT INTO TbInv_TipoMovimiento (Nombre_TiM, Codigo_TiM, Estado_TiM)
VALUES 
('Entrada', 101, 'AC'),
('Salida', 102, 'AC'),
('Transferencia', 103, 'AC'),
('Ajuste', 104, 'AC'),
('Devolución', 105, 'AC');

-- Inserciones para TbInv_MetodoValoracion
INSERT INTO TbInv_MetodoValoracion (Nombre_MeV, Descripcion_MeV, Estado_MeV)
VALUES 
('PEPS', 'Primeras Entradas, Primeras Salidas', 'AC'),
('UEPS', 'Últimas Entradas, Primeras Salidas', 'AC'),
('Promedio', 'Promedio Ponderado', 'AC'),
('Costo Específico', 'Método de Costo Específico', 'AC'),
('Valor Neto Realizable', 'Método de Valor Neto Realizable', 'AC');


-- Tabla: TbInv_MovimientoInventario
INSERT INTO TbInv_MovimientoInventario 
  (Id_TipoMovimiento_MoI, Id_Producto_MoI, Id_MetodoValoracion_MoI, Id_Inventario_MoI, Debito_MoI, Id_AlmacenOrigen_MoI, Id_AlmacenDestino_MoI, Cantidad_MoI, FechaMovimiento_MoI, Estado_MoI)
VALUES
  (1, 1, 1, 1, 0, 1, 2, 10, '2025-02-20 10:00:00', 'AC'),
  (2, 2, 2, 2, 1, 2, 3, 20, '2025-02-20 11:00:00', 'AC'),
  (1, 3, 1, 3, 0, 3, 4, 15, '2025-02-20 12:00:00', 'AC'),
  (3, 4, 3, 4, 1, 4, 5, 30, '2025-02-20 13:00:00', 'AC'),
  (2, 5, 2, 5, 0, 5, 1, 25, '2025-02-20 14:00:00', 'AC');

-- Tabla: TbInv_Bajas
INSERT INTO TbInv_Bajas 
  (Id_Movimiento_Baj, Motivo_Baj, Autorizacion_Baj, Fecha_Baj, Estado_Baj)
VALUES
  (1, 'Producto dañado', 'Autorizado por Jefe de Almacén', '2025-02-21 09:00:00', 'AC'),
  (2, 'Caducidad de producto', 'Autorizado por Gerente', '2025-02-21 10:00:00', 'AC'),
  (3, 'Exceso de inventario', 'Autorizado por Supervisor', '2025-02-21 11:00:00', 'AC'),
  (4, 'Error en registro', 'Autorizado por Control de Calidad', '2025-02-21 12:00:00', 'AC'),
  (5, 'Defecto en empaque', 'Autorizado por Jefe de Producción', '2025-02-21 13:00:00', 'AC');

-- Tabla: TbInv_Devoluciones
INSERT INTO TbInv_Devoluciones 
  (Id_Movimiento_Dev, Motivo_Dev, Autorizacion_Dev, Fecha_Dev, Estado_Dev)
VALUES
  (1, 'Cliente devolvió producto', 'Autorizado por Ventas', '2025-02-22 09:30:00', 'AC'),
  (2, 'Producto defectuoso', 'Autorizado por Servicio al Cliente', '2025-02-22 10:30:00', 'AC'),
  (3, 'Cambio de modelo', 'Autorizado por Gerente', '2025-02-22 11:30:00', 'AC'),
  (4, 'Error en pedido', 'Autorizado por Jefe de Ventas', '2025-02-22 12:30:00', 'AC'),
  (5, 'Producto no solicitado', 'Autorizado por Soporte', '2025-02-22 13:30:00', 'AC');

-- Tabla: TbInv_Ajustes
INSERT INTO TbInv_Ajustes 
  (Id_Movimiento_Aju, Motivo_Aju, FechaAju, Estado_Aju)
VALUES
  (1, 'Ajuste de inventario por conteo físico', '2025-02-23 09:00:00', 'AC'),
  (2, 'Corrección de registro de entrada', '2025-02-23 10:00:00', 'AC'),
  (3, 'Ajuste por diferencias de stock', '2025-02-23 11:00:00', 'AC'),
  (4, 'Rectificación de inventario', '2025-02-23 12:00:00', 'AC'),
  (5, 'Actualización de cantidades', '2025-02-23 13:00:00', 'AC');

-- Tabla: TbInv_Lote
INSERT INTO TbInv_Lote 
  (NroLote_Lot, Descripcion_Lot, CodigoBarras_Lot, FechaVencimiento_Lot, Estado_Lot)
VALUES
  (1001, 'Lote de productos electrónicos', '1234567890123', '2025-12-31', 'AC'),
  (1002, 'Lote de alimentos enlatados', '2345678901234', '2025-11-30', 'AC'),
  (1003, 'Lote de productos de limpieza', '3456789012345', '2025-10-31', 'AC'),
  (1004, 'Lote de bebidas', '4567890123456', '2026-01-15', 'AC'),
  (1005, 'Lote de accesorios', '5678901234567', '2025-09-30', 'AC');

-- Tabla: TbInv_LoteProductos
INSERT INTO TbInv_LoteProductos 
  (Id_Lote_LoP, Id_Producto_LoP, Cantidad_LoP, Estado_LoP)
VALUES
  (1, 1, 50, 'AC'),
  (2, 2, 100, 'AC'),
  (3, 3, 75, 'AC'),
  (4, 4, 60, 'AC'),
  (5, 5, 80, 'AC');

-- Tabla: TbInv_Moneda
INSERT INTO TbInv_Moneda 
  (Codigo_Mon, Nombre_Mon, Estado_Mon)
VALUES
  ('USD', 'Dólar estadounidense', 'AC'),
  ('EUR', 'Euro', 'AC'),
  ('GBP', 'Libra esterlina', 'AC'),
  ('JPY', 'Yen japonés', 'AC'),
  ('MXN', 'Peso mexicano', 'AC');

-- Tabla: TbInv_TipoCambio
INSERT INTO TbInv_TipoCambio 
  (Id_Moneda_TiC, Fecha_TiC, TasaCambio_TiC, Estado_TiC)
VALUES
  (1, '2025-02-20', 1.000000, 'AC'),
  (2, '2025-02-20', 0.900000, 'AC'),
  (3, '2025-02-20', 0.800000, 'AC'),
  (4, '2025-02-20', 110.000000, 'AC'),
  (5, '2025-02-20', 20.000000, 'AC');

-- Tabla: TbInv_OrdenesCompra
INSERT INTO TbInv_OrdenesCompra 
  (Id_Sucursal_OdC, Id_Proveedor_OdC, Id_Moneda_Odc, FechaOrden_OdC, Monto_OdC, Impuestos_OdC, Descuento_OdC, Sub_Total_OdC, TotalPagado_OdC, Estado_OdC)
VALUES
  (1, 1, 1, '2025-02-19', 1500.00, 180.00, 50.00, 1630.00, 1630.00, 'AC'),
  (2, 2, 2, '2025-02-18', 2000.00, 240.00, 100.00, 2140.00, 2140.00, 'AC'),
  (3, 3, 3, '2025-02-17', 2500.00, 300.00, 150.00, 2650.00, 2650.00, 'AC'),
  (4, 4, 4, '2025-02-16', 3000.00, 360.00, 200.00, 3160.00, 3160.00, 'AC'),
  (5, 5, 5, '2025-02-15', 3500.00, 420.00, 250.00, 3670.00, 3670.00, 'AC');

