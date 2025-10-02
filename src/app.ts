import express from "express";
import { initRoutes } from "./routes/index.js";
import { corsMiddleware } from "./config/cors.config.js";


export const createApp = async () => {
    const app = express();
    app.use(corsMiddleware);
    app.use(express.json());

    const routes = await initRoutes();
    app.use('/', routes);

    return app;
};



/*
//logica cors aparte
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export async function initializeApplication() {
    try {
        // llamado a base de datos se debe conectar en logica sepada (to improve)
        await connectDB();
        const app = express();
        const httpServer = createServer(app);
        const io = new Server(httpServer, {
            cors: {
                origin: corsOptions.origin,
                methods: corsOptions.methods,
                allowedHeaders: corsOptions.allowedHeaders,
            }
        });

        io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);

            socket.on("disconnect", () => {
                console.log("A user disconnected:", socket.id);
            });
        });
        app.use(cors(corsOptions));
        app.use(express.json());

        const routes = await initRoutes();
        app.use('/', routes);

        const PORT = process.env.PORT || 3000;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}*/