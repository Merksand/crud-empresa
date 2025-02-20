import mysql from 'mysql2/promise';
import 'dotenv/config';

// Configuración para la base de datos `empresa`
export const pool = mysql.createPool({
  host: process.env.DB_HOST_EMPRESA || 'localhost',
  user: process.env.DB_USER_EMPRESA || 'root',
  // password: process.env.DB_PASSWORD_EMPRESA || 'Miguelangelomy1',
  password: process.env.DB_PASSWORD || 'Miguelangelomy1',
  database: process.env.DB_NAME_EMPRESA || 'empresa',
});

// Configuración para la base de datos `clientes`
export const poolInventario = mysql.createPool({
  host: process.env.DB_HOST_CLIENTES || 'localhost',
  user: process.env.DB_USER_CLIENTES || 'root',
  password: process.env.DB_PASSWORD || 'Miguelangelomy1',
  database: process.env.DB_NAME_CLIENTES || 'Bd_INVENTARIO_12022025_2',
});
