-- Seleccionamos la base de datos
USE empresa;

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
    (1, '2016-06-15', 'Área de Marketing', 'Resolución 1', 'Activo');



INSERT INTO TbCargo (Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep)
VALUES 
('Gerente General', 1, 15000.00, 2150.00, 'Resolución-001', 'activo'),
('Supervisor', 2, 8000.00, 1145.00, 'Resolución-002', 'activo');



-- Insertar datos en TbDepartamento
INSERT INTO TbDepartamento (Nombre_Dep, Altura_Dep, Estado_Dep) 
VALUES 
('Santa Cruz', 416, 'Activo'),
('La Paz', 3640, 'Activo'),
('Cochabamba', 2558, 'Activo');

-- Insertar datos en TbProvincia
INSERT INTO TbProvincia (Id_Departamento_Pro, Nombre_Pro, Estado_Pro) 
VALUES 
(1, 'Andrés Ibáñez', 'Activo'),
(2, 'Murillo', 'Activo'),
(3, 'Cercado', 'Activo');

-- Insertar datos en TbMunicipio
INSERT INTO TbMunicipio (Id_Provincia_Mun, Nombre_Mun, Estado_Mun) 
VALUES 
(1, 'Santa Cruz de la Sierra', 'Activo'),
(2, 'La Paz', 'Activo'),
(3, 'Cochabamba', 'Activo');

-- Insertar datos en TbEmpleado
INSERT INTO TbEmpleado (Id_Municipio_Emp, CI_Emp, Nombre_Emp, Paterno_Emp, Materno_Emp, Sexo_Emp, Direccion_Emp, Estado_Civil_Emp, FDN_Emp, Estado_Emp)
VALUES
(1, '78945612', 'Luis', 'Martínez', 'Suárez', 'Masculino', 'Calle Independencia', 'Casado', '1988-03-25', 'Activo'),
(2, '65412398', 'María', 'Gómez', 'Loayza', 'Femenino', 'Av. Prado', 'Soltera', '1995-11-30', 'Activo'),
(3, '32198745', 'Jorge', 'Quiroga', 'Cruz', 'Masculino', 'Calle Aroma', 'Divorciado', '1980-07-12', 'Activo');

