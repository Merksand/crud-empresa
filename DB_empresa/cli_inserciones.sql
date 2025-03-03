USE empresa;

INSERT INTO TbPais (Nombre_Pai, Moneda_Pai, Idioma_Pai, Latitud_Pai, Longitud_Pai, Regimen_Impositivo_Pai, IVA_Pai, Estado_Dep) 
VALUES 
('Bolivia', 'Boliviano', 'Español', -17, -65, 'IVA General', 13, 'AC'),
('Argentina', 'Peso Argentino', 'Español', -38, -63, 'IVA General', 21, 'AC'),
('Brasil', 'Real', 'Portugués', -14, -51, 'Simples Nacional', 18, 'AC'),
('Chile', 'Peso Chileno', 'Español', -30, -71, 'IVA General', 19, 'AC'),
('Perú', 'Sol', 'Español', -9, -75, 'Régimen General', 18, 'AC');


INSERT INTO TbDepartamento (Id_Pais_Dep, Nombre_Dep, Altura_Dep, Estado_Dep) 
VALUES 
(1, 'Santa Cruz', 416, 'AC'),
(1, 'La Paz', 3640, 'AC'),
(1, 'CochaACmAC', 2558, 'AC'),
(1, 'Oruro', 3706, 'AC'),
(1, 'Potosí', 4090, 'AC'),
(1, 'Chuquisaca', 2790, 'AC'),
(1, 'Tarija', 1854, 'AC'),
(1, 'Beni', 155, 'AC'),
(1, 'Pando', 280, 'AC'),

-- ARGENTINA
(2, 'Buenos Aires', 25, 'AC'),
(2, 'CórdoAC', 360, 'AC'),
(2, 'Santa Fe', 27, 'AC'),
(2, 'Mendoza', 746, 'AC'),
(2, 'Tucumán', 450, 'AC'),
(2, 'Salta', 1187, 'AC'),
(2, 'Misiones', 300, 'AC'),
(2, 'Chaco', 83, 'AC'),
(2, 'Neuquén', 260, 'AC'),
(2, 'Río Negro', 240, 'AC'),
-- BRASIL
(3, 'Acre', 200, 'AC'),
(3, 'Alagoas', 13, 'AC'),
(3, 'Amapá', 10, 'AC'),
(3, 'Amazonas', 92, 'AC'),
(3, 'AChía', 20, 'AC'),
(3, 'Ceará', 16, 'AC'),
(3, 'Distrito Federal', 1172, 'AC'),
(3, 'Espírito Santo', 12, 'AC'),
(3, 'Goiás', 749, 'AC'),
(3, 'Maranhão', 32, 'AC'),
(3, 'Mato Grosso', 248, 'AC'),
(3, 'Mato Grosso do Sul', 310, 'AC'),
(3, 'Minas Gerais', 570, 'AC'),
(3, 'Pará', 21, 'AC'),
(3, 'ParaíAC', 36, 'AC'),
(3, 'Paraná', 945, 'AC'),
(3, 'Pernambuco', 20, 'AC'),
(3, 'Piauí', 180, 'AC'),
(3, 'Rio de Janeiro', 33, 'AC'),
(3, 'Rio Grande do Norte', 10, 'AC'),
(3, 'Rio Grande do Sul', 300, 'AC'),
(3, 'Rondônia', 200, 'AC'),
(3, 'Roraima', 90, 'AC'),
(3, 'Santa Catarina', 550, 'AC'),
(3, 'São Paulo', 760, 'AC'),
(3, 'Sergipe', 13, 'AC'),
(3, 'Tocantins', 267, 'AC');



-- Insertar datos en TbProvincia
-- Departamento de Santa Cruz
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) 
VALUES
(1, 'Andrés Ibáñez', 'AC'),
(1, 'Ignacio Warnes', 'AC'),
(1, 'Sara', 'AC'),
(1, 'Cordillera', 'AC'),
(1, 'Chiquitos', 'AC'),
(1, 'Velasco', 'AC'),
(1, 'Ñuflo de Chávez', 'AC'),
(1, 'Obispo Santistevan', 'AC'),
(1, 'Ichilo', 'AC'),
(1, 'Guarayos', 'AC'),
(1, 'Vallegrande', 'AC'),
(1, 'Florida', 'AC'),
(1, 'Manuel María CaACllero', 'AC'),
(1, 'Germán Busch', 'AC'),
(1, 'Ángel Sandoval', 'AC');

-- Departamento de La Paz
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(2, 'Abel Iturralde', 'AC'),
(2, 'Aroma', 'AC'),
(2, 'ACutista Saavedra', 'AC'),
(2, 'Caranavi', 'AC'),
(2, 'Eliodoro Camacho', 'AC'),
(2, 'Franz Tamayo', 'AC'),
(2, 'Gualberto Villarroel', 'AC'),
(2, 'Ingavi', 'AC'),
(2, 'Inquisivi', 'AC'),
(2, 'José Manuel Pando', 'AC'),
(2, 'José Ramón Loayza', 'AC'),
(2, 'Larecaja', 'AC'),
(2, 'Los Andes', 'AC'),
(2, 'Manco Kapac', 'AC'),
(2, 'Muñecas', 'AC'),
(2, 'Nor Yungas', 'AC'),
(2, 'Omasuyos', 'AC'),
(2, 'Pacajes', 'AC'),
(2, 'Pedro Domingo Murillo', 'AC'),
(2, 'Sud Yungas', 'AC');

-- Departamento de CochaACmAC

-- Provincias del departamento de CochaACmAC
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(3, 'Arani', 'AC'),
(3, 'Arque', 'AC'),
(3, 'Ayopaya', 'AC'),
(3, 'Bolívar', 'AC'),
(3, 'Capinota', 'AC'),
(3, 'Carrasco', 'AC'),
(3, 'Cercado', 'AC'),
(3, 'Chapare', 'AC'),
(3, 'EsteACn Arce', 'AC'),
(3, 'Germán Jordán', 'AC'),
(3, 'Mizque', 'AC'),
(3, 'Narciso Campero', 'AC'),
(3, 'Punata', 'AC'),
(3, 'Quillacollo', 'AC'),
(3, 'Tapacarí', 'AC'),
(3, 'Tiraque', 'AC');

-- Provincias del Departamento de Oruro
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(4, 'Cercado', 'AC'),
(4, 'Tomás ACrrón', 'AC'),
(4, 'Pantaleón Dalence', 'AC'),
(4, 'Poopó', 'AC'),
(4, 'Eduardo Avaroa', 'AC'),
(4, 'SeACstián Pagador', 'AC'),
(4, 'Saucarí', 'AC'),
(4, 'Nor Carangas', 'AC'),
(4, 'San Pedro de Totora', 'AC'),
(4, 'Carangas', 'AC'),
(4, 'Sud Carangas', 'AC'),
(4, 'Ladislao Cabrera', 'AC'),
(4, 'Litoral', 'AC'),
(4, 'Sajama', 'AC'),
(4, 'SaACya', 'AC'),
(4, 'Mejillones', 'AC');

-- Provincias del Departamento de Potosí
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(5, 'Alonso de Ibáñez', 'AC'),    
(5, 'Antonio Quijarro', 'AC'),    
(5, 'Bernardino BilACo', 'AC'),   
(5, 'Charcas', 'AC'),             
(5, 'Chayanta', 'AC'),            
(5, 'Cornelio Saavedra', 'AC'),   
(5, 'Daniel Campos', 'AC'),       
(5, 'Enrique ACldivieso', 'AC'),  
(5, 'José María Linares', 'AC'),  
(5, 'Modesto Omiste', 'AC'),      
(5, 'Nor Chichas', 'AC'),         
(5, 'Nor Lípez', 'AC'),           
(5, 'Rafael Bustillo', 'AC'),     
(5, 'Sud Chichas', 'AC'),         
(5, 'Sud Lípez', 'AC'),           
(5, 'Tomás Frías', 'AC');         

-- Provincias del Departamento de Chuquisaca
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(6, 'Azurduy', 'AC'),
(6, 'Belisario Boeto', 'AC'),
(6, 'Hernando Siles', 'AC'),
(6, 'Luis Calvo', 'AC'),
(6, 'Nor Cinti', 'AC'),
(6, 'Oropeza', 'AC'),
(6, 'Sud Cinti', 'AC'),
(6, 'Tomina', 'AC'),
(6, 'Yamparáez', 'AC'),
(6, 'Zudáñez', 'AC');

-- Provincias del Departamento de Tarija
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(7, 'Aniceto Arce', 'AC'),
(7, 'Burdett O\'Connor', 'AC'),
(7, 'Cercado', 'AC'),
(7, 'Eustaquio Méndez', 'AC'),
(7, 'Gran Chaco', 'AC'),
(7, 'José María Avilés', 'AC');

-- Provincias del Departamento del Beni
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(8, 'Cercado', 'AC'),
(8, 'Antonio Vaca Díez', 'AC'),
(8, 'General José ACllivián Segurola', 'AC'),
(8, 'Yacuma', 'AC'),
(8, 'Moxos', 'AC'),
(8, 'Marbán', 'AC'),
(8, 'Mamoré', 'AC'),
(8, 'Iténez', 'AC');

-- Provincias del Departamento de Pando
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(9, 'Abuná', 'AC'),
(9, 'Federico Román', 'AC'),
(9, 'Madre de Dios', 'AC'),
(9, 'Manuripi', 'AC'),
(9, 'Nicolás Suárez', 'AC');


-- ARGENTINA
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) 
VALUES 
(10, 'La Plata', 'AC'),          -- Provincia asociada a Buenos Aires
(11, 'Villa Carlos Paz', 'AC'),  -- Provincia asociada a CórdoAC
(12, 'Rosario', 'AC'),           -- Provincia asociada a Santa Fe
(13, 'San Rafael', 'AC'),        -- Provincia asociada a Mendoza
(14, 'San Miguel de Tucumán', 'AC'), -- Provincia asociada a Tucumán
(15, 'Cafayate', 'AC'),          -- Provincia asociada a Salta
(16, 'Posadas', 'AC'),           -- Provincia asociada a Misiones
(17, 'Resistencia', 'AC'),       -- Provincia asociada a Chaco
(18, 'San Martín de los Andes', 'AC'), -- Provincia asociada a Neuquén
(19, 'ACriloche', 'AC');         -- Provincia asociada a Río Negro




-- Insertar datos en TbMunicipio
-- Provincia Andrés Ibáñez, Departamento de Santa Cruz
-- Provincia Andrés Ibáñez (Id_Provincia_Mun = 1)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(1, 'Santa Cruz de la Sierra', 'AC'),
(1, 'Cotoca', 'AC'),
(1, 'El Torno', 'AC'),
(1, 'La Guardia', 'AC'),
(1, 'Porongo', 'AC');

-- Provincia Ichilo (Id_Provincia_Mun = 2)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(2, 'Buena Vista', 'AC'),
(2, 'San Carlos', 'AC'),
(2, 'Yapacaní', 'AC'),
(2, 'San Juan de Yapacaní', 'AC');

-- Provincia Sara (Id_Provincia_Mun = 3)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(3, 'Portachuelo', 'AC'),
(3, 'Colpa Bélgica', 'AC'),
(3, 'Santa Rosa del Sara', 'AC');

-- Provincia Cordillera (Id_Provincia_Mun = 4)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(4, 'Lagunillas', 'AC'),
(4, 'Camiri', 'AC'),
(4, 'Charagua', 'AC'),
(4, 'Cabezas', 'AC'),
(4, 'Gutiérrez', 'AC'),
(4, 'Boyuibe', 'AC'),
(4, 'Cuevo', 'AC');

-- Provincia Chiquitos (Id_Provincia_Mun = 5)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(5, 'San José de Chiquitos', 'AC'),
(5, 'Pailón', 'AC'),
(5, 'Roboré', 'AC');

-- Provincia Velasco (Id_Provincia_Mun = 6)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(6, 'San Ignacio de Velasco', 'AC'),
(6, 'San Miguel de Velasco', 'AC'),
(6, 'San Rafael de Velasco', 'AC');

-- Provincia Ñuflo de Chávez (Id_Provincia_Mun = 7)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(7, 'Concepción', 'AC'),
(7, 'San Javier', 'AC'),
(7, 'San Ramón', 'AC'),
(7, 'San Julián', 'AC'),
(7, 'San Antonio de Lomerío', 'AC');

-- Provincia Obispo Santistevan (Id_Provincia_Mun = 8)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(8, 'Montero', 'AC'),
(8, 'Mineros', 'AC'),
(8, 'General Saavedra', 'AC'),
(8, 'San Pedro', 'AC'),
(8, 'Fernández Alonso', 'AC');

-- Provincia Guarayos (Id_Provincia_Mun = 9)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(9, 'Ascensión de Guarayos', 'AC'),
(9, 'El Puente', 'AC'),
(9, 'Urubichá', 'AC');

-- Provincia Germán Busch (Id_Provincia_Mun = 10)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(10, 'Puerto Suárez', 'AC'),
(10, 'Puerto Quijarro', 'AC'),
(10, 'El Carmen Rivero Tórrez', 'AC');

-- Provincia Florida (Id_Provincia_Mun = 11)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(11, 'Samaipata', 'AC'),
(11, 'Pampa Grande', 'AC'),
(11, 'Mairana', 'AC'),
(11, 'Quirusillas', 'AC');

-- Provincia Vallegrande (Id_Provincia_Mun = 12)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(12, 'Vallegrande', 'AC'),
(12, 'Moro Moro', 'AC'),
(12, 'Pucará', 'AC'),
(12, 'Postrer Valle', 'AC'),
(12, 'Trigal', 'AC');

-- Provincia Manuel María CaACllero (Id_Provincia_Mun = 13)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(13, 'Comarapa', 'AC'),
(13, 'Saipina', 'AC');

-- Provincia Ángel Sandoval (Id_Provincia_Mun = 14)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(14, 'San Matías', 'AC');

-- Provincia Ignacio Warnes (Id_Provincia_Mun = 15)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(15, 'Warnes', 'AC'),
(15, 'Okinawa Uno', 'AC');



-- LA PAZ
-- Provincia: Abel Iturralde
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(16, 'Ixiamas', 'AC'),
(16, 'San Buenaventura', 'AC');

-- Provincia: Aroma
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(17, 'Sica Sica', 'AC'),
(17, 'Umala', 'AC'),
(17, 'Ayo Ayo', 'AC'),
(17, 'Calamarca', 'AC'),
(17, 'Patacamaya', 'AC'),
(17, 'Colquencha', 'AC'),
(17, 'Collana', 'AC');

-- Provincia: ACutista Saavedra
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(18, 'Charazani', 'AC'),
(18, 'Curva', 'AC');

-- Provincia: Caranavi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(19, 'Caranavi', 'AC'),
(19, 'Alto Beni', 'AC');

-- Provincia: Eliodoro Camacho
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(20, 'Puerto Acosta', 'AC'),
(20, 'Mocomoco', 'AC'),
(20, 'Puerto Carabuco', 'AC'),
(20, 'Escoma', 'AC'),
(20, 'Humanata', 'AC');

-- Provincia: Franz Tamayo
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(21, 'Apolo', 'AC'),
(21, 'Pelechuco', 'AC');

-- Provincia: Gualberto Villarroel
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(22, 'San Pedro de Curahuara', 'AC'),
(22, 'Chacarilla', 'AC');

-- Provincia: Ingavi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(23, 'Viacha', 'AC'),
(23, 'Guaqui', 'AC'),
(23, 'Desaguadero', 'AC'),
(23, 'Taraco', 'AC'),
(23, 'Tiwanaku', 'AC'),
(23, 'Jesús de Machaca', 'AC'),
(23, 'San Andrés de Machaca', 'AC');

-- Provincia: Inquisivi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(24, 'Inquisivi', 'AC'),
(24, 'Quime', 'AC'),
(24, 'Cajuata', 'AC'),
(24, 'Colquiri', 'AC'),
(24, 'Ichoca', 'AC'),
(24, 'Licoma Pampa', 'AC'),
(24, 'Villa Libertad Licoma', 'AC');

-- Provincia: José Manuel Pando
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(25, 'Santiago de Machaca', 'AC'),
(25, 'Catacora', 'AC');

-- Provincia: Larecaja
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(26, 'Sorata', 'AC'),
(26, 'Tacacoma', 'AC'),
(26, 'Guanay', 'AC'),
(26, 'Tipuani', 'AC'),
(26, 'Mapiri', 'AC'),
(26, 'Teoponte', 'AC'),
(26, 'QuiaACya', 'AC'),
(26, 'ComACya', 'AC'),
(26, 'Chuma', 'AC'),
(26, 'Ayata', 'AC');

-- Provincia: Loayza
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(27, 'LuriACy', 'AC'),
(27, 'Sapahaqui', 'AC'),
(27, 'Yaco', 'AC'),
(27, 'Malla', 'AC'),
(27, 'Ichoca', 'AC'),
(27, 'Cairoma', 'AC');

-- Provincia: Los Andes
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(28, 'Pucarani', 'AC'),
(28, 'ACtallas', 'AC'),
(28, 'Laja', 'AC'),
(28, 'Puerto Pérez', 'AC'),
(28, 'Pucarani', 'AC');

-- Provincia: Manco Kapac
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(29, 'CopacaACna', 'AC'),
(29, 'San Pedro de Tiquina', 'AC');

-- Provincia: Muñecas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(30, 'Chuma', 'AC'),
(30, 'Ayata', 'AC');

-- Provincia: Nor Yungas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(31, 'Coroico', 'AC'),
(31, 'Coroata', 'AC');

-- Provincia: Omasuyos
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(32, 'Achacachi', 'AC'),
(32, 'Huarina', 'AC'),
(32, 'Santiago de Huata', 'AC');

-- Provincia: Pacajes
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(33, 'Coro Coro', 'AC'),
(33, 'Caquiaviri', 'AC'),
(33, 'Calacoto', 'AC'),
(33, 'Comanche', 'AC'),
(33, 'Charaña', 'AC'),
(33, 'Nazacara de Pacajes', 'AC'),
(33, 'Santiago de Callapa', 'AC'),
(33, 'Santiago de Machaca', 'AC');

-- Provincia: Murillo
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(34, 'La Paz', 'AC'),
(34, 'El Alto', 'AC'),
(34, 'Achocalla', 'AC'),
(34, 'Mecapaca', 'AC'),
(34, 'Palca', 'AC');

-- Provincia: Sud Yungas
-- Provincia: Sud Yungas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(35, 'Chulumani', 'AC'),
(35, 'Irupana', 'AC'),
(35, 'Yanacachi', 'AC'),
(35, 'Palos Blancos', 'AC'),
(35, 'La Asunta', 'AC');


-- COCHAACMAC

-- Provincia: Arani (Id_Provincia_Mun: 36)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(36, 'Arani', 'AC'),
(36, 'Vacas', 'AC');

-- Provincia: Arque (Id_Provincia_Mun: 37)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(37, 'Arque', 'AC'),
(37, 'Tacopaya', 'AC');

-- Provincia: Ayopaya (Id_Provincia_Mun: 38)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(38, 'Independencia', 'AC'),
(38, 'Morochata', 'AC'),
(38, 'Cocapata', 'AC');

-- Provincia: Bolívar (Id_Provincia_Mun: 39)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(39, 'Bolívar', 'AC');

-- Provincia: Capinota (Id_Provincia_Mun: 40)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(40, 'Capinota', 'AC'),
(40, 'Sicaya', 'AC'),
(40, 'Santiváñez', 'AC');

-- Provincia: Carrasco (Id_Provincia_Mun: 41)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(41, 'Totora', 'AC'),
(41, 'Pocona', 'AC'),
(41, 'Pojo', 'AC'),
(41, 'Chimoré', 'AC'),
(41, 'Puerto Villarroel', 'AC'),
(41, 'Entre Ríos', 'AC');

-- Provincia: Cercado (Id_Provincia_Mun: 42)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(42, 'CochaACmAC', 'AC');

-- Provincia: Chapare (Id_Provincia_Mun: 43)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(43, 'SacaAC', 'AC'),
(43, 'Villa Tunari', 'AC'),
(43, 'Colomi', 'AC');

-- Provincia: EsteACn Arce (Id_Provincia_Mun: 44)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(44, 'Tarata', 'AC'),
(44, 'Anzaldo', 'AC'),
(44, 'Arbieto', 'AC'),
(44, 'SacaACmAC', 'AC');

-- Provincia: Germán Jordán (Id_Provincia_Mun: 45)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(45, 'Cliza', 'AC'),
(45, 'Toco', 'AC'),
(45, 'Tolata', 'AC');

-- Provincia: Mizque (Id_Provincia_Mun: 46)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(46, 'Mizque', 'AC'),
(46, 'Alalay', 'AC'),
(46, 'Vila Vila', 'AC');

-- Provincia: Narciso Campero (Id_Provincia_Mun: 47)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(47, 'Aiquile', 'AC'),
(47, 'Omereque', 'AC'),
(47, 'Pasorapa', 'AC');

-- Provincia: Punata (Id_Provincia_Mun: 48)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(48, 'Punata', 'AC'),
(48, 'San Benito', 'AC'),
(48, 'Villa Rivero', 'AC'),
(48, 'Cuchumuela', 'AC'),
(48, 'Tacachi', 'AC');

-- Provincia: Quillacollo (Id_Provincia_Mun: 49)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(49, 'Quillacollo', 'AC'),
(49, 'Colcapirhua', 'AC'),
(49, 'Tiquipaya', 'AC'),
(49, 'Vinto', 'AC'),
(49, 'Sipe Sipe', 'AC');

-- Provincia: Tapacarí (Id_Provincia_Mun: 50)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(50, 'Tapacarí', 'AC');

-- Provincia: Tiraque (Id_Provincia_Mun: 51)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(51, 'Tiraque', 'AC'),
(51, 'Shinahota', 'AC');


-- ORURO
-- Provincia: Cercado (Id_Provincia_Mun: 52)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(52, 'Oruro', 'AC');

-- Provincia: Tomás ACrrón (Id_Provincia_Mun: 53)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(53, 'Eucaliptus', 'AC');

-- Provincia: Pantaleón Dalence (Id_Provincia_Mun: 54)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(54, 'Huanuni', 'AC'),
(54, 'Machacamarca', 'AC');

-- Provincia: Poopó (Id_Provincia_Mun: 55)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(55, 'Poopó', 'AC'),
(55, 'Pazña', 'AC'),
(55, 'Antequera', 'AC');

-- Provincia: Eduardo Avaroa (Id_Provincia_Mun: 56)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(56, 'Challapata', 'AC'),
(56, 'Santuario de Quillacas', 'AC');

-- Provincia: SeACstián Pagador (Id_Provincia_Mun: 57)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(57, 'Santiago de Huari', 'AC');

-- Provincia: Nor Carangas (Id_Provincia_Mun: 58)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(58, 'Huayllamarca', 'AC');

-- Provincia: Saucarí (Id_Provincia_Mun: 59)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(59, 'Toledo', 'AC');

-- Provincia: San Pedro de Totora (Id_Provincia_Mun: 60)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(60, 'Totora', 'AC');

-- Provincia: Carangas (Id_Provincia_Mun: 61)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(61, 'Corque', 'AC'),
(61, 'Choquecota', 'AC');

-- Provincia: Sud Carangas (Id_Provincia_Mun: 62)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(62, 'Santiago de Andamarca', 'AC'),
(62, 'Belén de Andamarca', 'AC');

-- Provincia: Ladislao Cabrera (Id_Provincia_Mun: 63)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(63, 'Salinas de Garcí Mendoza', 'AC'),
(63, 'Pampa Aullagas', 'AC');

-- Provincia: Litoral (Id_Provincia_Mun: 64)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(64, 'Huachacalla', 'AC'),
(64, 'Escara', 'AC'),
(64, 'Cruz de Machacamarca', 'AC'),
(64, 'Yunguyo del Litoral', 'AC'),
(64, 'Esmeralda', 'AC');

-- Provincia: Sajama (Id_Provincia_Mun: 65)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(65, 'Curahuara de Carangas', 'AC'),
(65, 'Turco', 'AC');

-- Provincia: SaACya (Id_Provincia_Mun: 66)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(66, 'SaACya', 'AC'),
(66, 'Chipaya', 'AC'),
(66, 'Coipasa', 'AC');

-- POTOSI
-- Provincia: Alonso de Ibáñez (Id_Provincia_Mun: 67)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(67, 'Sacaca', 'AC'),
(67, 'Caripuyo', 'AC');

-- Provincia: Antonio Quijarro (Id_Provincia_Mun: 68)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(68, 'Uyuni', 'AC'),
(68, 'Tomave', 'AC');

-- Provincia: Bernardino BilACo (Id_Provincia_Mun: 69)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(69, 'Arampampa', 'AC'),
(69, 'Acasio', 'AC');

-- Provincia: Charcas (Id_Provincia_Mun: 70)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(70, 'San Pedro de Buena Vista', 'AC'),
(70, 'Toro Toro', 'AC');

-- Provincia: Chayanta (Id_Provincia_Mun: 71)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(71, 'Colquechaca', 'AC'),
(71, 'Ocurí', 'AC'),
(71, 'Ravelo', 'AC'),
(71, 'Porco', 'AC');

-- Provincia: Cornelio Saavedra (Id_Provincia_Mun: 72)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(72, 'Betanzos', 'AC'),
(72, 'Chaquí', 'AC'),
(72, 'TacoACmAC', 'AC');

-- Provincia: Daniel Campos (Id_Provincia_Mun: 73)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(73, 'Llica', 'AC'),
(73, 'Tahua', 'AC');

-- Provincia: Enrique ACldivieso (Id_Provincia_Mun: 74)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(74, 'San Agustín', 'AC');

-- Provincia: José María Linares (Id_Provincia_Mun: 75)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(75, 'Puna', 'AC'),
(75, 'Caiza "D"', 'AC'),
(75, 'Ckochas', 'AC');

-- Provincia: Modesto Omiste (Id_Provincia_Mun: 76)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(76, 'Villazón', 'AC'),
(76, 'Mojinete', 'AC');

-- Provincia: Nor Chichas (Id_Provincia_Mun: 77)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(77, 'Cotagaita', 'AC'),
(77, 'Vitichi', 'AC');

-- Provincia: Nor Lípez (Id_Provincia_Mun: 78)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(78, 'Colcha "K"', 'AC'),
(78, 'San Pedro de Quemes', 'AC'),
(78, 'San Pablo de Lípez', 'AC');

-- Provincia: Rafael Bustillo (Id_Provincia_Mun: 79)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(79, 'Uncía', 'AC'),
(79, 'Chayanta', 'AC'),
(79, 'Llallagua', 'AC'),
(79, 'Chuquihuta', 'AC');

-- Provincia: Sud Chichas (Id_Provincia_Mun: 80)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(80, 'Tupiza', 'AC'),
(80, 'Atocha', 'AC');

-- Provincia: Sud Lípez (Id_Provincia_Mun: 81)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(81, 'San Pablo de Lípez', 'AC'),
(81, 'San Antonio de Esmoruco', 'AC');

-- Provincia: Tomás Frías (Id_Provincia_Mun: 82)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(82, 'Potosí', 'AC'),
(82, 'Tinguipaya', 'AC'),
(82, 'Yocalla', 'AC'),
(82, 'Urmiri', 'AC');

-- CHUQUISACA
-- Provincia: Azurduy (Id_Provincia: 83)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(83, 'Villa Azurduy', 'AC'),
(83, 'Tarvita', 'AC');

-- Provincia: Belisario Boeto (Id_Provincia: 84)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(84, 'Villa Serrano', 'AC');

-- Provincia: Hernando Siles (Id_Provincia: 85)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(85, 'Monteagudo', 'AC'),
(85, 'Huacareta', 'AC');

-- Provincia: Luis Calvo (Id_Provincia: 86)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(86, 'Villa Vaca Guzmán', 'AC'),
(86, 'Macharetí', 'AC'),
(86, 'Huacaya', 'AC');

-- Provincia: Nor Cinti (Id_Provincia: 87)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(87, 'Camargo', 'AC'),
(87, 'San Lucas', 'AC'),
(87, 'Incahuasi', 'AC'),
(87, 'Villa Charcas', 'AC');

-- Provincia: Oropeza (Id_Provincia: 88)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(88, 'Sucre', 'AC'),
(88, 'Poroma', 'AC'),
(88, 'Yotala', 'AC');

-- Provincia: Sud Cinti (Id_Provincia: 89)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(89, 'Culpina', 'AC'),
(89, 'Las Carreras', 'AC');

-- Provincia: Tomina (Id_Provincia: 90)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(90, 'Padilla', 'AC'),
(90, 'Tomina', 'AC'),
(90, 'Sopachuy', 'AC'),
(90, 'El Villar', 'AC'),
(90, 'Villa Alcalá', 'AC');

-- Provincia: Yamparáez (Id_Provincia: 91)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(91, 'Tarabuco', 'AC'),
(91, 'Yamparáez', 'AC');

-- Provincia: Zudáñez (Id_Provincia: 92)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(92, 'Villa Zudáñez', 'AC'),
(92, 'Icla', 'AC'),
(92, 'Presto', 'AC'),
(92, 'Mojocoya', 'AC');


-- Municipios del Departamento de Tarija
-- Provincia: Aniceto Arce (Id_Provincia_Mun: 93)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(93, 'Padcaya', 'AC'),
(93, 'Bermejo', 'AC');

-- Provincia: Burdett O'Connor (Id_Provincia_Mun: 94)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(94, 'Entre Ríos', 'AC');

-- Provincia: Cercado (Id_Provincia_Mun: 95)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(95, 'Tarija', 'AC');

-- Provincia: Eustaquio Méndez (Id_Provincia_Mun: 96)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(96, 'San Lorenzo', 'AC'),
(96, 'El Puente', 'AC');

-- Provincia: Gran Chaco (Id_Provincia_Mun: 97)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(97, 'YacuiAC', 'AC'),
(97, 'Villamontes', 'AC'),
(97, 'Caraparí', 'AC');

-- Provincia: José María Avilés (Id_Provincia_Mun: 98)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(98, 'Uriondo', 'AC'),
(98, 'Yunchará', 'AC');

-- Beni
-- Provincia: Cercado (Id_Provincia: 99)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(99, 'Trinidad', 'AC'),
(99, 'San Javier', 'AC');

-- Provincia: Antonio Vaca Díez (Id_Provincia: 100)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(100, 'Riberalta', 'AC'),
(100, 'Guayaramerín', 'AC');

-- Provincia: General José ACllivián Segurola (Id_Provincia: 101)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(101, 'Reyes', 'AC'),
(101, 'San Borja', 'AC'),
(101, 'Santa Rosa', 'AC'),
(101, 'RurrenaACque', 'AC');

-- Provincia: Yacuma (Id_Provincia: 102)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(102, 'Santa Ana del Yacuma', 'AC'),
(102, 'Exaltación', 'AC');

-- Provincia: Moxos (Id_Provincia: 103)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(103, 'San Ignacio de Moxos', 'AC');

-- Provincia: Marbán (Id_Provincia: 104)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(104, 'Loreto', 'AC'),
(104, 'San Andrés', 'AC');

-- Provincia: Mamoré (Id_Provincia: 105)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(105, 'San Joaquín', 'AC'),
(105, 'San Ramón', 'AC'),
(105, 'Puerto Siles', 'AC');

-- Provincia: Iténez (Id_Provincia: 106)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(106, 'Magdalena', 'AC'),
(106, 'ACures', 'AC'),
(106, 'Huacaraje', 'AC');


-- Pando
-- Provincia: Abuná (Id_Provincia: 107)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(107, 'Santa Rosa del Abuná', 'AC'),
(107, 'Santos Mercado', 'AC');

-- Provincia: Federico Román (Id_Provincia: 108)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(108, 'Nueva Esperanza', 'AC'),
(108, 'Villa Nueva', 'AC'),
(108, 'Ingavi', 'AC');

-- Provincia: Madre de Dios (Id_Provincia: 109)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(109, 'Puerto Gonzalo Moreno', 'AC'),
(109, 'Sena', 'AC');

-- Provincia: Manuripi (Id_Provincia: 110)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(110, 'Puerto Rico', 'AC'),
(110, 'San Pedro', 'AC'),
(110, 'Filadelfia', 'AC');

-- Provincia: Nicolás Suárez (Id_Provincia: 111)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(111, 'Cobija', 'AC'),
(111, 'Porvenir', 'AC'),
(111, 'Bolpebra', 'AC'),
(111, 'Bella Flor', 'AC'),
(111, 'San Lorenzo', 'AC');












-- --------------------------------------------------------------------------------------;

INSERT INTO TbPersona (Id_Municipio_Per, CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, Estado_Civil_Per, FDN_Per, Estado_Per)
VALUES
(1, '12345678', 'Juan', 'Perez', 'Gonzalez', 'Masculino', 'Calle 1, Zona Centro', 'Soltero', '1985-07-15', 'AC'),
(2, '87654321', 'Maria', 'Lopez', 'Martinez', 'Femenino', 'Av. Siempre Viva 742', 'Casada', '1990-04-20', 'AC'),
(3, '45678912', 'Carlos', 'Sanchez', 'Rodriguez', 'Masculino', 'Calle 10, Zona Norte', 'Divorciado', '1982-12-10', 'AC'),
(4, '98765432', 'Ana', 'Garcia', 'Fernandez', 'Femenino', 'Av. Los Pinos 101', 'Viuda', '1975-11-05', 'AC'),
(1, '23456789', 'Luis', 'Morales', 'Vargas', 'Masculino', 'Calle 3, Zona Sur', 'Casado', '1995-08-25', 'AC');



-- Suponiendo que ya existen registros en la tabla TbPersona con Id_Persona 1, 2 y 3.

INSERT INTO TbGeolocalizacion (Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Fecha_Geo, Estado_Geo)
VALUES
(1, '-17.7833', '-63.1833', '2025-01-10', 'AC'),
(2, '-16.5000', '-68.1500', '2025-01-11', 'AC'),
(3, '-19.0333', '-65.2600', '2025-01-12', 'AC');




-- Insertar datos en TbSucursal
INSERT INTO TbSucursal (Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc)
VALUES
(1, 1, 'ParamSucursal1', 'Sucursal Central', 'AC'),
(2, 3, 'ParamSucursal2', 'Sucursal Norte', 'AC'),
(8, 4, 'ParamSucursal3', 'Sucursal Sur', 'AC');

-- Insertar datos en TbEmpresa
INSERT INTO TbEmpresa (Id_InformacionEmpresa_Emp, Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp)
VALUES
(1, 'Empresa Tech', 2, '2001-05-20', 'S.A.', 'Español', 'AC'),
(2, 'Empresa Agro', 3, '1998-08-15', 'S.L.', 'Español', 'AC'),
(3, 'Empresa Educativa', 5, '2010-03-10', 'Autónomo', 'Inglés', 'AC');

-- Insertar datos en TbEmpresaSucursal
INSERT INTO TbEmpresaSucursal (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Estado_ES)
VALUES
    (1, 1, '2015-01-01', 'AC');


-- Insertar datos en TbInformacionEmpresa
INSERT INTO TbInformacionEmpresa (Id_Empresa, Logo_IE, Regimen_Impositivo_IE, Zona_Horaria_IE, Estado_IE)
VALUES
(1, 'https://acortar.link/cTzeqs', 'Regimen General', 'GMT-5', 'AC'),
(2, 'https://acortar.link/cTzeqs', 'Regimen Especial', 'GMT-4', 'AC'),
(3, 'https://acortar.link/cTzeqs', 'Regimen Simplificado', 'GMT-6', 'AC');



INSERT INTO TbEstructura (Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est)
VALUES 
    (1, '2025-01-06', 'Resolución A', 'AC'),
    (2, '2025-01-01', 'Resolución B', 'AC');



INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, Nivel_Are)
VALUES 
    (1, '2020-12-12', 'Direccion', 'Res 01/2024', 'AC', 1),
    (1, '2020-12-12', 'Contabilidad', 'Res 02/2024', 'AC', 2),
    (1, '2020-12-12', 'Cobro', 'Res 03/2024', 'AC', 3),
    (1, '2020-12-12', 'Ingreso', 'Res 03/2024', 'AC', 3),
    (1, '2020-12-12', 'Sistema', 'Res 02/2024', 'AC', 2),
    (1, '2020-12-12', 'Redes', 'Res 03/2024', 'AC', 3),
    (1, '2020-12-12', 'Desarrollo', 'Res 02/2024', 'AC', 3),
    (1, '2020-12-12', 'ACse de datos', 'Res 03/2024', 'AC', 3),
    (1, '2020-12-12', 'Interconexiones', 'Res 03/2024', 'AC', 3),
    (1, '2020-12-12', 'Requisitos', 'Res 03/2024', 'AC', 4),
    (1, '2020-12-12', 'PrueACs', 'Res 03/2024', 'AC', 4);


INSERT INTO TbDependencia (Id_Area_Padre_Dep, Id_Area_Hijo_Dep, Fecha_Asignacion_Dep, Resolucion_Are_Dep, Estado_Dep)
VALUES 
    (1, 2, '2020-12-12', 'Res Dep 1-2', 'AC'), -- Dirección -> Contabilidad
    (1, 5, '2020-12-12', 'Res Dep 1-5', 'AC'), -- Dirección -> Sistema
    (2, 3, '2020-12-12', 'Res Dep 2-3', 'AC'), -- Contabilidad -> Cobro
    (2, 4, '2020-12-12', 'Res Dep 2-4', 'AC'), -- Contabilidad -> Ingreso
    (5, 6, '2020-12-12', 'Res Dep 5-6', 'AC'), -- Sistema -> Redes
    (5, 7, '2020-12-12', 'Res Dep 5-7', 'AC'), -- Sistema -> Desarrollo
    (7, 8, '2020-12-12', 'Res Dep 7-8', 'AC'), -- Desarrollo -> ACse de datos
    (7, 9, '2020-12-12', 'Res Dep 7-9', 'AC'), -- Desarrollo -> Interconexiones
    (9, 10, '2020-12-12', 'Res Dep 9-10', 'AC'), -- Interconexiones -> Requisitos
    (9, 11, '2020-12-12', 'Res Dep 9-11', 'AC'); -- Interconexiones -> PrueACs




INSERT INTO TbCargo (Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep)
VALUES
    ('Gerente General', 1, 15000.00, 2150.00, 'Resolución GG-01', 'AC'),
    ('Subgerente', 2, 12000.00, 1720.00, 'Resolución SG-02', 'AC'),
    ('Analista Senior', 3, 9000.00, 1290.00, 'Resolución AS-03', 'AC'),
    ('Analista Junior', 4, 5000.00, 715.00, 'Resolución AJ-04', 'AC'),
    ('Asistente Administrativo', 5, 3000.00, 430.00, 'Resolución AA-05', 'AC');
    
    



    
-- Insertar datos en TbEmpleado
INSERT INTO TbEmpleado (Id_Municipio_Emp, CI_Emp, Nombre_Emp, Paterno_Emp, Materno_Emp, Sexo_Emp, Direccion_Emp, Estado_Civil_Emp, FDN_Emp, Estado_Emp)
VALUES
(1, '78945612', 'Luis', 'Martínez', 'Suárez', 'Masculino', 'Calle Independencia', 'Casado', '1988-03-25', 'AC'),
(2, '65412398', 'María', 'Gómez', 'Loayza', 'Femenino', 'Av. Prado', 'Soltera', '1995-11-30', 'AC'),
(3, '32198745', 'Jorge', 'Quiroga', 'Cruz', 'Masculino', 'Calle Aroma', 'Divorciado', '1980-07-12', 'AC');


INSERT INTO TbEmpleadoCargo (Id_Cargo_EC, Id_Empleado_EC, Fecha_Inicio_EC, Fecha_Fin_EC, Estado_EC)
VALUES 
    (1, 1, '2025-01-01', '2025-12-31', 'AC'),
    (2, 2, '2024-06-01', '2025-05-31', 'AC'),
    (3, 3, '2023-03-15', '2025-04-20', 'AC');
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   -- Inserción en TbUsuario
INSERT INTO TbUsuario (login_Usu, Estado_Usu) 
VALUES 
('admin', 'AC'),
('usuario2', 'AC'),
('usuario3', 'AC');

-- Inserción en TbPassword
INSERT INTO TbPassword (Tipo_Pas, Password_Pas, Estado_Pas) 
VALUES 
('Normal', 'admin', 'AC'),
('Normal', '123', 'AC'),
('Temporal', 'admin123', 'AC');

-- Inserción en TbUsuarioPassword
INSERT INTO TbUsuarioPassword (Id_Usuario_UP, Id_Password_UP) 
VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Inserción en TbRol
INSERT INTO TbRol (Nombre_Rol, Identificador_Rol, Estado_Rol) 
VALUES 
('Administrador', 'ADMIN', 'AC'),
('Usuario', 'USER', 'AC'),
('Supervisor', 'SUP', 'AC');

-- Inserción en TbRol_Usuario
INSERT INTO TbRol_Usuario (Id_Rol_RU, Id_Usu_RU, Fecha_RU, Estado_RU) 
VALUES 
(1, 1, NOW(), 'AC'),
(2, 2, NOW(), 'AC'),
(3, 3, NOW(), 'AC');


