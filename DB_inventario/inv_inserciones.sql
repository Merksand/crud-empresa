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
INSERT INTO TbInv_Industria (Nombre_Ind, Estado_Pai) VALUES
('Electrónica', 'AC'),
('Textil', 'AC'),
('Electrodomésticos', 'AC');



-- Inserciones para TbInv_Almacen
INSERT INTO TbInv_Almacen (Id_Sucursal_Alm, Nombre_Alm, Ubicacion_Alm, Capacidad_maxima_Alm, Estado_Alm) 
VALUES 
(1, 'Almacén Central', 'Av. Principal #123', 1000, 'AC'),
(2, 'Almacén Norte', 'Calle 45 #456', 800, 'AC'),
(3, 'Almacén Sur', 'Zona Industrial #789', 600, 'AC'),
(4, 'Almacén Este', 'Av. Colón #222', 500, 'AC'),
(5, 'Almacén Oeste', 'Calle 10 #333', 700, 'AC');

-- Categorías principales
INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) VALUES
('Electrónica', NULL, 'AC'),
('Textil', NULL, 'AC'),
('Electrodomésticos', NULL, 'AC');

-- Categorías finales (subcategorías sin más hijos)
-- Electrónica
INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) VALUES
('Celulares', 1, 'AC'),
('Televisores', 1, 'AC'),
('Computadoras', 1, 'AC'),
('Accesorios', 1, 'AC');

-- Textil
INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) VALUES
('Ropa', 2, 'AC'),
('Zapatos', 2, 'AC');

-- Electrodomésticos (directamente final, sin subcategorías)
INSERT INTO TbInv_Categoria (Nombre_Cat, Id_Categoria_Padre_Cat, Estado_Cat) VALUES
('Electrodomésticos', 3, 'AC');




-- Inserciones para TbInv_Marca
INSERT INTO TbInv_Marca (Nombre_Mar, Estado_Mar) VALUES
('Samsung', 'AC'),
('Apple', 'AC'),
('LG', 'AC'),
('Sony', 'AC'),
('Nike', 'AC'),
('Adidas', 'AC'),
('Puma', 'AC');

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
(1001, 4, 1, 1, '7891001234501', 'Samsung Galaxy S23', 'S23', 'Smartphone de alta gama', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Negro","Memoria":"256GB"}', 'AC'),
(1002, 4, 1, 1, '7891001234502', 'Samsung Galaxy A54', 'A54', 'Smartphone gama media', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Blanco","Memoria":"128GB"}', 'AC'),
(1003, 4, 2, 1, '7891001234503', 'iPhone 14', '14', 'Smartphone de última generación', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Rojo","Memoria":"256GB"}', 'AC'),
(1004, 4, 2, 1, '7891001234504', 'iPhone SE', 'SE', 'Smartphone compacto', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Azul","Memoria":"128GB"}', 'AC'),
(1005, 4, 3, 1, '7891001234505', 'LG Wing', 'Wing', 'Smartphone con pantalla rotativa', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Gris","Memoria":"256GB"}', 'AC'),
(1006, 4, 3, 1, '7891001234506', 'LG Velvet', 'Velvet', 'Smartphone elegante y potente', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Blanco","Memoria":"128GB"}', 'AC'),
(1007, 4, 4, 1, '7891001234507', 'Sony Xperia 1 IV', 'Xperia1IV', 'Smartphone para creadores de contenido', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Negro","Memoria":"256GB"}', 'AC'),
(1008, 4, 4, 1, '7891001234508', 'Sony Xperia 5 IV', 'Xperia5IV', 'Smartphone compacto y potente', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Verde","Memoria":"128GB"}', 'AC'),


(1009, 5, 1, 1, '7891001234509', 'Samsung QLED 55"', 'QLED55', 'Televisor QLED con resolución 4K', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","Tamaño":"55 pulgadas"}', 'AC'),
(1010, 5, 1, 1, '7891001234510', 'Samsung Crystal UHD 65"', 'UHD65', 'Televisor UHD económico', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","Tamaño":"65 pulgadas"}', 'AC'),
(1011, 5, 3, 1, '7891001234511', 'LG OLED C1 55"', 'OLED55C1', 'Televisor OLED con negros perfectos', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","HDR":"Dolby Vision"}', 'AC'),
(1012, 5, 3, 1, '7891001234512', 'LG NanoCell 75"', 'Nano75', 'Televisor NanoCell para colores vibrantes', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","HDR":"HDR10"}', 'AC'),
(1013, 5, 4, 1, '7891001234513', 'Sony Bravia XR 65"', 'Bravia65XR', 'Televisor con tecnología Cognitive Processor XR', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","HDR":"Dolby Vision"}', 'AC'),
(1014, 5, 4, 1, '7891001234514', 'Sony Bravia XR 77"', 'Bravia77XR', 'Televisor premium para cine en casa', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","Tamaño":"77 pulgadas"}', 'AC'),
(1015, 5, 1, 1, '7891001234515', 'Samsung The Frame 43"', 'Frame43', 'Televisor con diseño de cuadro artístico', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","Diseño":"Minimalista"}', 'AC'),
(1016, 5, 3, 1, '7891001234516', 'LG OLED G1 65"', 'OLED65G1', 'Televisor OLED ultrafino', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Resolución":"4K","Diseño":"Galería"}', 'AC'),




(1017, 6, 1, 1, '7891001234517', 'Samsung Galaxy Book3', 'Book3', 'Laptop ultradelgada', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Procesador":"Intel i7","RAM":"16GB"}', 'AC'),
(1018, 6, 1, 1, '7891001234518', 'Samsung Galaxy Chromebook', 'Chromebook', 'Chromebook rápida y ligera', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Pantalla":"13.3 pulgadas","SSD":"256GB"}', 'AC'),
(1019, 6, 2, 1, '7891001234519', 'MacBook Air M1', 'MBAirM1', 'Laptop ligera con chip M1', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"RAM":"8GB","SSD":"256GB"}', 'AC'),
(1020, 6, 2, 1, '7891001234520', 'MacBook Pro M2', 'MBProM2', 'Laptop potente para profesionales', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"RAM":"16GB","SSD":"512GB"}', 'AC'),
(1021, 6, 3, 1, '7891001234521', 'LG Gram 16"', 'Gram16', 'Laptop ultraligera con pantalla grande', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Peso":"1.2kg","Batería":"20h"}', 'AC'),
(1022, 6, 3, 1, '7891001234522', 'LG UltraPC', 'UltraPC', 'Laptop para tareas diarias', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Procesador":"AMD Ryzen 5","SSD":"512GB"}', 'AC'),
(1023, 6, 4, 1, '7891001234523', 'Sony VAIO Z', 'VAIOZ', 'Laptop premium con diseño elegante', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Pantalla":"4K","RAM":"16GB"}', 'AC'),
(1024, 6, 4, 1, '7891001234524', 'Sony VAIO SX14', 'VAIOSX14', 'Laptop ultradelgada y liviana', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Pantalla":"14 pulgadas","SSD":"256GB"}', 'AC'),


(1025, 7, 1, 1, '7891001234525', 'Samsung Galaxy Buds2', 'Buds2', 'Auriculares inalámbricos', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Autonomía":"20h","Cancelación de ruido":"Sí"}', 'AC'),
(1026, 7, 1, 1, '7891001234526', 'Samsung Galaxy Watch5', 'Watch5', 'Reloj inteligente', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Pantalla":"AMOLED","Resistencia al agua":"IP68"}', 'AC'),
(1027, 7, 2, 1, '7891001234527', 'AirPods Pro', 'AirPodsPro', 'Auriculares inalámbricos premium', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Cancelación de ruido":"Sí","Chip":"H2"}', 'AC'),
(1028, 7, 2, 1, '7891001234528', 'Apple Watch Series 8', 'Watch8', 'Reloj inteligente avanzado', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Monitoreo":"ECG","Detección de caídas":"Sí"}', 'AC'),
(1029, 7, 3, 1, '7891001234529', 'LG Tone Free', 'ToneFree', 'Auriculares con sonido premium', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Cancelación de ruido":"Sí","Autonomía":"24h"}', 'AC'),
(1030, 7, 3, 1, '7891001234530', 'LG UltraGear Mouse', 'UGMouse', 'Mouse gaming ergonómico', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"DPI":"16000","RGB":"Sí"}', 'AC'),
(1031, 7, 4, 1, '7891001234531', 'Sony WH-1000XM5', 'WH1000XM5', 'Auriculares inalámbricos con cancelación de ruido', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Autonomía":"30h","Bluetooth":"5.2"}', 'AC'),
(1032, 7, 4, 1, '7891001234532', 'Sony DualSense', 'DualSense', 'Control de PlayStation 5', 'Unidad', 10, 100, 'https://placehold.org/300x200/cccccc/000000', '{"Vibración háptica":"Sí","Gatillos adaptativos":"Sí"}', 'AC'),


(1033, 8, 5, 2, '7891001234533', 'Nike Air Max T-shirt', 'NAMT01', 'Camiseta deportiva de algodón', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Blanco","Talla":"M"}', 'AC'),
(1034, 8, 5, 2, '7891001234534', 'Nike Dri-FIT Hoodie', 'NDH02', 'Sudadera con tecnología Dri-FIT', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Negro","Talla":"L"}', 'AC'),
(1035, 8, 5, 2, '7891001234535', 'Nike Pro Compression Shirt', 'NPCS03', 'Camiseta de compresión para entrenamientos', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Gris","Talla":"S"}', 'AC'),
(1036, 8, 5, 2, '7891001234536', 'Nike Club Joggers', 'NCJ04', 'Pantalones deportivos cómodos', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Azul","Talla":"XL"}', 'AC'),
(1037, 8, 6, 2, '7891001234537', 'Adidas Originals T-shirt', 'AOT01', 'Camiseta clásica con logo Originals', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Blanco","Talla":"M"}', 'AC'),
(1038, 8, 6, 2, '7891001234538', 'Adidas Training Hoodie', 'ATH02', 'Sudadera para entrenamientos', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Negro","Talla":"L"}', 'AC'),
(1039, 8, 6, 2, '7891001234539', 'Adidas Performance Shorts', 'APS03', 'Shorts deportivos ligeros', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Rojo","Talla":"S"}', 'AC'),
(1040, 8, 7, 2, '7891001234540', 'Puma Essentials Sweatpants', 'PES04', 'Pantalones de chándal básicos', 'Unidad', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Color":"Gris","Talla":"M"}', 'AC'),



(1041, 9, 5, 2, '7891001234541', 'Nike Air Max 90', 'AM90', 'Zapatos deportivos icónicos', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"42","Color":"Blanco/Negro"}', 'AC'),
(1042, 9, 5, 2, '7891001234542', 'Nike Pegasus 39', 'P39', 'Zapatos para correr largas distancias', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"43","Color":"Gris"}', 'AC'),
(1043, 9, 5, 2, '7891001234543', 'Nike Air Jordan 1', 'AJ1', 'Zapatillas de baloncesto clásicas', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"44","Color":"Rojo/Blanco"}', 'AC'),
(1044, 9, 6, 2, '7891001234544', 'Adidas Ultraboost 22', 'UB22', 'Zapatos para correr con amortiguación Boost', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"42","Color":"Negro"}', 'AC'),
(1045, 9, 6, 2, '7891001234545', 'Adidas Superstar', 'Superstar', 'Zapatillas de cuero clásicas', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"43","Color":"Blanco/Negro"}', 'AC'),
(1046, 9, 6, 2, '7891001234546', 'Adidas NMD R1', 'NMD', 'Zapatos casuales y deportivos', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"41","Color":"Azul"}', 'AC'),
(1047, 9, 7, 2, '7891001234547', 'Puma Suede Classic', 'PSC', 'Zapatillas de gamuza retro', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"42","Color":"Negro/Blanco"}', 'AC'),
(1048, 9, 7, 2, '7891001234548', 'Puma Future Rider', 'PFR', 'Zapatos casuales con diseño moderno', 'Par', 20, 200, 'https://placehold.org/300x200/cccccc/000000', '{"Talla":"43","Color":"Rojo"}', 'AC'),



(1049, 10, 1, 3, '7891001234549', 'Samsung Refrigerator RT29', 'RT29', 'Refrigerador de doble puerta', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Capacidad":"300L","Color":"Acero inoxidable"}', 'AC'),
(1050, 10, 1, 3, '7891001234550', 'Samsung Microwave MG23', 'MG23', 'Microondas con grill y control táctil', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Potencia":"800W","Capacidad":"23L"}', 'AC'),
(1051, 10, 1, 3, '7891001234551', 'Samsung Air Conditioner AR12', 'AR12', 'Aire acondicionado split inverter', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"BTU":"12000","Eficiencia energética":"A+"}', 'AC'),
(1052, 10, 1, 3, '7891001234552', 'Samsung Washing Machine WW80', 'WW80', 'Lavadora de carga frontal con EcoBubble', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Capacidad":"8kg","Color":"Blanco"}', 'AC'),
(1053, 10, 3, 3, '7891001234553', 'LG Refrigerator GR-X247', 'GR-X247', 'Refrigerador side-by-side con puerta Instaview', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Capacidad":"600L","Color":"Acero inoxidable"}', 'AC'),
(1054, 10, 3, 3, '7891001234554', 'LG Microwave MH6535', 'MH6535', 'Microondas con tecnología Smart Inverter', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Potencia":"1000W","Capacidad":"25L"}', 'AC'),
(1055, 10, 3, 3, '7891001234555', 'LG Washing Machine F4WV', 'F4WV', 'Lavadora de carga frontal con AI DD', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Capacidad":"9kg","Color":"Blanco"}', 'AC'),
(1056, 10, 4, 3, '7891001234556', 'Sony Home Theater HT-S40R', 'HT-S40R', 'Sistema de cine en casa con sonido envolvente 5.1', 'Unidad', 5, 50, 'https://placehold.org/300x200/cccccc/000000', '{"Potencia":"600W","Conectividad":"Bluetooth"}', 'AC');










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
('Entrada', 100, 'AC'),
('Salida', 200, 'AC'),
('Transferencia', 300, 'AC'),
('Devolución', 400, 'AC'),
('Ajuste positivo', 500, 'AC'),
('Ajuste negativo', 600, 'AC'),
('Baja', 700, 'AC');

-- Inserciones para TbInv_MetodoValoracion
INSERT INTO TbInv_MetodoValoracion (Nombre_MeV, Descripcion_MeV, Estado_MeV)
VALUES 
('PEPS', 'Primeras Entradas, Primeras Salidas', 'AC'),
('UEPS', 'Últimas Entradas, Primeras Salidas', 'AC'),
('Promedio', 'Promedio Ponderado', 'AC'),
('Costo Específico', 'Método de Costo Específico', 'AC'),
('Valor Neto Realizable', 'Método de Valor Neto Realizable', 'AC');

