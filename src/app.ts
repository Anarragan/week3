import express from "express";
import cors from "cors";
import { initRoutes } from "./routes/index.js";
import { sequelize } from "./config/data_base_config.js";
import { connectDB } from "./config/data_base_config.js";

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export async function initializeDatabase() {
    try {
        await connectDB();
        await sequelize.authenticate();
        const app = express();
        app.use(cors(corsOptions));
        app.use(express.json());

        const routes = await initRoutes();
        app.use('/', routes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}