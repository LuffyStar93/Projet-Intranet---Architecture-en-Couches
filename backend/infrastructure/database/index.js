import dotenv from 'dotenv';
import mysql from 'mysql2/promise';


dotenv.config();

let connection;

export const connectToDatabase = async () => {
  if (connection) return connection; 

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    });

    console.log('Connexion à MySQL réussie');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion MySQL:', error);
    process.exit(1);
  }
};
