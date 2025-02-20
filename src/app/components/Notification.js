import { useEffect, useState } from 'react';

export default function Notification({ message, type, duration = 6000, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
                onClose && onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <div className={`fixed bottom-5 right-5 w-96 rounded-xl shadow-xl overflow-hidden 
                         flex items-center justify-between px-5 py-4 text-white 
                         transition-all duration-500 ease-in-out
                         ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}
                         ${type === 'success' ? 'bg-gray-900' : 'bg-gray-900'}`}>
            <style jsx>{`
                @keyframes shrink {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0;
                    }
                }
            `}</style>

            <div className="flex items-center gap-3 w-full">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-lg font-bold
                                 ${type === 'success' ? 'bg-green-500 text-black' : 'bg-red-500'}`}>
                    {type === 'success' ? '✔' : '⚠'}
                </div>
                <span className="overflow-hidden text-ellipsis whitespace-normal break-words flex-1">{message}</span>
            </div>
            <button className="text-white text-lg opacity-70 hover:opacity-100" onClick={() => setVisible(false)}>×</button>
            <div className={`absolute bottom-0 left-0 h-1 
                             ${type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}
                 style={{ animation: `shrink ${duration / 1000}s linear forwards` }}></div>
        </div>
    );
}
