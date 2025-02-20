// socketServer.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // ✅ Permite conexiones desde Next.js
        methods: ["GET", "POST"],
        credentials: true // ✅ Permite el envío de cookies y autenticación si es necesario
    }
});

app.use(express.json());

// socketServer.js
app.post("/emit-event", (req, res) => {
    const { event, data } = req.body;
    if (!event || !data) {
        return res.status(400).json({ error: "Evento y datos son requeridos" });
    }

    console.log(`🔔 Emitiendo evento: ${event} con datos:`, data);
    io.emit(event, data); // ✅ Emite el evento a todos los clientes conectados
    res.status(200).json({ message: `Evento ${event} emitido correctamente` });
});


io.on("connection", (socket) => {
    console.log(`✅ Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
});

const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Socket.IO ejecutándose en el puerto ${PORT}`);
});
