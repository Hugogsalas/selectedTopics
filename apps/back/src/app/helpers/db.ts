import { ConnectionPool, config } from 'mssql';

const dbConfig: config = {
  user: 'sa',
  password: 'H0t3lPassword',
  server: 'localhost',
  database: 'HOTEL',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const getDbConnection = async () => {
  try {
    const conn = new ConnectionPool(dbConfig);

    await conn.connect();

    return conn;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
};
