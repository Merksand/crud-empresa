import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresa',
});
