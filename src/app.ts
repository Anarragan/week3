import express from "express";
import cors from "cors";
import { initRoutes } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
    const routes = await initRoutes();
    app.use('/', routes);
})();

export default app;