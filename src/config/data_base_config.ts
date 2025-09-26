import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
});

export async function connectDB() {
  try {
    console.log("Intentando conectar a BD...");
    await sequelize.authenticate();
    console.log("Conexión a BD establecida");

    await sequelize.sync();
    console.log("Modelos sincronizados");
  } catch (error) {
    console.error("Error conectando a BD:", error);
  }
}
