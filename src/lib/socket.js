// src/app/lib/socket.js

export const emitEvent = async (event, data) => {
  try {
      const response = await fetch("http://localhost:4000/emit-event", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ event, data })
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error al emitir evento: ${response.status} - ${errorMessage}`);
      }

      console.log(`✅ Evento '${event}' emitido con éxito`);
      return await response.json();
  } catch (error) {
      console.error("❌ Error al emitir evento:", error.message);
  }
};
