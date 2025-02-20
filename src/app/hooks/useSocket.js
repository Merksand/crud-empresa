// src/app/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

let socket;

const useSocket = (eventHandlers = {}) => {
    useEffect(() => {
        if (!socket) {
            socket = io("http://localhost:4000", {
                transports: ["websocket"],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000,
                withCredentials: true
            });

            socket.on("connect", () => {
                console.log("✅ Socket conectado:", socket.id);
            });

            socket.on("disconnect", () => {
                console.log("❌ Socket desconectado");
            });
        }

        // Asignar los eventos específicos del CRUD
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            if (!socket.hasListeners(event)) {
                socket.on(event, handler);
            }
        });

        return () => {
            console.log("⚠️ Socket sigue conectado");
        };
    }, [eventHandlers]);
};

export default useSocket;
