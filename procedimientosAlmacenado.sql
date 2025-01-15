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
