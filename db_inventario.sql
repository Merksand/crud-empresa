-- Creación de la base de datos
DROP DATABASE IF EXISTS Bd_INVENTARIO_12022025_2;
CREATE DATABASE IF NOT EXISTS Bd_INVENTARIO_12022025_2;
USE Bd_INVENTARIO_12022025_2;

-- Tabla: TbInv_Sucursal
CREATE TABLE TbInv_Sucursal (
    Id_Sucursal           INT PRIMARY KEY,
    Id_Empresa_Suc        INT,
    Nombre_Parametro_Suc  VARCHAR(50),
    Nombre_Suc            VARCHAR(50),
    Estado_Suc            VARCHAR(10)
);

-- Tabla: TbInv_Industria
CREATE TABLE TbInv_Industria (
    Id_Industria          INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Ind            VARCHAR(50),
    Estado_Pai            VARCHAR(10)
);

-- Tabla: TbInv_Almacen
CREATE TABLE TbInv_Almacen (
    Id_Almacen            INT PRIMARY KEY AUTO_INCREMENT,
    Id_Sucursal_Alm       INT NOT NULL,
    Nombre_Alm            VARCHAR(100) NOT NULL,
    Ubicacion_Alm         VARCHAR(200) NOT NULL,
    Capacidad_maxima_Alm  INT,
    Estado_Alm            VARCHAR(10),
    FOREIGN KEY (Id_Sucursal_Alm) REFERENCES TbInv_Sucursal(Id_Sucursal)
);

-- Tabla: TbInv_Categoria
CREATE TABLE TbInv_Categoria (
    Id_Categoria          INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Cat            VARCHAR(100) NOT NULL,
    Id_Categoria_Padre_Cat INT,
    Estado_Cat             VARCHAR(10),
    FOREIGN KEY (Id_Categoria_Padre_Cat) REFERENCES TbInv_Categoria(Id_Categoria)
);

-- Tabla: TbInv_Marca
CREATE TABLE TbInv_Marca (
    Id_Marca              INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Mar            VARCHAR(100) NOT NULL,
    Estado_Mar            VARCHAR(10)
);

-- Tabla: TbInv_Proveedor
CREATE TABLE TbInv_Proveedor (
    Id_Proveedor          INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Prov           VARCHAR(100) NOT NULL,
    Direccion_Prov        VARCHAR(200),
    Telefono_Prov         VARCHAR(20),
    Correo_Prov           VARCHAR(100),
    Estado_Prov           VARCHAR(10)
);

-- Tabla: TbInv_Producto
CREATE TABLE TbInv_Producto (
    Id_Producto           INT PRIMARY KEY AUTO_INCREMENT,
    Id_Codigo_Pro         INT,
    Id_Categoria_Pro      INT NOT NULL,
    Id_marca_Pro          INT NOT NULL,
    Id_Industria_Pro      INT NOT NULL,
    Codigo_Barras_Pro     TEXT,
    Nombre_Pro            VARCHAR(100) NOT NULL,
    Modelo_Pro            VARCHAR(100) NOT NULL,
    Descripcion_Pro       TEXT,
    Unidad_medida_Pro     VARCHAR(20) NOT NULL,
    Stock_minimo_Pro      INT,
    Stock_maximo_Pro      INT,
    Foto_Pro              TEXT,
    Atributo_Personalizados_Pro TEXT,
    Estado_pro            VARCHAR(10),
    FOREIGN KEY (Id_Categoria_Pro) REFERENCES TbInv_Categoria(Id_Categoria),
    FOREIGN KEY (Id_marca_Pro) REFERENCES TbInv_Marca(Id_Marca),
    FOREIGN KEY (Id_Industria_Pro) REFERENCES TbInv_Industria(Id_Industria)
);

-- Tabla: TbInv_Funcionario
CREATE TABLE TbInv_Funcionario (
    Id_Funcionario        INT PRIMARY KEY AUTO_INCREMENT,
    Id_Persona_Fun        INT, -- Este dato se traerá de otra base de datos
    Nombre_Fun            VARCHAR(100) NOT NULL,
    Apellido_Fun          VARCHAR(100) NOT NULL,
    Cargo_Funcionario     VARCHAR(100) NOT NULL,
    Documento_Fun         VARCHAR(50) UNIQUE NOT NULL,
    Telefono_Fun          VARCHAR(20),
    Correo_Fun            VARCHAR(100),
    Estado_Fun            VARCHAR(10)
);

-- Tabla: TbInv_FuncionarioAlmacen
CREATE TABLE TbInv_FuncionarioAlmacen (
    Id_FuncionarioAlmacen INT PRIMARY KEY AUTO_INCREMENT,
    Id_Funcionario_FA     INT NOT NULL,
    Id_Almacen_FA         INT NOT NULL,
    Fecha_Inicio_FA       DATE NOT NULL,
    Fecha_Fin_FA          DATE NULL,
    Puesto_FA             VARCHAR(100),
    Estado_FA             VARCHAR(10),
    FOREIGN KEY (Id_Funcionario_FA) REFERENCES TbInv_Funcionario(Id_Funcionario),
    FOREIGN KEY (Id_Almacen_FA) REFERENCES TbInv_Almacen(Id_Almacen)
);

-- Tabla: TbInv_Inventario
CREATE TABLE TbInv_Inventario (
    Id_Inventario         INT PRIMARY KEY AUTO_INCREMENT,
    Id_Producto_Inv       INT NOT NULL,
    Id_Almacen_Inv        INT NOT NULL,
    Cantidad_Inv          INT NOT NULL,
    Estado_Inv            VARCHAR(10),
    FOREIGN KEY (Id_Producto_Inv) REFERENCES TbInv_Producto(Id_Producto),
    FOREIGN KEY (Id_Almacen_Inv) REFERENCES TbInv_Almacen(Id_Almacen)
);

-- Tabla: TbInv_TipoMovimiento
CREATE TABLE TbInv_TipoMovimiento (
    Id_TipoMovimiento     INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_TiM            VARCHAR(50) NOT NULL UNIQUE,
    Codigo_TiM            INT,
    Estado_TiM            VARCHAR(10)
);

-- Tabla: TbInv_MetodoValoracion
CREATE TABLE TbInv_MetodoValoracion (
    Id_MetodoValoracion   INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_MeV            VARCHAR(100) NOT NULL UNIQUE,
    Descripcion_MeV       VARCHAR(255),
    Fecha_Creacion_MeV    DATETIME DEFAULT CURRENT_TIMESTAMP,
    Estado_MeV            VARCHAR(10)
);

-- Tabla: TbInv_MovimientoInventario
CREATE TABLE TbInv_MovimientoInventario (
    Id_MovimientoInventario INT PRIMARY KEY AUTO_INCREMENT,
    Id_TipoMovimiento_MoI INT NOT NULL,
    Id_Producto_MoI       INT NOT NULL,
    Id_MetodoValoracion_MoI INT NOT NULL,
    Id_Inventario_MoI     INT NOT NULL,
    Debito_MoI            INT NOT NULL,
    Id_AlmacenOrigen_MoI  INT NULL,
    Id_AlmacenDestino_MoI INT NULL,
    Cantidad_MoI          INT NOT NULL,
    FechaMovimiento_MoI   DATETIME DEFAULT CURRENT_TIMESTAMP,
    Estado_MoI            VARCHAR(10),
    FOREIGN KEY (Id_TipoMovimiento_MoI) REFERENCES TbInv_TipoMovimiento(Id_TipoMovimiento),
    FOREIGN KEY (Id_Producto_MoI) REFERENCES TbInv_Producto(Id_Producto),
    FOREIGN KEY (Id_Inventario_MoI) REFERENCES TbInv_Inventario(Id_Inventario),
    FOREIGN KEY (Id_AlmacenOrigen_MoI) REFERENCES TbInv_Almacen(Id_Almacen),
    FOREIGN KEY (Id_AlmacenDestino_MoI) REFERENCES TbInv_Almacen(Id_Almacen),
    FOREIGN KEY (Id_MetodoValoracion_MoI) REFERENCES TbInv_MetodoValoracion(Id_MetodoValoracion)
);

-- Tabla: TbInv_Bajas
CREATE TABLE TbInv_Bajas (
    Id_Baja               INT PRIMARY KEY AUTO_INCREMENT,
    Id_Movimiento_Baj     INT NOT NULL,
    Motivo_Baj            VARCHAR(255),
    Autorizacion_Baj      VARCHAR(100),
    Fecha_Baj             DATETIME DEFAULT CURRENT_TIMESTAMP,
    Estado_Baj            VARCHAR(10),
    FOREIGN KEY (Id_Movimiento_Baj) REFERENCES TbInv_MovimientoInventario(Id_MovimientoInventario)
);

-- Tabla: TbInv_Devoluciones
CREATE TABLE TbInv_Devoluciones (
    Id_Dev                INT PRIMARY KEY AUTO_INCREMENT,
    Id_Movimiento_Dev     INT NOT NULL,
    Motivo_Dev            VARCHAR(255),
    Autorizacion_Dev      VARCHAR(100),
    Fecha_Dev             DATETIME DEFAULT CURRENT_TIMESTAMP,
    Estado_Dev            VARCHAR(10),
    FOREIGN KEY (Id_Movimiento_Dev) REFERENCES TbInv_MovimientoInventario(Id_MovimientoInventario)
);

-- Tabla: TbInv_Ajustes
CREATE TABLE TbInv_Ajustes (
    Id_Ajuste             INT PRIMARY KEY AUTO_INCREMENT,
    Id_Movimiento_Aju     INT NOT NULL,
    Motivo_Aju            VARCHAR(255),
    FechaAju              DATETIME DEFAULT CURRENT_TIMESTAMP,
    Estado_Aju            VARCHAR(10),
    FOREIGN KEY (Id_Movimiento_Aju) REFERENCES TbInv_MovimientoInventario(Id_MovimientoInventario)
);

-- Tabla: TbInv_Lote
CREATE TABLE TbInv_Lote (
    Id_Lote               INT PRIMARY KEY AUTO_INCREMENT,
    NroLote_Lot           INT NOT NULL,
    Descripcion_Lot       VARCHAR(255),
    CodigoBarras_Lot      TEXT,
    FechaVencimiento_Lot  DATE,
    Estado_Lot            VARCHAR(10)
);

-- Tabla: TbInv_LoteProductos
CREATE TABLE TbInv_LoteProductos (
    Id_LoteProductos      INT PRIMARY KEY AUTO_INCREMENT,
    Id_Lote_LoP           INT NOT NULL,
    Id_Producto_LoP       INT NOT NULL,
    Cantidad_LoP          INT,
    Estado_LoP            VARCHAR(10),
    FOREIGN KEY (Id_Lote_LoP) REFERENCES TbInv_Lote(Id_Lote),
    FOREIGN KEY (Id_Producto_LoP) REFERENCES TbInv_Producto(Id_Producto)
);

-- Tabla: TbInv_Moneda
CREATE TABLE TbInv_Moneda (
    Id_Moneda             INT PRIMARY KEY AUTO_INCREMENT,
    Codigo_Mon            VARCHAR(3) NOT NULL,
    Nombre_Mon            VARCHAR(50) NOT NULL,
    Estado_Mon            VARCHAR(10)
);

-- Tabla: TbInv_TipoCambio
CREATE TABLE TbInv_TipoCambio (
    Id_TipoCambio         INT PRIMARY KEY AUTO_INCREMENT,
    Id_Moneda_TiC         INT NOT NULL,
    Fecha_TiC             DATE NOT NULL,
    TasaCambio_TiC        DECIMAL(18, 6) NOT NULL,
    Estado_TiC            VARCHAR(10),
    FOREIGN KEY (Id_Moneda_TiC) REFERENCES TbInv_Moneda(Id_Moneda)
);

-- Tabla: TbInv_OrdenesCompra
CREATE TABLE TbInv_OrdenesCompra (
    Id_OrdenCompra        INT PRIMARY KEY AUTO_INCREMENT,
    Id_Sucursal_OdC       INT,
    Id_Proveedor_OdC      INT,
    Id_Moneda_Odc         INT,
    FechaOrden_OdC        DATE NOT NULL,
    Monto_OdC             DECIMAL(18, 2) NOT NULL,
    Impuestos_OdC         DECIMAL(18, 2) NOT NULL,
    Descuento_OdC         DECIMAL(18, 2) NOT NULL,
    Sub_Total_OdC         DECIMAL(18, 2) NOT NULL,
    TotalPagado_OdC       DECIMAL(18, 2) NOT NULL,
    Estado_OdC            VARCHAR(10),
    FOREIGN KEY (Id_Sucursal_OdC) REFERENCES TbInv_Sucursal(Id_Sucursal),
    FOREIGN KEY (Id_Proveedor_OdC) REFERENCES TbInv_Proveedor(Id_Proveedor),
    FOREIGN KEY (Id_Moneda_Odc) REFERENCES TbInv_Moneda(Id_Moneda)
);