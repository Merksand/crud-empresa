// src/app/hooks/useCrudSocket.js
import { useEffect } from "react";
import useSocket from "@/app/hooks/useSocket";

/**
 * Hook reutilizable para gestionar eventos de Socket.IO en diferentes CRUDs.
 *
 * @param {Object} eventHandlers - Un objeto donde las claves son los nombres de los eventos y los valores son las funciones manejadoras.
 * @returns {Object} socket - Devuelve el objeto socket para su uso directo en el componente si es necesario.
 */
const useCrudSocket = (eventHandlers = {}) => {
    const socket = useSocket(eventHandlers);

    useEffect(() => {
      // se puede borrar jutno con el return si problemas
        console.log("💡 useCrudSocket montado con eventos:", Object.keys(eventHandlers));
        return () => {
            console.log("💡 useCrudSocket desmontado");
        };
    }, [eventHandlers]);

    return socket; // ✅ Devuelve el socket para uso directo si se necesita
};

export default useCrudSocket;
