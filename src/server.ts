import { createServer } from "http";
import { createApp } from "./app.js";
import { initSocket } from "./config/socket.config.js";
import { connectDB } from "./config/data_base_config.js";

export async function initializeApplication() {
    try {
        await connectDB();
        const app = await createApp();
        const httpServer = createServer(app);
        initSocket(httpServer);

        const PORT = process.env.PORT || 3000;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

initializeApplication();