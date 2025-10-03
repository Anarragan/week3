import { Server } from "socket.io";
import{  Server as httpServer } from "http";
import jwt from "jsonwebtoken";

export const initSocket = (server: httpServer) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    });

    // middleware for authentication
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.headers['authorization'];
        
        if(!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
            (socket as any).user = decodedToken;
            next();
        } catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }
    });

    //conexion autenticada
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
    return io;
};