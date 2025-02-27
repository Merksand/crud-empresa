import { useState } from 'react';

export default function useNotification() {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  const showNotification = (message, type = 'success', duration = 6000) => {
    setNotification({ show: true, message: message.toString(), type }); // Asegúrate de que el mensaje sea una cadena de texto
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, duration);
  };

  return { notification, showNotification };
}
