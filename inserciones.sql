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
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(1, 'Andrés Ibáñez', 'Activo'),
(1, 'Ignacio Warnes', 'Activo'),
(1, 'Sara', 'Activo');

-- Departamento de La Paz
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(2, 'Murillo', 'Activo'),
(2, 'Pacajes', 'Activo'),
(2, 'Omasuyos', 'Activo');

-- Departamento de Cochabamba
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(3, 'Cercado', 'Activo'),
(3, 'Quillacollo', 'Activo'),
(3, 'Chapare', 'Activo');

-- Departamento de Oruro
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(4, 'Cercado', 'Activo'),
(4, 'Sajama', 'Activo'),
(4, 'Ladislao Cabrera', 'Activo');

-- Departamento de Potosí
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(5, 'Tomás Frías', 'Activo'),
(5, 'Nor Chichas', 'Activo'),
(5, 'Sud Chichas', 'Activo');

-- Departamento de Chuquisaca
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(6, 'Oropeza', 'Activo'),
(6, 'Yamparáez', 'Activo'),
(6, 'Tomina', 'Activo');

-- Departamento de Tarija
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(7, 'Cercado', 'Activo'),
(7, 'Arce', 'Activo'),
(7, 'Gran Chaco', 'Activo');

-- Departamento de Beni
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(8, 'Cercado', 'Activo'),
(8, 'Yacuma', 'Activo'),
(8, 'Moxos', 'Activo');

-- Departamento de Pando
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) VALUES
(9, 'Nicolás Suárez', 'Activo'),
(9, 'Manuripi', 'Activo'),
(9, 'Madre de Dios', 'Activo');

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
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(1, 'Santa Cruz de la Sierra', 'Activo'),
(1, 'Cotoca', 'Activo');

-- Provincia Ignacio Warnes, Departamento de Santa Cruz
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(2, 'Warnes', 'Activo'),
(2, 'Okinawa Uno', 'Activo');

-- Provincia Sara, Departamento de Santa Cruz
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(3, 'Portachuelo', 'Activo'),
(3, 'Santa Rosa del Sara', 'Activo');

-- Provincia Murillo, Departamento de La Paz
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(4, 'La Paz', 'Activo'),
(4, 'El Alto', 'Activo');

-- Provincia Pacajes, Departamento de La Paz
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(5, 'Coro Coro', 'Activo'),
(5, 'Santiago de Callapa', 'Activo');

-- Provincia Omasuyos, Departamento de La Paz
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(6, 'Achacachi', 'Activo'),
(6, 'Huarina', 'Activo');

-- Provincia Cercado, Departamento de Cochabamba
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(7, 'Cochabamba', 'Activo'),
(7, 'Colcapirhua', 'Activo');

-- Provincia Quillacollo, Departamento de Cochabamba
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(8, 'Quillacollo', 'Activo'),
(8, 'Vinto', 'Activo');

-- Provincia Chapare, Departamento de Cochabamba
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(9, 'Villa Tunari', 'Activo'),
(9, 'Shinahota', 'Activo');

-- Provincia Cercado, Departamento de Oruro
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(10, 'Oruro', 'Activo'),
(10, 'Eucaliptus', 'Activo');

-- Provincia Sajama, Departamento de Oruro
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(11, 'Curahuara de Carangas', 'Activo'),
(11, 'Turco', 'Activo');

-- Provincia Ladislao Cabrera, Departamento de Oruro
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(12, 'Salinas de Garci Mendoza', 'Activo'),
(12, 'Pampa Aullagas', 'Activo');

-- Provincia Tomás Frías, Departamento de Potosí
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(13, 'Potosí', 'Activo'),
(13, 'Tinguipaya', 'Activo');
-- Provincia Tomás Frías, Departamento de Potosí
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(13, 'Potosí', 'Activo'),
(13, 'Tinguipaya', 'Activo');

-- Provincia Nor Chichas, Departamento de Potosí
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(14, 'Cotagaita', 'Activo'),
(14, 'Vitichi', 'Activo');

-- Provincia Sud Chichas, Departamento de Potosí
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(15, 'Tupiza', 'Activo'),
(15, 'Villazón', 'Activo');

-- Provincia Oropeza, Departamento de Chuquisaca
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(16, 'Sucre', 'Activo'),
(16, 'Yotala', 'Activo');

-- Provincia Yamparáez, Departamento de Chuquisaca
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(17, 'Tarabuco', 'Activo'),
(17, 'Yamparáez', 'Activo');

-- Provincia Tomina, Departamento de Chuquisaca
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(18, 'Padilla', 'Activo'),
(18, 'Villa Serrano', 'Activo');

-- Provincia Cercado, Departamento de Tarija
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(19, 'Tarija', 'Activo'),
(19, 'San Lorenzo', 'Activo');

-- Provincia Arce, Departamento de Tarija
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(20, 'Padcaya', 'Activo'),
(20, 'Bermejo', 'Activo');

-- Provincia Gran Chaco, Departamento de Tarija
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(21, 'Yacuiba', 'Activo'),
(21, 'Villamontes', 'Activo');

-- Provincia Cercado, Departamento de Beni
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(22, 'Trinidad', 'Activo'),
(22, 'San Javier', 'Activo');

-- Provincia Yacuma, Departamento de Beni
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(23, 'Santa Ana del Yacuma', 'Activo'),
(23, 'Exaltación', 'Activo');

-- Provincia Moxos, Departamento de Beni
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(24, 'San Ignacio de Moxos', 'Activo'),
(24, 'Loreto', 'Activo');

-- Provincia Nicolás Suárez, Departamento de Pando
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(25, 'Cobija', 'Activo'),
(25, 'Porvenir', 'Activo');

-- Provincia Manuripi, Departamento de Pando
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(26, 'Puerto Rico', 'Activo'),
(26, 'San Pedro', 'Activo');

-- Provincia Madre de Dios, Departamento de Pando
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) VALUES
(27, 'Puerto Gonzalo Moreno', 'Activo'),
(27, 'San Lorenzo', 'Activo');

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
(1, 'Empresa Tech', 2, '2001-05-20', 'Tecnología', 'Español', 'Activo'),
(2, 'Empresa Agro', 3, '1998-08-15', 'Agrícola', 'Español', 'Activo'),
(3, 'Empresa Educativa', 5, '2010-03-10', 'Educación', 'Inglés', 'Inactivo');

-- Insertar datos en TbEmpresaSucursal
INSERT INTO TbEmpresaSucursal (Id_Empresa_ES, Id_Sucursal_ES, Fecha_Apertura_ES, Fecha_Cierre_ES, Estado_ES)
VALUES
    (1, 1, '2015-01-01', '2022-05-01', 'Activo');


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



 
		INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are)
	VALUES 
		(1, '2016-06-15', 'Área de Marketing', 'Resolución 1', 'Activo'),
        (1, '2012-01-25', 'Área de Consultas', 'Resolución 2', 'Activo');
        
        -- Inserción 1
INSERT INTO TbDependencia (Id_Area_Padre_Dep, Id_Area_Hijo_Dep, Fecha_Asignacion_Dep, Resolucion_Are_Dep, Estado_Dep)
VALUES (1, 2, '2022-01-01', 'Resolución A', 'Activo');



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


