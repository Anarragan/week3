import express from "express";
import cors from "cors";
import { initRoutes } from "./routes/index.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

(async () => {
    const routes = await initRoutes();
    app.use('/', routes);
})();

export default app;