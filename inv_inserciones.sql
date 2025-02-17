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
('Electrodomésticos', 0, 1),
('Móviles', 1, 1),
('Computación', 0, 1),
('Ropa Deportiva', 0, 1),
('Accesorios', 4, 1);

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
(1001, 1, 1, 2, '1234567890123', 'Refrigerador', 'SAMSUNG-XR200', 'Refrigerador No Frost', 'Unidad', 10, 50, 'https://example.com/images/refrigerador.jpg', '{}', 'AC'),
(1002, 2, 1, 2, '7894561230123', 'Teléfono Móvil', 'SAMSUNG-GALAXY S21', 'Smartphone de última generación', 'Unidad', 5, 30, 'https://example.com/images/galaxy-s21.jpg', '{}', 'AC'),
(1003, 3, 2, 2, '3216549870123', 'Laptop', 'LG-ULTRA15', 'Laptop ultradelgada', 'Unidad', 5, 20, 'https://example.com/images/lg-laptop.jpg', '{}', 'AC'),
(1004, 4, 3, 3, '9876543210123', 'Zapatillas', 'NIKE-AIRMAX', 'Zapatillas deportivas', 'Par', 15, 60, 'https://example.com/images/nike-airmax.jpg', '{}', 'AC'),
(1005, 5, 4, 3, '1237896540123', 'Gorra', 'ADIDAS-CAP', 'Gorra deportiva', 'Unidad', 20, 80, 'https://example.com/images/adidas-cap.jpg', '{}', 'AC');

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

