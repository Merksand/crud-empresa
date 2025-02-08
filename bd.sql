drop database empresa;
CREATE DATABASE empresa;
use empresa;

-- Tabla: TbPais
CREATE TABLE TbPais (
    Id_Pais INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Pai VARCHAR(50),
    Moneda_Pai VARCHAR(50),
    Idioma_Pai VARCHAR(50),
    Latitud_Pai INT,
    Longitud_Pai INT,
    Regimen_Impositivo_Pai VARCHAR(50),
    IVA_Pai INT,
    Estado_Dep VARCHAR(10)
);

-- Tabla: TbDepartamento
CREATE TABLE TbDepartamento (
    Id_Departamento INT AUTO_INCREMENT PRIMARY KEY,
    Id_Pais_Dep INT,
    Nombre_Dep VARCHAR(50),
    Altura_Dep INT,
    Estado_Dep VARCHAR(10),
    FOREIGN KEY (Id_Pais_Dep) REFERENCES TbPais(Id_Pais)
);





CREATE TABLE TbProvincia (
    Id_Provincia INT PRIMARY KEY AUTO_INCREMENT,
    Id_Departamento_Pro INT,
    Nombre_Pro VARCHAR(50),
    Estado_Pro VARCHAR(10),
    FOREIGN KEY (Id_Departamento_Pro) REFERENCES TbDepartamento(Id_Departamento)
);

CREATE TABLE TbMunicipio (
    Id_Municipio INT PRIMARY KEY AUTO_INCREMENT,
    Id_Provincia_Mun INT,
    Nombre_Mun VARCHAR(50),
    Estado_Mun VARCHAR(10),
    FOREIGN KEY (Id_Provincia_Mun) REFERENCES TbProvincia(Id_Provincia)
);


CREATE TABLE TbPersona (
    Id_Persona INT PRIMARY KEY AUTO_INCREMENT,
    Id_Municipio_Per INT,
    CI_Per VARCHAR(50),
    Nombre_Per VARCHAR(50),
    Paterno_Per VARCHAR(50),
    Materno_Per VARCHAR(50),
    Sexo_Per VARCHAR(20),
    Direccion_Per VARCHAR(50),
    Estado_Civil_Per VARCHAR(20),
    FDN_Per DATE,
    Estado_Per VARCHAR(10),
    FOREIGN KEY (Id_Municipio_Per) REFERENCES TbMunicipio(Id_Municipio)
);

CREATE TABLE TbGeolocalizacion (
    Id_Geolocalizacion INT AUTO_INCREMENT PRIMARY KEY,
    Id_Persona_Geo INT,
    Latitud_Geo VARCHAR(50),
    Longitud_Geo VARCHAR(50),
    Fecha_Geo DATE,
    Estado_Geo VARCHAR(10),
    FOREIGN KEY (Id_Persona_Geo) REFERENCES TbPersona(Id_Persona)
);


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



CREATE TABLE TbEmpresaPais (
    Id_EmpresaPais INT auto_increment PRIMARY KEY,
    Id_Empresa_EP INT,
    Id_Pais_EP INT,
    Fecha_Inicio_EP DATE,
    Fecha_Fin_EP DATE,
    Estado_EC VARCHAR(10),
    FOREIGN KEY (Id_Empresa_EP) REFERENCES TbEmpresa(Id_Empresa),
    FOREIGN KEY (Id_Pais_EP) REFERENCES TbPais(Id_Pais)
);




CREATE TABLE TbEmpresaSucursal (
    Id_Empresa_Sucursal              INT PRIMARY KEY AUTO_INCREMENT,
    Id_Empresa_ES                    INT,
    Id_Sucursal_ES                   INT,
    Fecha_Apertura_ES                DATE,
    -- Fecha_Cierre_ES                  DATE,
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
    Nivel_Are					  VARCHAR(10),
    FOREIGN KEY (Id_Estructura_Ar)      REFERENCES TbEstructura(Id_Estructura)
);

CREATE TABLE TbDependencia (
    Id_Dependencia                       INT PRIMARY KEY AUTO_INCREMENT,
    Id_Area_Padre_Dep                    INT,
    Id_Area_Hijo_Dep                     INT,
    Fecha_Asignacion_Dep                 DATE, -- CAMBIO  
    Resolucion_Are_Dep                   VARCHAR(50),
    Estado_Dep                           VARCHAR(10),
    FOREIGN KEY ( Id_Area_Padre_Dep)     REFERENCES TbArea(Id_Area),
    FOREIGN KEY ( Id_Area_Hijo_Dep)      REFERENCES TbArea(Id_Area)
);

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
    Id_Municipio_Emp    INT,
    CI_Emp              VARCHAR(50),
    Nombre_Emp          VARCHAR(50),
    Paterno_Emp         VARCHAR(50),
    Materno_Emp         VARCHAR(50),
    Sexo_Emp            VARCHAR(20),
    Direccion_Emp       VARCHAR(50),
    Estado_Civil_Emp    VARCHAR(20),
    FDN_Emp             DATE,
    Estado_Emp          VARCHAR(10),
    FOREIGN KEY (Id_Municipio_Emp) REFERENCES TbMunicipio(Id_Municipio)
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


CREATE TABLE TbUsuario (
	Id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
	-- Id_Funcionario_Usu INT,
	F_Creacion_Usu DATETIME DEFAULT current_timestamp ,
	login_Usu VARCHAR(50),
	Estado_Usu VARCHAR(10)
	-- FOREIGN KEY (Id_Funcionario_Usu) REFERENCES TbFuncionario(Id_Funcionario)
);

CREATE TABLE TbPassword (
    Id_Password INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_Pas VARCHAR(10),
    Fecha_Pas DATETIME DEFAULT current_timestamp,
    Password_Pas VARCHAR(90),
    Estado_Pas VARCHAR(10)
);

CREATE TABLE TbUsuarioPassword (
    Id_Usuario_UP INT,
    Id_Password_UP INT,
    FOREIGN KEY (Id_Usuario_UP) REFERENCES TbUsuario(Id_Usuario),
    FOREIGN KEY (Id_Password_UP) REFERENCES TbPassword(Id_Password)
);

CREATE TABLE TbRol (
    Id_Rol INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Rol VARCHAR(50),
    Identificador_Rol VARCHAR(20),
    Estado_Rol VARCHAR(10)
);

CREATE TABLE TbRol_Usuario (
    Id_Rol_RU INT,
    Id_Usu_RU INT,
    Fecha_RU DATETIME,
    Estado_RU VARCHAR(10),
    FOREIGN KEY (Id_Rol_RU) REFERENCES TbRol(Id_Rol),
    FOREIGN KEY (Id_Usu_RU) REFERENCES TbUsuario(Id_Usuario)
);



----INVENTARIO


CREATE TABLE TbInv_Sucursal (
    Id_Sucursal             INT PRIMARY KEY AUTO_INCREMENT,
    Id_Empresa_Suc         INT,
    Nombre_Parametro_Suc    VARCHAR(50),
    Nombre_Suc             VARCHAR(50),
    Estado_Suc             VARCHAR(10)
);

CREATE TABLE TbInv_Industria (
    Id_Industria     INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Ind       VARCHAR(50),
    Estado_Pai       VARCHAR(10)
);

-- Tabla: Tb_Inv_Almacen
CREATE TABLE Tb_Inv_Almacen (
    Id_Almacen             INT PRIMARY KEY AUTO_INCREMENT,
    Id_Sucursal_Alm        INT NOT NULL,
    Nombre_Alm             VARCHAR(100) NOT NULL,
    Ubicacion_Alm          VARCHAR(200) NOT NULL,
    Capacidad_maxima_Alm   INT,
    Estado_Alm             VARCHAR(10),
    FOREIGN KEY (Id_Sucursal_Alm) REFERENCES TbInv_Sucursal(Id_Sucursal)
);

-- Tabla: Categoria
CREATE TABLE TbInv_Categoria (
    Id_Categoria             INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Cat               VARCHAR(100) NOT NULL,
    Id_Categoria_Padre_Cat   INT NULL,
    Estado_Cat               INT,
    FOREIGN KEY (Id_Categoria_Padre_Cat) REFERENCES TbInv_Categoria(Id_Categoria)
);

-- Tabla: Marca
CREATE TABLE TbInv_Marca (
    Id_Marca      INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Mar    VARCHAR(100) NOT NULL,
    Estado_Mar    VARCHAR(10)
);

-- Tabla: Proveedor
CREATE TABLE TbInv_Proveedor (
    Id_Proveedor      INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Prov       VARCHAR(100) NOT NULL,
    Direccion_Prov    VARCHAR(200),
    Telefono_Prov     VARCHAR(20),
    Correo_Prov       VARCHAR(100),
    Estado_Prov       VARCHAR(10)
);

-- Tabla: Producto
CREATE TABLE TbInv_Producto (
    Id_Producto                     INT PRIMARY KEY AUTO_INCREMENT,
    Id_Categoria_Pro                INT NOT NULL,
    Id_marca_Pro                    INT NOT NULL,
    Id_Industria_Pro                INT NOT NULL,
    Nombre_Pro                      VARCHAR(100) NOT NULL,
    Modelo_Pro                      VARCHAR(100) NOT NULL,
    Descripcion_Pro                 TEXT,
    Unidad_medida_Pro               VARCHAR(20) NOT NULL,
    Stock_minimo_Pro                INT,
    Stock_maximo_Pro                INT,
    Foto_Pro                        TEXT,
    Atributo_Personalizados_Pro     TEXT,
    FOREIGN KEY (Id_Categoria_Pro) REFERENCES TbInv_Categoria(Id_Categoria),
    FOREIGN KEY (Id_marca_Pro) REFERENCES TbInv_Marca(Id_Marca),
    FOREIGN KEY (Id_Industria_Pro) REFERENCES TbInv_Industria(Id_Industria)
);









