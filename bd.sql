drop database empresa;
CREATE DATABASE empresa;
use empresa;




/*equipo Corleone*/
CREATE TABLE TbSucursal (
    Id_Sucursal              INT PRIMARY KEY AUTO_INCREMENT,
    Id_Municipio_Suc         INT,
    Id_Geolocalizacion_Suc   INT,
    Nombre_Parametro_Suc     VARCHAR(50),
    Nombre_Suc               VARCHAR(50),
    Estado_Suc               VARCHAR(10)
);

CREATE TABLE TbEmpresa (
    Id_Empresa                    INT PRIMARY KEY AUTO_INCREMENT,
    Id_InformacionEmpresa_Emp     INT,
    Nombre_Emp                    VARCHAR(100),
    Sede_Emp                      VARCHAR(50),
    Fecha_Fundacion_Emp           DATE,
    Tipo_Emp                      VARCHAR(50),
    Idioma_Emp                    VARCHAR(50),
    Estado_Emp                    VARCHAR(10)
);

CREATE TABLE TbEmpresaSucursal (
    Id_Empresa_Sucursal              INT PRIMARY KEY AUTO_INCREMENT,
    Id_Empresa_ES                    INT,
    Id_Sucursal_ES                   INT,
    Fecha_Apertura_ES                DATE,
    Fecha_Cierre_ES                  DATE,
    Estado_ES                        VARCHAR(10),
    FOREIGN KEY (Id_Empresa_ES)      REFERENCES TbEmpresa(Id_Empresa),
    FOREIGN KEY (Id_Sucursal_ES)     REFERENCES TbSucursal(Id_Sucursal)
);

CREATE TABLE TbInformacionEmpresa (
    Id_InformacionEmpresa         INT PRIMARY KEY AUTO_INCREMENT,
    Id_Empresa                    INT,
    Logo_IE                       VARCHAR(50),
    Regimen_Impositivo_IE         VARCHAR(50),
    Zona_Horaria_IE               VARCHAR(50),
    Estado_IE                     VARCHAR(10),
    FOREIGN KEY (Id_Empresa)      REFERENCES TbEmpresa(Id_Empresa)
);

/*--04-01--2024*/
CREATE TABLE TbEstructura (
    Id_Estructura                   INT PRIMARY KEY AUTO_INCREMENT,
    Id_Empresa                      INT,
    Fecha_Creacion_Est              DATE, -- Cambio INT por DATE
    Resolucion_Est                  VARCHAR(50),
    Estado_Est                      VARCHAR(10),
    FOREIGN KEY (Id_Empresa)        REFERENCES TbEmpresa(Id_Empresa)
); 

CREATE TABLE TbArea (
    Id_Area                       INT PRIMARY KEY AUTO_INCREMENT,
    Id_Estructura_Ar                 INT,
    Fecha_Creacion_Ar             DATE,  -- Cambie el tipo INT por el DATE
    Nombre_Are                    VARCHAR(50),  
    Resolucion_Are                VARCHAR(50),
    Estado_Are                    VARCHAR(10),
    FOREIGN KEY (Id_Estructura_Ar)      REFERENCES TbEstructura(Id_Estructura)
);

CREATE TABLE TbDependencia (
    Id_Dependencia                       INT PRIMARY KEY AUTO_INCREMENT,
    Id_Area_Padre_Dep                    INT,
    Id_Area_Hijo_Dep                     INT,
    Fecha_Asignacion_Dep                 INT,  
    Resolucion_Are_Dep                   VARCHAR(50),
    Estado_Dep                           VARCHAR(10),
    FOREIGN KEY ( Id_Area_Padre_Dep)     REFERENCES TbArea(Id_Area),
    FOREIGN KEY ( Id_Area_Hijo_Dep)      REFERENCES TbArea(Id_Area)

);

-- Hasta aqui mi parte

CREATE TABLE TbCargo (
    Id_Cargo                             INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Car                           VARCHAR(50),
    Nivel_Car                            INT,
    Sueldo_Car                           DECIMAL,
    Sueldo_USD_Car                       DECIMAL,
    Resolucion_Car                       VARCHAR(50),
    Estado_Dep                           VARCHAR(10)
);

CREATE TABLE TbEmpleado (
    Id_Empleado         INT PRIMARY KEY AUTO_INCREMENT,
    Id_Municipio_Per    INT,
    CI_Emp              VARCHAR(50),
    Nombre_Emp          VARCHAR(50),
    Paterno_Emp         VARCHAR(50),
    Materno_Emp         VARCHAR(50),
    Sexo_Emp            VARCHAR(20),
    Direccion_Emp       VARCHAR(50),
    Estado_Civil_Emp    VARCHAR(20),
    FDN_Emp             DATE,
    Estado_Emp          VARCHAR(10),
    FOREIGN KEY (Id_Municipio_Per) REFERENCES TbMunicipio(Id_Municipio)
);

CREATE TABLE TbEmpleadoCargo (
    Id_EmpleadoCargo          INT PRIMARY KEY AUTO_INCREMENT,
    Id_Cargo_EC               INT,
    Id_Empleado_EC            INT,
    Fecha_Inicio_EC           DATE,
    Fecha_Fin_EC              DATE,
    Estado_EC                 VARCHAR(10),
    FOREIGN KEY (Id_Cargo_EC) REFERENCES TbCargo(Id_Cargo),
    FOREIGN KEY (Id_Empleado_EC) REFERENCES TbEmpleado(Id_Empleado)

);