// src/app/hooks/useCrudSocket.js
import { useEffect } from "react";
import useSocket from "@/app/hooks/useSocket";

/**
 * Hook reutilizable para gestionar eventos de Socket.IO en diferentes CRUDs.
 *
 * @param {Object} eventHandlers - Un objeto donde las claves son los nombres de los eventos y los valores son las funciones manejadoras.
 */
const useCrudSocket = (eventHandlers = {}) => {
    const socket = useSocket(eventHandlers);

    useEffect(() => {
        // Any additional side effects can be handled here
    }, [eventHandlers]);

    return socket;
};

export default useCrudSocket;
