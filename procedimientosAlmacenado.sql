---CARGO
--GET(ID)
DELIMITER //
CREATE PROCEDURE GetCargoById(
    IN p_Id_Cargo INT
)
BEGIN
    SELECT * FROM TbCargo
    WHERE Id_Cargo = p_Id_Cargo;
END //
DELIMITER ;

--POST - INSERTAR
DELIMITER //
CREATE PROCEDURE InsertCargo (
    IN p_Nombre_Car VARCHAR(50),
    IN p_Nivel_Car INT,
    IN p_Sueldo_Car DECIMAL(10,2),
    IN p_Sueldo_USD_Car DECIMAL(10,2),
    IN p_Resolucion_Car VARCHAR(50)
)
BEGIN
    INSERT INTO TbCargo (Nombre_Car, Nivel_Car, Sueldo_Car, Sueldo_USD_Car, Resolucion_Car, Estado_Dep)
    VALUES (p_Nombre_Car, p_Nivel_Car, p_Sueldo_Car, p_Sueldo_USD_Car, p_Resolucion_Car, 'Activo');
END //
DELIMITER ;

---GET 
DELIMITER //
CREATE PROCEDURE GetActiveCargos()
BEGIN
    SELECT * FROM TbCargo
    WHERE Estado_Dep = 'Activo';
END //
DELIMITER ;


--PUT - ACTUALIZAR
DELIMITER //
CREATE PROCEDURE UpdateCargo (
    IN p_Id_Cargo INT,
    IN p_Nombre_Car VARCHAR(50),
    IN p_Nivel_Car INT,
    IN p_Sueldo_Car DECIMAL(10,2),
    IN p_Sueldo_USD_Car DECIMAL(10,2),
    IN p_Resolucion_Car VARCHAR(50)
)
BEGIN
    UPDATE TbCargo
    SET Nombre_Car = p_Nombre_Car,
        Nivel_Car = p_Nivel_Car,
        Sueldo_Car = p_Sueldo_Car,
        Sueldo_USD_Car = p_Sueldo_USD_Car,
        Resolucion_Car = p_Resolucion_Car
    WHERE Id_Cargo = p_Id_Cargo;
END //
DELIMITER ;


---DELETE - ELIMINAR
DELIMITER //
CREATE PROCEDURE DeleteCargo (
    IN p_Id_Cargo INT
)
BEGIN
    UPDATE TbCargo
    SET Estado_Dep = 'Inactivo'
    WHERE Id_Cargo = p_Id_Cargo;
END //
DELIMITER ;




--ESTRUCTURA
-- Procedimiento para insertar una nueva estructura
DELIMITER //
CREATE PROCEDURE InsertEstructura (
    IN p_Id_Empresa INT,
    IN p_Fecha_Creacion_Est DATE,
    IN p_Resolucion_Est VARCHAR(50)
)
BEGIN
    INSERT INTO TbEstructura (Id_Empresa, Fecha_Creacion_Est, Resolucion_Est, Estado_Est)
    VALUES (p_Id_Empresa, p_Fecha_Creacion_Est, p_Resolucion_Est, 'Activo');
END //
DELIMITER ;

-- Procedimiento para actualizar una estructura existente
DELIMITER //
CREATE PROCEDURE UpdateEstructura (
    IN p_Id_Estructura INT,
    IN p_Id_Empresa INT,
    IN p_Fecha_Creacion_Est DATE,
    IN p_Resolucion_Est VARCHAR(50)
)
BEGIN
    UPDATE TbEstructura
    SET Id_Empresa = p_Id_Empresa,
        Fecha_Creacion_Est = p_Fecha_Creacion_Est,
        Resolucion_Est = p_Resolucion_Est
    WHERE Id_Estructura = p_Id_Estructura;
END //
DELIMITER ;

-- Procedimiento para eliminar una estructura (cambio lógico a inactivo)
DELIMITER //
CREATE PROCEDURE DeleteEstructura (
    IN p_Id_Estructura INT
)
BEGIN
    UPDATE TbEstructura
    SET Estado_Est = 'Inactivo'
    WHERE Id_Estructura = p_Id_Estructura;
END //
DELIMITER ;

-- Procedimiento para obtener todas las estructuras activas
DELIMITER //
CREATE PROCEDURE GetActiveEstructuras ()
BEGIN
    SELECT * FROM TbEstructura
    WHERE Estado_Est = 'Activo';
END //
DELIMITER ;

-- Procedimiento para obtener una estructura específica por ID
DELIMITER //
CREATE PROCEDURE GetEstructuraById (
    IN p_Id_Estructura INT
)
BEGIN
    SELECT * FROM TbEstructura
    WHERE Id_Estructura = p_Id_Estructura;
END //
DELIMITER ;


-- Procedimiento para insertar un nuevo área
DELIMITER //
CREATE PROCEDURE InsertArea (
    IN p_Id_Estructura_Ar INT,
    IN p_Fecha_Creacion_Ar DATE,
    IN p_Nombre_Are VARCHAR(50),
    IN p_Resolucion_Are VARCHAR(50)
)
BEGIN
    INSERT INTO TbArea (Id_Estructura_Ar, Fecha_Creacion_Ar, Nombre_Are, Resolucion_Are, Estado_Are)
    VALUES (p_Id_Estructura_Ar, p_Fecha_Creacion_Ar, p_Nombre_Are, p_Resolucion_Are, 'Activo');
END //
DELIMITER ;

-- Procedimiento para actualizar un área existente
DELIMITER //
CREATE PROCEDURE UpdateArea (
    IN p_Id_Area INT,
    IN p_Id_Estructura_Ar INT,
    IN p_Fecha_Creacion_Ar DATE,
    IN p_Nombre_Are VARCHAR(50),
    IN p_Resolucion_Are VARCHAR(50)
)
BEGIN
    UPDATE TbArea
    SET Id_Estructura_Ar = p_Id_Estructura_Ar,
        Fecha_Creacion_Ar = p_Fecha_Creacion_Ar,
        Nombre_Are = p_Nombre_Are,
        Resolucion_Are = p_Resolucion_Are
    WHERE Id_Area = p_Id_Area;
END //
DELIMITER ;

-- Procedimiento para eliminar un área (cambio lógico a inactivo)
DELIMITER //
CREATE PROCEDURE DeleteArea (
    IN p_Id_Area INT
)
BEGIN
    UPDATE TbArea
    SET Estado_Are = 'Inactivo'
    WHERE Id_Area = p_Id_Area;
END //
DELIMITER ;

-- Procedimiento para obtener todas las áreas activas
DELIMITER //
CREATE PROCEDURE GetActiveAreas ()
BEGIN
    SELECT * FROM TbArea
    WHERE Estado_Are = 'Activo';
END //
DELIMITER ;

-- Procedimiento para obtener un área específica por ID
DELIMITER //
CREATE PROCEDURE GetAreaById (
    IN p_Id_Area INT
)
BEGIN
    SELECT * FROM TbArea
    WHERE Id_Area = p_Id_Area;
END //
DELIMITER ;


