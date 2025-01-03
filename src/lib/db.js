import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Miguelangelomy1', // Tu contraseña de MySQL
  database: 'empresa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 