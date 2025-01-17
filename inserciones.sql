-- Seleccionamos la base de datos
USE empresa;

INSERT INTO TbPais (Nombre_Pai, Moneda_Pai, Idioma_Pai, Latitud_Pai, Longitud_Pai, Regimen_Impositivo_Pai, IVA_Pai, Estado_Dep) 
VALUES 
('Bolivia', 'Boliviano', 'Español', -17, -65, 'IVA General', 13, 'Activo'),
('Argentina', 'Peso Argentino', 'Español', -38, -63, 'IVA General', 21, 'Activo'),
('Brasil', 'Real', 'Portugués', -14, -51, 'Simples Nacional', 18, 'Activo'),
('Chile', 'Peso Chileno', 'Español', -30, -71, 'IVA General', 19, 'Activo'),
('Perú', 'Sol', 'Español', -9, -75, 'Régimen General', 18, 'Activo');


INSERT INTO TbDepartamento (Id_Pais_Dep, Nombre_Dep, Altura_Dep, Estado_Dep) 
VALUES 
(1, 'Santa Cruz', 416, 'Activo'),
(1, 'La Paz', 3640, 'Activo'),
(1, 'Cochabamba', 2558, 'Activo'),
(1, 'Oruro', 3706, 'Activo'),
(1, 'Potosí', 4090, 'Activo'),
(1, 'Chuquisaca', 2790, 'Activo'),
(1, 'Tarija', 1854, 'Activo'),
(1, 'Beni', 155, 'Activo'),
(1, 'Pando', 280, 'Activo'),

-- ARGENTINA
(2, 'Buenos Aires', 25, 'Activo'),
(2, 'Córdoba', 360, 'Activo'),
(2, 'Santa Fe', 27, 'Activo'),
(2, 'Mendoza', 746, 'Activo'),
(2, 'Tucumán', 450, 'Activo'),
(2, 'Salta', 1187, 'Activo'),
(2, 'Misiones', 300, 'Activo'),
(2, 'Chaco', 83, 'Activo'),
(2, 'Neuquén', 260, 'Activo'),
(2, 'Río Negro', 240, 'Activo'),
-- BRASIL
(3, 'Acre', 200, 'Activo'),
(3, 'Alagoas', 13, 'Activo'),
(3, 'Amapá', 10, 'Activo'),
(3, 'Amazonas', 92, 'Activo'),
(3, 'Bahía', 20, 'Activo'),
(3, 'Ceará', 16, 'Activo'),
(3, 'Distrito Federal', 1172, 'Activo'),
(3, 'Espírito Santo', 12, 'Activo'),
(3, 'Goiás', 749, 'Activo'),
(3, 'Maranhão', 32, 'Activo'),
(3, 'Mato Grosso', 248, 'Activo'),
(3, 'Mato Grosso do Sul', 310, 'Activo'),
(3, 'Minas Gerais', 570, 'Activo'),
(3, 'Pará', 21, 'Activo'),
(3, 'Paraíba', 36, 'Activo'),
(3, 'Paraná', 945, 'Activo'),
(3, 'Pernambuco', 20, 'Activo'),
(3, 'Piauí', 180, 'Activo'),
(3, 'Rio de Janeiro', 33, 'Activo'),
(3, 'Rio Grande do Norte', 10, 'Activo'),
(3, 'Rio Grande do Sul', 300, 'Activo'),
(3, 'Rondônia', 200, 'Activo'),
(3, 'Roraima', 90, 'Activo'),
(3, 'Santa Catarina', 550, 'Activo'),
(3, 'São Paulo', 760, 'Activo'),
(3, 'Sergipe', 13, 'Activo'),
(3, 'Tocantins', 267, 'Activo');



-- Insertar datos en TbProvincia
-- Departamento de Santa Cruz
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) 
VALUES
(1, 'Andrés Ibáñez', 'Activo'),
(1, 'Ignacio Warnes', 'Activo'),
(1, 'Sara', 'Activo'),
(1, 'Cordillera', 'Activo'),
(1, 'Chiquitos', 'Activo'),
(1, 'Velasco', 'Activo'),
(1, 'Ñuflo de Chávez', 'Activo'),
(1, 'Obispo Santistevan', 'Activo'),
(1, 'Ichilo', 'Activo'),
(1, 'Guarayos', 'Activo'),
(1, 'Vallegrande', 'Activo'),
(1, 'Florida', 'Activo'),
(1, 'Manuel María Caballero', 'Activo'),
(1, 'Germán Busch', 'Activo'),
(1, 'Ángel Sandoval', 'Activo');

-- Departamento de La Paz
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(2, 'Abel Iturralde', 'Activo'),
(2, 'Aroma', 'Activo'),
(2, 'Bautista Saavedra', 'Activo'),
(2, 'Caranavi', 'Activo'),
(2, 'Eliodoro Camacho', 'Activo'),
(2, 'Franz Tamayo', 'Activo'),
(2, 'Gualberto Villarroel', 'Activo'),
(2, 'Ingavi', 'Activo'),
(2, 'Inquisivi', 'Activo'),
(2, 'José Manuel Pando', 'Activo'),
(2, 'José Ramón Loayza', 'Activo'),
(2, 'Larecaja', 'Activo'),
(2, 'Los Andes', 'Activo'),
(2, 'Manco Kapac', 'Activo'),
(2, 'Muñecas', 'Activo'),
(2, 'Nor Yungas', 'Activo'),
(2, 'Omasuyos', 'Activo'),
(2, 'Pacajes', 'Activo'),
(2, 'Pedro Domingo Murillo', 'Activo'),
(2, 'Sud Yungas', 'Activo');

-- Departamento de Cochabamba

-- Provincias del departamento de Cochabamba
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(3, 'Arani', 'Activo'),
(3, 'Arque', 'Activo'),
(3, 'Ayopaya', 'Activo'),
(3, 'Bolívar', 'Activo'),
(3, 'Capinota', 'Activo'),
(3, 'Carrasco', 'Activo'),
(3, 'Cercado', 'Activo'),
(3, 'Chapare', 'Activo'),
(3, 'Esteban Arce', 'Activo'),
(3, 'Germán Jordán', 'Activo'),
(3, 'Mizque', 'Activo'),
(3, 'Narciso Campero', 'Activo'),
(3, 'Punata', 'Activo'),
(3, 'Quillacollo', 'Activo'),
(3, 'Tapacarí', 'Activo'),
(3, 'Tiraque', 'Activo');

-- Provincias del Departamento de Oruro
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(4, 'Cercado', 'Activo'),
(4, 'Tomás Barrón', 'Activo'),
(4, 'Pantaleón Dalence', 'Activo'),
(4, 'Poopó', 'Activo'),
(4, 'Eduardo Avaroa', 'Activo'),
(4, 'Sebastián Pagador', 'Activo'),
(4, 'Saucarí', 'Activo'),
(4, 'Nor Carangas', 'Activo'),
(4, 'San Pedro de Totora', 'Activo'),
(4, 'Carangas', 'Activo'),
(4, 'Sud Carangas', 'Activo'),
(4, 'Ladislao Cabrera', 'Activo'),
(4, 'Litoral', 'Activo'),
(4, 'Sajama', 'Activo'),
(4, 'Sabaya', 'Activo'),
(4, 'Mejillones', 'Activo');

-- Provincias del Departamento de Potosí
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(5, 'Alonso de Ibáñez', 'Activo'),    
(5, 'Antonio Quijarro', 'Activo'),    
(5, 'Bernardino Bilbao', 'Activo'),   
(5, 'Charcas', 'Activo'),             
(5, 'Chayanta', 'Activo'),            
(5, 'Cornelio Saavedra', 'Activo'),   
(5, 'Daniel Campos', 'Activo'),       
(5, 'Enrique Baldivieso', 'Activo'),  
(5, 'José María Linares', 'Activo'),  
(5, 'Modesto Omiste', 'Activo'),      
(5, 'Nor Chichas', 'Activo'),         
(5, 'Nor Lípez', 'Activo'),           
(5, 'Rafael Bustillo', 'Activo'),     
(5, 'Sud Chichas', 'Activo'),         
(5, 'Sud Lípez', 'Activo'),           
(5, 'Tomás Frías', 'Activo');         

-- Provincias del Departamento de Chuquisaca
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(6, 'Azurduy', 'Activo'),
(6, 'Belisario Boeto', 'Activo'),
(6, 'Hernando Siles', 'Activo'),
(6, 'Luis Calvo', 'Activo'),
(6, 'Nor Cinti', 'Activo'),
(6, 'Oropeza', 'Activo'),
(6, 'Sud Cinti', 'Activo'),
(6, 'Tomina', 'Activo'),
(6, 'Yamparáez', 'Activo'),
(6, 'Zudáñez', 'Activo');

-- Provincias del Departamento de Tarija
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(7, 'Aniceto Arce', 'Activo'),
(7, 'Burdett O\'Connor', 'Activo'),
(7, 'Cercado', 'Activo'),
(7, 'Eustaquio Méndez', 'Activo'),
(7, 'Gran Chaco', 'Activo'),
(7, 'José María Avilés', 'Activo');

-- Provincias del Departamento del Beni
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(8, 'Cercado', 'Activo'),
(8, 'Antonio Vaca Díez', 'Activo'),
(8, 'General José Ballivián Segurola', 'Activo'),
(8, 'Yacuma', 'Activo'),
(8, 'Moxos', 'Activo'),
(8, 'Marbán', 'Activo'),
(8, 'Mamoré', 'Activo'),
(8, 'Iténez', 'Activo');

-- Provincias del Departamento de Pando
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(9, 'Abuná', 'Activo'),
(9, 'Federico Román', 'Activo'),
(9, 'Madre de Dios', 'Activo'),
(9, 'Manuripi', 'Activo'),
(9, 'Nicolás Suárez', 'Activo');


-- ARGENTINA
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) 
VALUES 
(10, 'La Plata', 'Activo'),          -- Provincia asociada a Buenos Aires
(11, 'Villa Carlos Paz', 'Activo'),  -- Provincia asociada a Córdoba
(12, 'Rosario', 'Activo'),           -- Provincia asociada a Santa Fe
(13, 'San Rafael', 'Activo'),        -- Provincia asociada a Mendoza
(14, 'San Miguel de Tucumán', 'Activo'), -- Provincia asociada a Tucumán
(15, 'Cafayate', 'Activo'),          -- Provincia asociada a Salta
(16, 'Posadas', 'Activo'),           -- Provincia asociada a Misiones
(17, 'Resistencia', 'Activo'),       -- Provincia asociada a Chaco
(18, 'San Martín de los Andes', 'Activo'), -- Provincia asociada a Neuquén
(19, 'Bariloche', 'Activo');         -- Provincia asociada a Río Negro




-- Insertar datos en TbMunicipio
-- Provincia Andrés Ibáñez, Departamento de Santa Cruz
-- Provincia Andrés Ibáñez (Id_Provincia_Mun = 1)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(1, 'Santa Cruz de la Sierra', 'Activo'),
(1, 'Cotoca', 'Activo'),
(1, 'El Torno', 'Activo'),
(1, 'La Guardia', 'Activo'),
(1, 'Porongo', 'Activo');

-- Provincia Ichilo (Id_Provincia_Mun = 2)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(2, 'Buena Vista', 'Activo'),
(2, 'San Carlos', 'Activo'),
(2, 'Yapacaní', 'Activo'),
(2, 'San Juan de Yapacaní', 'Activo');

-- Provincia Sara (Id_Provincia_Mun = 3)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(3, 'Portachuelo', 'Activo'),
(3, 'Colpa Bélgica', 'Activo'),
(3, 'Santa Rosa del Sara', 'Activo');

-- Provincia Cordillera (Id_Provincia_Mun = 4)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(4, 'Lagunillas', 'Activo'),
(4, 'Camiri', 'Activo'),
(4, 'Charagua', 'Activo'),
(4, 'Cabezas', 'Activo'),
(4, 'Gutiérrez', 'Activo'),
(4, 'Boyuibe', 'Activo'),
(4, 'Cuevo', 'Activo');

-- Provincia Chiquitos (Id_Provincia_Mun = 5)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(5, 'San José de Chiquitos', 'Activo'),
(5, 'Pailón', 'Activo'),
(5, 'Roboré', 'Activo');

-- Provincia Velasco (Id_Provincia_Mun = 6)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(6, 'San Ignacio de Velasco', 'Activo'),
(6, 'San Miguel de Velasco', 'Activo'),
(6, 'San Rafael de Velasco', 'Activo');

-- Provincia Ñuflo de Chávez (Id_Provincia_Mun = 7)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(7, 'Concepción', 'Activo'),
(7, 'San Javier', 'Activo'),
(7, 'San Ramón', 'Activo'),
(7, 'San Julián', 'Activo'),
(7, 'San Antonio de Lomerío', 'Activo');

-- Provincia Obispo Santistevan (Id_Provincia_Mun = 8)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(8, 'Montero', 'Activo'),
(8, 'Mineros', 'Activo'),
(8, 'General Saavedra', 'Activo'),
(8, 'San Pedro', 'Activo'),
(8, 'Fernández Alonso', 'Activo');

-- Provincia Guarayos (Id_Provincia_Mun = 9)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(9, 'Ascensión de Guarayos', 'Activo'),
(9, 'El Puente', 'Activo'),
(9, 'Urubichá', 'Activo');

-- Provincia Germán Busch (Id_Provincia_Mun = 10)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(10, 'Puerto Suárez', 'Activo'),
(10, 'Puerto Quijarro', 'Activo'),
(10, 'El Carmen Rivero Tórrez', 'Activo');

-- Provincia Florida (Id_Provincia_Mun = 11)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(11, 'Samaipata', 'Activo'),
(11, 'Pampa Grande', 'Activo'),
(11, 'Mairana', 'Activo'),
(11, 'Quirusillas', 'Activo');

-- Provincia Vallegrande (Id_Provincia_Mun = 12)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(12, 'Vallegrande', 'Activo'),
(12, 'Moro Moro', 'Activo'),
(12, 'Pucará', 'Activo'),
(12, 'Postrer Valle', 'Activo'),
(12, 'Trigal', 'Activo');

-- Provincia Manuel María Caballero (Id_Provincia_Mun = 13)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(13, 'Comarapa', 'Activo'),
(13, 'Saipina', 'Activo');

-- Provincia Ángel Sandoval (Id_Provincia_Mun = 14)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(14, 'San Matías', 'Activo');

-- Provincia Ignacio Warnes (Id_Provincia_Mun = 15)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(15, 'Warnes', 'Activo'),
(15, 'Okinawa Uno', 'Activo');



-- LA PAZ
-- Provincia: Abel Iturralde
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(16, 'Ixiamas', 'Activo'),
(16, 'San Buenaventura', 'Activo');

-- Provincia: Aroma
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(17, 'Sica Sica', 'Activo'),
(17, 'Umala', 'Activo'),
(17, 'Ayo Ayo', 'Activo'),
(17, 'Calamarca', 'Activo'),
(17, 'Patacamaya', 'Activo'),
(17, 'Colquencha', 'Activo'),
(17, 'Collana', 'Activo');

-- Provincia: Bautista Saavedra
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(18, 'Charazani', 'Activo'),
(18, 'Curva', 'Activo');

-- Provincia: Caranavi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(19, 'Caranavi', 'Activo'),
(19, 'Alto Beni', 'Activo');

-- Provincia: Eliodoro Camacho
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(20, 'Puerto Acosta', 'Activo'),
(20, 'Mocomoco', 'Activo'),
(20, 'Puerto Carabuco', 'Activo'),
(20, 'Escoma', 'Activo'),
(20, 'Humanata', 'Activo');

-- Provincia: Franz Tamayo
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(21, 'Apolo', 'Activo'),
(21, 'Pelechuco', 'Activo');

-- Provincia: Gualberto Villarroel
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(22, 'San Pedro de Curahuara', 'Activo'),
(22, 'Chacarilla', 'Activo');

-- Provincia: Ingavi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(23, 'Viacha', 'Activo'),
(23, 'Guaqui', 'Activo'),
(23, 'Desaguadero', 'Activo'),
(23, 'Taraco', 'Activo'),
(23, 'Tiwanaku', 'Activo'),
(23, 'Jesús de Machaca', 'Activo'),
(23, 'San Andrés de Machaca', 'Activo');

-- Provincia: Inquisivi
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(24, 'Inquisivi', 'Activo'),
(24, 'Quime', 'Activo'),
(24, 'Cajuata', 'Activo'),
(24, 'Colquiri', 'Activo'),
(24, 'Ichoca', 'Activo'),
(24, 'Licoma Pampa', 'Activo'),
(24, 'Villa Libertad Licoma', 'Activo');

-- Provincia: José Manuel Pando
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(25, 'Santiago de Machaca', 'Activo'),
(25, 'Catacora', 'Activo');

-- Provincia: Larecaja
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(26, 'Sorata', 'Activo'),
(26, 'Tacacoma', 'Activo'),
(26, 'Guanay', 'Activo'),
(26, 'Tipuani', 'Activo'),
(26, 'Mapiri', 'Activo'),
(26, 'Teoponte', 'Activo'),
(26, 'Quiabaya', 'Activo'),
(26, 'Combaya', 'Activo'),
(26, 'Chuma', 'Activo'),
(26, 'Ayata', 'Activo');

-- Provincia: Loayza
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(27, 'Luribay', 'Activo'),
(27, 'Sapahaqui', 'Activo'),
(27, 'Yaco', 'Activo'),
(27, 'Malla', 'Activo'),
(27, 'Ichoca', 'Activo'),
(27, 'Cairoma', 'Activo');

-- Provincia: Los Andes
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(28, 'Pucarani', 'Activo'),
(28, 'Batallas', 'Activo'),
(28, 'Laja', 'Activo'),
(28, 'Puerto Pérez', 'Activo'),
(28, 'Pucarani', 'Activo');

-- Provincia: Manco Kapac
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(29, 'Copacabana', 'Activo'),
(29, 'San Pedro de Tiquina', 'Activo');

-- Provincia: Muñecas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(30, 'Chuma', 'Activo'),
(30, 'Ayata', 'Activo');

-- Provincia: Nor Yungas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(31, 'Coroico', 'Activo'),
(31, 'Coroata', 'Activo');

-- Provincia: Omasuyos
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(32, 'Achacachi', 'Activo'),
(32, 'Huarina', 'Activo'),
(32, 'Santiago de Huata', 'Activo');

-- Provincia: Pacajes
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(33, 'Coro Coro', 'Activo'),
(33, 'Caquiaviri', 'Activo'),
(33, 'Calacoto', 'Activo'),
(33, 'Comanche', 'Activo'),
(33, 'Charaña', 'Activo'),
(33, 'Nazacara de Pacajes', 'Activo'),
(33, 'Santiago de Callapa', 'Activo'),
(33, 'Santiago de Machaca', 'Activo');

-- Provincia: Murillo
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(34, 'La Paz', 'Activo'),
(34, 'El Alto', 'Activo'),
(34, 'Achocalla', 'Activo'),
(34, 'Mecapaca', 'Activo'),
(34, 'Palca', 'Activo');

-- Provincia: Sud Yungas
-- Provincia: Sud Yungas
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(35, 'Chulumani', 'Activo'),
(35, 'Irupana', 'Activo'),
(35, 'Yanacachi', 'Activo'),
(35, 'Palos Blancos', 'Activo'),
(35, 'La Asunta', 'Activo');


-- COCHABAMBA

-- Provincia: Arani (Id_Provincia_Mun: 36)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(36, 'Arani', 'Activo'),
(36, 'Vacas', 'Activo');

-- Provincia: Arque (Id_Provincia_Mun: 37)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(37, 'Arque', 'Activo'),
(37, 'Tacopaya', 'Activo');

-- Provincia: Ayopaya (Id_Provincia_Mun: 38)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(38, 'Independencia', 'Activo'),
(38, 'Morochata', 'Activo'),
(38, 'Cocapata', 'Activo');

-- Provincia: Bolívar (Id_Provincia_Mun: 39)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(39, 'Bolívar', 'Activo');

-- Provincia: Capinota (Id_Provincia_Mun: 40)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(40, 'Capinota', 'Activo'),
(40, 'Sicaya', 'Activo'),
(40, 'Santiváñez', 'Activo');

-- Provincia: Carrasco (Id_Provincia_Mun: 41)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(41, 'Totora', 'Activo'),
(41, 'Pocona', 'Activo'),
(41, 'Pojo', 'Activo'),
(41, 'Chimoré', 'Activo'),
(41, 'Puerto Villarroel', 'Activo'),
(41, 'Entre Ríos', 'Activo');

-- Provincia: Cercado (Id_Provincia_Mun: 42)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(42, 'Cochabamba', 'Activo');

-- Provincia: Chapare (Id_Provincia_Mun: 43)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(43, 'Sacaba', 'Activo'),
(43, 'Villa Tunari', 'Activo'),
(43, 'Colomi', 'Activo');

-- Provincia: Esteban Arce (Id_Provincia_Mun: 44)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(44, 'Tarata', 'Activo'),
(44, 'Anzaldo', 'Activo'),
(44, 'Arbieto', 'Activo'),
(44, 'Sacabamba', 'Activo');

-- Provincia: Germán Jordán (Id_Provincia_Mun: 45)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(45, 'Cliza', 'Activo'),
(45, 'Toco', 'Activo'),
(45, 'Tolata', 'Activo');

-- Provincia: Mizque (Id_Provincia_Mun: 46)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(46, 'Mizque', 'Activo'),
(46, 'Alalay', 'Activo'),
(46, 'Vila Vila', 'Activo');

-- Provincia: Narciso Campero (Id_Provincia_Mun: 47)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(47, 'Aiquile', 'Activo'),
(47, 'Omereque', 'Activo'),
(47, 'Pasorapa', 'Activo');

-- Provincia: Punata (Id_Provincia_Mun: 48)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(48, 'Punata', 'Activo'),
(48, 'San Benito', 'Activo'),
(48, 'Villa Rivero', 'Activo'),
(48, 'Cuchumuela', 'Activo'),
(48, 'Tacachi', 'Activo');

-- Provincia: Quillacollo (Id_Provincia_Mun: 49)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(49, 'Quillacollo', 'Activo'),
(49, 'Colcapirhua', 'Activo'),
(49, 'Tiquipaya', 'Activo'),
(49, 'Vinto', 'Activo'),
(49, 'Sipe Sipe', 'Activo');

-- Provincia: Tapacarí (Id_Provincia_Mun: 50)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(50, 'Tapacarí', 'Activo');

-- Provincia: Tiraque (Id_Provincia_Mun: 51)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(51, 'Tiraque', 'Activo'),
(51, 'Shinahota', 'Activo');


-- ORURO
-- Provincia: Cercado (Id_Provincia_Mun: 52)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(52, 'Oruro', 'Activo');

-- Provincia: Tomás Barrón (Id_Provincia_Mun: 53)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(53, 'Eucaliptus', 'Activo');

-- Provincia: Pantaleón Dalence (Id_Provincia_Mun: 54)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(54, 'Huanuni', 'Activo'),
(54, 'Machacamarca', 'Activo');

-- Provincia: Poopó (Id_Provincia_Mun: 55)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(55, 'Poopó', 'Activo'),
(55, 'Pazña', 'Activo'),
(55, 'Antequera', 'Activo');

-- Provincia: Eduardo Avaroa (Id_Provincia_Mun: 56)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(56, 'Challapata', 'Activo'),
(56, 'Santuario de Quillacas', 'Activo');

-- Provincia: Sebastián Pagador (Id_Provincia_Mun: 57)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(57, 'Santiago de Huari', 'Activo');

-- Provincia: Nor Carangas (Id_Provincia_Mun: 58)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(58, 'Huayllamarca', 'Activo');

-- Provincia: Saucarí (Id_Provincia_Mun: 59)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(59, 'Toledo', 'Activo');

-- Provincia: San Pedro de Totora (Id_Provincia_Mun: 60)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(60, 'Totora', 'Activo');

-- Provincia: Carangas (Id_Provincia_Mun: 61)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(61, 'Corque', 'Activo'),
(61, 'Choquecota', 'Activo');

-- Provincia: Sud Carangas (Id_Provincia_Mun: 62)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(62, 'Santiago de Andamarca', 'Activo'),
(62, 'Belén de Andamarca', 'Activo');

-- Provincia: Ladislao Cabrera (Id_Provincia_Mun: 63)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(63, 'Salinas de Garcí Mendoza', 'Activo'),
(63, 'Pampa Aullagas', 'Activo');

-- Provincia: Litoral (Id_Provincia_Mun: 64)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(64, 'Huachacalla', 'Activo'),
(64, 'Escara', 'Activo'),
(64, 'Cruz de Machacamarca', 'Activo'),
(64, 'Yunguyo del Litoral', 'Activo'),
(64, 'Esmeralda', 'Activo');

-- Provincia: Sajama (Id_Provincia_Mun: 65)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(65, 'Curahuara de Carangas', 'Activo'),
(65, 'Turco', 'Activo');

-- Provincia: Sabaya (Id_Provincia_Mun: 66)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(66, 'Sabaya', 'Activo'),
(66, 'Chipaya', 'Activo'),
(66, 'Coipasa', 'Activo');

-- POTOSI
-- Provincia: Alonso de Ibáñez (Id_Provincia_Mun: 67)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(67, 'Sacaca', 'Activo'),
(67, 'Caripuyo', 'Activo');

-- Provincia: Antonio Quijarro (Id_Provincia_Mun: 68)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(68, 'Uyuni', 'Activo'),
(68, 'Tomave', 'Activo');

-- Provincia: Bernardino Bilbao (Id_Provincia_Mun: 69)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(69, 'Arampampa', 'Activo'),
(69, 'Acasio', 'Activo');

-- Provincia: Charcas (Id_Provincia_Mun: 70)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(70, 'San Pedro de Buena Vista', 'Activo'),
(70, 'Toro Toro', 'Activo');

-- Provincia: Chayanta (Id_Provincia_Mun: 71)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(71, 'Colquechaca', 'Activo'),
(71, 'Ocurí', 'Activo'),
(71, 'Ravelo', 'Activo'),
(71, 'Porco', 'Activo');

-- Provincia: Cornelio Saavedra (Id_Provincia_Mun: 72)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(72, 'Betanzos', 'Activo'),
(72, 'Chaquí', 'Activo'),
(72, 'Tacobamba', 'Activo');

-- Provincia: Daniel Campos (Id_Provincia_Mun: 73)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(73, 'Llica', 'Activo'),
(73, 'Tahua', 'Activo');

-- Provincia: Enrique Baldivieso (Id_Provincia_Mun: 74)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(74, 'San Agustín', 'Activo');

-- Provincia: José María Linares (Id_Provincia_Mun: 75)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(75, 'Puna', 'Activo'),
(75, 'Caiza "D"', 'Activo'),
(75, 'Ckochas', 'Activo');

-- Provincia: Modesto Omiste (Id_Provincia_Mun: 76)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(76, 'Villazón', 'Activo'),
(76, 'Mojinete', 'Activo');

-- Provincia: Nor Chichas (Id_Provincia_Mun: 77)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(77, 'Cotagaita', 'Activo'),
(77, 'Vitichi', 'Activo');

-- Provincia: Nor Lípez (Id_Provincia_Mun: 78)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(78, 'Colcha "K"', 'Activo'),
(78, 'San Pedro de Quemes', 'Activo'),
(78, 'San Pablo de Lípez', 'Activo');

-- Provincia: Rafael Bustillo (Id_Provincia_Mun: 79)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(79, 'Uncía', 'Activo'),
(79, 'Chayanta', 'Activo'),
(79, 'Llallagua', 'Activo'),
(79, 'Chuquihuta', 'Activo');

-- Provincia: Sud Chichas (Id_Provincia_Mun: 80)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(80, 'Tupiza', 'Activo'),
(80, 'Atocha', 'Activo');

-- Provincia: Sud Lípez (Id_Provincia_Mun: 81)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(81, 'San Pablo de Lípez', 'Activo'),
(81, 'San Antonio de Esmoruco', 'Activo');

-- Provincia: Tomás Frías (Id_Provincia_Mun: 82)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(82, 'Potosí', 'Activo'),
(82, 'Tinguipaya', 'Activo'),
(82, 'Yocalla', 'Activo'),
(82, 'Urmiri', 'Activo');

-- CHUQUISACA
-- Provincia: Azurduy (Id_Provincia: 83)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(83, 'Villa Azurduy', 'Activo'),
(83, 'Tarvita', 'Activo');

-- Provincia: Belisario Boeto (Id_Provincia: 84)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(84, 'Villa Serrano', 'Activo');

-- Provincia: Hernando Siles (Id_Provincia: 85)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(85, 'Monteagudo', 'Activo'),
(85, 'Huacareta', 'Activo');

-- Provincia: Luis Calvo (Id_Provincia: 86)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(86, 'Villa Vaca Guzmán', 'Activo'),
(86, 'Macharetí', 'Activo'),
(86, 'Huacaya', 'Activo');

-- Provincia: Nor Cinti (Id_Provincia: 87)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(87, 'Camargo', 'Activo'),
(87, 'San Lucas', 'Activo'),
(87, 'Incahuasi', 'Activo'),
(87, 'Villa Charcas', 'Activo');

-- Provincia: Oropeza (Id_Provincia: 88)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(88, 'Sucre', 'Activo'),
(88, 'Poroma', 'Activo'),
(88, 'Yotala', 'Activo');

-- Provincia: Sud Cinti (Id_Provincia: 89)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(89, 'Culpina', 'Activo'),
(89, 'Las Carreras', 'Activo');

-- Provincia: Tomina (Id_Provincia: 90)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(90, 'Padilla', 'Activo'),
(90, 'Tomina', 'Activo'),
(90, 'Sopachuy', 'Activo'),
(90, 'El Villar', 'Activo'),
(90, 'Villa Alcalá', 'Activo');

-- Provincia: Yamparáez (Id_Provincia: 91)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(91, 'Tarabuco', 'Activo'),
(91, 'Yamparáez', 'Activo');

-- Provincia: Zudáñez (Id_Provincia: 92)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(92, 'Villa Zudáñez', 'Activo'),
(92, 'Icla', 'Activo'),
(92, 'Presto', 'Activo'),
(92, 'Mojocoya', 'Activo');


-- Municipios del Departamento de Tarija
-- Provincia: Aniceto Arce (Id_Provincia_Mun: 93)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(93, 'Padcaya', 'Activo'),
(93, 'Bermejo', 'Activo');

-- Provincia: Burdett O'Connor (Id_Provincia_Mun: 94)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(94, 'Entre Ríos', 'Activo');

-- Provincia: Cercado (Id_Provincia_Mun: 95)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(95, 'Tarija', 'Activo');

-- Provincia: Eustaquio Méndez (Id_Provincia_Mun: 96)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(96, 'San Lorenzo', 'Activo'),
(96, 'El Puente', 'Activo');

-- Provincia: Gran Chaco (Id_Provincia_Mun: 97)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(97, 'Yacuiba', 'Activo'),
(97, 'Villamontes', 'Activo'),
(97, 'Caraparí', 'Activo');

-- Provincia: José María Avilés (Id_Provincia_Mun: 98)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(98, 'Uriondo', 'Activo'),
(98, 'Yunchará', 'Activo');

-- Beni
-- Provincia: Cercado (Id_Provincia: 99)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(99, 'Trinidad', 'Activo'),
(99, 'San Javier', 'Activo');

-- Provincia: Antonio Vaca Díez (Id_Provincia: 100)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(100, 'Riberalta', 'Activo'),
(100, 'Guayaramerín', 'Activo');

-- Provincia: General José Ballivián Segurola (Id_Provincia: 101)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(101, 'Reyes', 'Activo'),
(101, 'San Borja', 'Activo'),
(101, 'Santa Rosa', 'Activo'),
(101, 'Rurrenabaque', 'Activo');

-- Provincia: Yacuma (Id_Provincia: 102)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(102, 'Santa Ana del Yacuma', 'Activo'),
(102, 'Exaltación', 'Activo');

-- Provincia: Moxos (Id_Provincia: 103)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(103, 'San Ignacio de Moxos', 'Activo');

-- Provincia: Marbán (Id_Provincia: 104)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(104, 'Loreto', 'Activo'),
(104, 'San Andrés', 'Activo');

-- Provincia: Mamoré (Id_Provincia: 105)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(105, 'San Joaquín', 'Activo'),
(105, 'San Ramón', 'Activo'),
(105, 'Puerto Siles', 'Activo');

-- Provincia: Iténez (Id_Provincia: 106)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(106, 'Magdalena', 'Activo'),
(106, 'Baures', 'Activo'),
(106, 'Huacaraje', 'Activo');


-- Pando
-- Provincia: Abuná (Id_Provincia: 107)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(107, 'Santa Rosa del Abuná', 'Activo'),
(107, 'Santos Mercado', 'Activo');

-- Provincia: Federico Román (Id_Provincia: 108)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(108, 'Nueva Esperanza', 'Activo'),
(108, 'Villa Nueva', 'Activo'),
(108, 'Ingavi', 'Activo');

-- Provincia: Madre de Dios (Id_Provincia: 109)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(109, 'Puerto Gonzalo Moreno', 'Activo'),
(109, 'Sena', 'Activo');

-- Provincia: Manuripi (Id_Provincia: 110)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(110, 'Puerto Rico', 'Activo'),
(110, 'San Pedro', 'Activo'),
(110, 'Filadelfia', 'Activo');

-- Provincia: Nicolás Suárez (Id_Provincia: 111)
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(111, 'Cobija', 'Activo'),
(111, 'Porvenir', 'Activo'),
(111, 'Bolpebra', 'Activo'),
(111, 'Bella Flor', 'Activo'),
(111, 'San Lorenzo', 'Activo');












-- --------------------------------------------------------------------------------------;

INSERT INTO TbPersona (Id_Municipio_Per, CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, Estado_Civil_Per, FDN_Per, Estado_Per)
VALUES
(1, '12345678', 'Juan', 'Perez', 'Gonzalez', 'Masculino', 'Calle 1, Zona Centro', 'Soltero', '1985-07-15', 'Activo'),
(2, '87654321', 'Maria', 'Lopez', 'Martinez', 'Femenino', 'Av. Siempre Viva 742', 'Casada', '1990-04-20', 'Activo'),
(3, '45678912', 'Carlos', 'Sanchez', 'Rodriguez', 'Masculino', 'Calle 10, Zona Norte', 'Divorciado', '1982-12-10', 'Activo'),
(4, '98765432', 'Ana', 'Garcia', 'Fernandez', 'Femenino', 'Av. Los Pinos 101', 'Viuda', '1975-11-05', 'Activo'),
(1, '23456789', 'Luis', 'Morales', 'Vargas', 'Masculino', 'Calle 3, Zona Sur', 'Casado', '1995-08-25', 'Inactivo');



-- Suponiendo que ya existen registros en la tabla TbPersona con Id_Persona 1, 2 y 3.

INSERT INTO TbGeolocalizacion (Id_Persona_Geo, Latitud_Geo, Longitud_Geo, Fecha_Geo, Estado_Geo)
VALUES
(1, '-17.7833', '-63.1833', '2025-01-10', 'Activo'),
(2, '-16.5000', '-68.1500', '2025-01-11', 'Activo'),
(3, '-19.0333', '-65.2600', '2025-01-12', 'Inactivo');




-- Insertar datos en TbSucursal
INSERT INTO TbSucursal (Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc)
VALUES
(1, 1, 'ParamSucursal1', 'Sucursal Central', 'Activo'),
(2, 3, 'ParamSucursal2', 'Sucursal Norte', 'Activo'),
(8, 4, 'ParamSucursal3', 'Sucursal Sur', 'Inactivo');

-- Insertar datos en TbEmpresa
INSERT INTO TbEmpresa (Id_InformacionEmpresa_Emp, Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp)
VALUES
(1, 'Empresa Tech', 2, '2001-05-20', 'S.A.', 'Español', 'Activo'),
(2, 'Empresa Agro', 3, '1998-08-15', 'S.L.', 'Español', 'Activo'),
(3, 'Empresa Educativa', 5, '2010-03-10', 'Autónomo', 'Inglés', 'Inactivo');

-- Insertar datos en TbEmpresaSucursal
INSERT INTO TbEmpresaSucursal (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Estado_ES)
VALUES
    (1, 1, '2015-01-01', 'Activo');


-- Insertar datos en TbInformacionEmpresa
INSERT INTO TbInformacionEmpresa (Id_Empresa, Logo_IE, Regimen_Impositivo_IE, Zona_Horaria_IE, Estado_IE)
VALUES
(1, 'https://acortar.link/cTzeqs', 'Regimen General', 'GMT-5', 'Activo'),
(2, 'https://acortar.link/cTzeqs', 'Regimen Especial', 'GMT-4', 'Activo'),
(3, 'https://acortar.link/cTzeqs', 'Regimen Simplificado', 'GMT-6', 'Inactivo');



INSERT INTO TbEstructura (Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est)
VALUES 
    (1, '2025-01-06', 'Resolución A', 'Activo'),
    (2, '2025-01-01', 'Resolución B', 'Inactivo');



INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are, Nivel_Are)
VALUES 
    (1, '2020-12-12', 'Direccion', 'Res 01/2024', 'Activo', 1),
    (1, '2020-12-12', 'Contabilidad', 'Res 02/2024', 'Activo', 2),
    (1, '2020-12-12', 'Cobro', 'Res 03/2024', 'Activo', 3),
    (1, '2020-12-12', 'Ingreso', 'Res 03/2024', 'Activo', 3),
    (1, '2020-12-12', 'Sistema', 'Res 02/2024', 'Activo', 2),
    (1, '2020-12-12', 'Redes', 'Res 03/2024', 'Activo', 3),
    (1, '2020-12-12', 'Desarrollo', 'Res 02/2024', 'Activo', 3),
    (1, '2020-12-12', 'Base de datos', 'Res 03/2024', 'Activo', 3),
    (1, '2020-12-12', 'Interconexiones', 'Res 03/2024', 'Activo', 3),
    (1, '2020-12-12', 'Requisitos', 'Res 03/2024', 'Activo', 4),
    (1, '2020-12-12', 'Pruebas', 'Res 03/2024', 'Activo', 4);


INSERT INTO TbDependencia (Id_Area_Padre_Dep, Id_Area_Hijo_Dep, Fecha_Asignacion_Dep, Resolucion_Are_Dep, Estado_Dep)
VALUES 
    (1, 2, '2020-12-12', 'Res Dep 1-2', 'Activo'), -- Dirección -> Contabilidad
    (1, 5, '2020-12-12', 'Res Dep 1-5', 'Activo'), -- Dirección -> Sistema
    (2, 3, '2020-12-12', 'Res Dep 2-3', 'Activo'), -- Contabilidad -> Cobro
    (2, 4, '2020-12-12', 'Res Dep 2-4', 'Activo'), -- Contabilidad -> Ingreso
    (5, 6, '2020-12-12', 'Res Dep 5-6', 'Activo'), -- Sistema -> Redes
    (5, 7, '2020-12-12', 'Res Dep 5-7', 'Activo'), -- Sistema -> Desarrollo
    (7, 8, '2020-12-12', 'Res Dep 7-8', 'Activo'), -- Desarrollo -> Base de datos
    (7, 9, '2020-12-12', 'Res Dep 7-9', 'Activo'), -- Desarrollo -> Interconexiones
    (9, 10, '2020-12-12', 'Res Dep 9-10', 'Activo'), -- Interconexiones -> Requisitos
    (9, 11, '2020-12-12', 'Res Dep 9-11', 'Activo'); -- Interconexiones -> Pruebas




INSERT INTO TbCargo (Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep)
VALUES
    ('Gerente General', 1, 15000.00, 2150.00, 'Resolución GG-01', 'Activo'),
    ('Subgerente', 2, 12000.00, 1720.00, 'Resolución SG-02', 'Activo'),
    ('Analista Senior', 3, 9000.00, 1290.00, 'Resolución AS-03', 'Activo'),
    ('Analista Junior', 4, 5000.00, 715.00, 'Resolución AJ-04', 'Inactivo'),
    ('Asistente Administrativo', 5, 3000.00, 430.00, 'Resolución AA-05', 'Activo');
    
    



    
-- Insertar datos en TbEmpleado
INSERT INTO TbEmpleado (Id_Municipio_Emp, CI_Emp, Nombre_Emp, Paterno_Emp, Materno_Emp, Sexo_Emp, Direccion_Emp, Estado_Civil_Emp, FDN_Emp, Estado_Emp)
VALUES
(1, '78945612', 'Luis', 'Martínez', 'Suárez', 'Masculino', 'Calle Independencia', 'Casado', '1988-03-25', 'Activo'),
(2, '65412398', 'María', 'Gómez', 'Loayza', 'Femenino', 'Av. Prado', 'Soltera', '1995-11-30', 'Activo'),
(3, '32198745', 'Jorge', 'Quiroga', 'Cruz', 'Masculino', 'Calle Aroma', 'Divorciado', '1980-07-12', 'Activo');


INSERT INTO TbEmpleadoCargo (Id_Cargo_EC, Id_Empleado_EC, Fecha_Inicio_EC, Fecha_Fin_EC, Estado_EC)
VALUES 
    (1, 1, '2025-01-01', '2025-12-31', 'Activo'),
    (2, 2, '2024-06-01', '2025-05-31', 'Activo'),
    (3, 3, '2023-03-15', '2025-04-20', 'Inactivo');


