-- Seleccionamos la base de datos
USE empresa;

-- Insertar datos en TbDepartamento
INSERT INTO TbDepartamento (Nombre_Dep, Altura_Dep, Estado_Dep) 
VALUES 
('Santa Cruz', 416, 'Activo'),
('La Paz', 3640, 'Activo'),
('Cochabamba', 2558, 'Activo'),
('Oruro', 3706, 'Activo'),
('Potosí', 4090, 'Activo'),
('Chuquisaca', 2790, 'Activo'),
('Tarija', 1854, 'Activo'),
('Beni', 155, 'Activo'),
('Pando', 280, 'Activo');


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





-- Insertar datos en TbSucursal
INSERT INTO TbSucursal (Id_Municipio_Suc, Id_Geolocalizacion_Suc, Nombre_Parametro_Suc, Nombre_Suc, Estado_Suc)
VALUES
(101, 1001, 'ParamSucursal1', 'Sucursal Central', 'Activo'),
(102, 1002, 'ParamSucursal2', 'Sucursal Norte', 'Activo'),
(103, 1003, 'ParamSucursal3', 'Sucursal Sur', 'Inactivo');

-- Insertar datos en TbEmpresa
INSERT INTO TbEmpresa (Id_InformacionEmpresa_Emp, Nombre_Emp, Sede_Emp, Fecha_Fundacion_Emp, Tipo_Emp, Idioma_Emp, Estado_Emp)
VALUES
(1, 'Empresa Tech', 'Ciudad Central', '2001-05-20', 'Tecnología', 'Español', 'Activo'),
(2, 'Empresa Agro', 'Ciudad Norte', '1998-08-15', 'Agrícola', 'Español', 'Activo'),
(3, 'Empresa Educativa', 'Ciudad Sur', '2010-03-10', 'Educación', 'Inglés', 'Inactivo');

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
    ('Asistente Administrativo', 5, 3000.00, 430.00, 'Resolución AA-05', 'Suspendido');
    
    



    
-- Insertar datos en TbEmpleado
INSERT INTO TbEmpleado (Id_Municipio_Emp, CI_Emp, Nombre_Emp, Paterno_Emp, Materno_Emp, Sexo_Emp, Direccion_Emp, Estado_Civil_Emp, FDN_Emp, Estado_Emp)
VALUES
(1, '78945612', 'Luis', 'Martínez', 'Suárez', 'Masculino', 'Calle Independencia', 'Casado', '1988-03-25', 'Activo'),
(2, '65412398', 'María', 'Gómez', 'Loayza', 'Femenino', 'Av. Prado', 'Soltera', '1995-11-30', 'Activo'),
(3, '32198745', 'Jorge', 'Quiroga', 'Cruz', 'Masculino', 'Calle Aroma', 'Divorciado', '1980-07-12', 'Activo');




